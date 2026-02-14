"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    gradientText?: string;
    description?: string;
    className?: string;
    light?: boolean; // For dark backgrounds if needed, though mostly dark theme
    center?: boolean;
    children?: React.ReactNode;
}

export function SectionHeader({
    eyebrow,
    title,
    gradientText,
    description,
    className,
    center = true,
    children,
}: SectionHeaderProps) {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Combine title and gradient text for splitting, but we need to know where the gradient starts
    // Simplified approach: Split title and gradientText separately
    const titleChars = title.split("");
    const gradientChars = gradientText ? gradientText.split("") : [];

    useEffect(() => {
        if (!headingRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(".char", {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                rotateX: -90,
                stagger: 0.02,
                duration: 0.8,
                ease: "back.out(1.7)",
            });
        }, containerRef);

        return () => ctx.revert();
    }, [title, gradientText]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={cn("mb-16", center ? "text-center" : "text-left", className)}
        >
            {eyebrow && (
                <span className="text-sm uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                    {eyebrow}
                </span>
            )}

            <h2 ref={headingRef} className="text-headline mb-6" style={{ perspective: "1000px" }}>
                {/* Regular Title Part */}
                {titleChars.map((char, i) => (
                    <span
                        key={`t-${i}`}
                        className={cn(
                            "char inline-block",
                            char === " " ? "w-2" : ""
                        )}
                        style={{ transformOrigin: "50% 100%" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}

                {/* Spacer if both exist */}
                {title && gradientText && <span className="char inline-block w-2">{"\u00A0"}</span>}

                {/* Gradient Text Part */}
                {gradientChars.map((char, i) => (
                    <span
                        key={`g-${i}`}
                        className={cn(
                            "char inline-block text-gradient",
                            char === " " ? "w-2" : ""
                        )}
                        style={{ transformOrigin: "50% 100%" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </span>
                ))}
            </h2>

            {description && (
                <p className={cn("text-body-lg max-w-2xl text-[var(--color-text-muted)]", center ? "mx-auto" : "")}>
                    {description}
                </p>
            )}

            {children && (
                <div className={cn("mt-6", center ? "mx-auto" : "")}>
                    {children}
                </div>
            )}
        </motion.div>
    );
}
