"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { parse, type Font } from "opentype.js";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const FONT_URL = "/fonts/DrawText-ExtraBold.ttf";
let fontPromise: Promise<Font> | null = null;

function loadFont() {
    if (!fontPromise) {
        fontPromise = fetch(FONT_URL)
            .then((res) => res.arrayBuffer())
            .then((buffer) => parse(buffer));
    }
    return fontPromise;
}

interface GlyphPath {
    d: string;
    key: string;
}

// Bumps the rendered size up a touch — this draw-font's metrics read visually
// smaller than the surrounding Outfit/Manrope text at the same nominal size.
const SIZE_SCALE = 1.6;

interface SvgRevealTextProps {
    text: string;
    /** Roughly matches the surrounding copy's rendered cap-height, in px. */
    fontSize?: number;
    className?: string;
}

/**
 * Highlighted/accent text drawn letter-by-letter as real glyph outline paths
 * (via opentype.js), each stroking in with a stagger (DrawSVGPlugin), then
 * filling with the primary accent color. Re-plays every time it scrolls into
 * view, in both directions.
 */
export function SvgRevealText({ text, fontSize = 64, className }: SvgRevealTextProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRefs = useRef<Array<SVGPathElement | null>>([]);
    const [glyphs, setGlyphs] = useState<GlyphPath[] | null>(null);
    const [viewBox, setViewBox] = useState<string>("0 0 100 100");

    useEffect(() => {
        let cancelled = false;

        loadFont().then((font) => {
            if (cancelled) return;

            const PAD = fontSize * 0.12;
            let x = 0;
            const paths: GlyphPath[] = [];

            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const glyph = font.charToGlyph(char);
                const path = glyph.getPath(x, 0, fontSize);
                if (char !== " ") {
                    paths.push({ d: path.toPathData(2), key: `${char}-${i}` });
                }
                x += glyph.advanceWidth ? (glyph.advanceWidth / font.unitsPerEm) * fontSize : 0;
            }

            const ascent = (font.ascender / font.unitsPerEm) * fontSize;
            const descent = (font.descender / font.unitsPerEm) * fontSize;
            const totalHeight = ascent - descent + PAD * 2;
            setViewBox(`${-PAD} ${-ascent - PAD} ${x + PAD * 2} ${totalHeight}`);
            setGlyphs(paths);
        });

        return () => {
            cancelled = true;
        };
    }, [text, fontSize]);

    useEffect(() => {
        if (!glyphs || !svgRef.current) return;
        const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
        if (paths.length === 0) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: svgRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            tl.set(paths, { drawSVG: "0%", fill: "transparent" })
                .to(paths, {
                    drawSVG: "100%",
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power2.inOut",
                })
                .to(
                    paths,
                    {
                        fill: "var(--color-accent)",
                        duration: 0.5,
                        stagger: 0.08,
                    },
                    "-=0.5"
                );
        }, svgRef);

        return () => ctx.revert();
    }, [glyphs]);

    return (
        <svg
            ref={svgRef}
            viewBox={viewBox}
            className={cn("inline-block overflow-visible", className)}
            style={{
                height: `${SIZE_SCALE}em`,
                width: "auto",
                verticalAlign: "-0.5em",
            }}
            aria-label={text}
        >
            {glyphs?.map((g, i) => (
                <path
                    key={g.key}
                    ref={(el) => {
                        pathRefs.current[i] = el;
                    }}
                    d={g.d}
                    style={{
                        stroke: "var(--color-accent)",
                        strokeWidth: fontSize * 0.03,
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        fill: "transparent",
                    }}
                />
            ))}
        </svg>
    );
}

export default SvgRevealText;
