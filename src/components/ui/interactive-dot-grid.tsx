"use client";

import { useEffect, useRef } from "react";

interface InteractiveDotGridProps {
    /** Spacing between dots, in px. */
    spacing?: number;
    /** Base dot radius, in px. */
    radius?: number;
    /** How far (in px) a dot reacts to the cursor. */
    influence?: number;
    /** Max displacement a dot can be pushed, in px. */
    maxPush?: number;
    className?: string;
}

interface Dot {
    x: number;
    y: number;
    ox: number; // current offset
    oy: number;
}

/**
 * Canvas dot-grid background where dots near the cursor get pushed away,
 * proportional to proximity, and ease back to rest when the cursor leaves.
 */
export function InteractiveDotGrid({
    spacing = 14,
    radius = 1,
    influence = 80,
    maxPush = 14,
    className,
}: InteractiveDotGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = canvas?.parentElement;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let dots: Dot[] = [];
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const mouse = { x: -9999, y: -9999, active: false };

        const buildGrid = () => {
            const rect = container.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            dots = [];
            for (let y = spacing / 2; y < height; y += spacing) {
                for (let x = spacing / 2; x < width; x += spacing) {
                    dots.push({ x, y, ox: 0, oy: 0 });
                }
            }
        };

        buildGrid();

        const handleMove = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;
            mouse.active = true;
        };

        const onPointerMove = (e: PointerEvent) => handleMove(e.clientX, e.clientY);
        const onPointerLeave = () => {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });

        const resizeObserver = new ResizeObserver(() => buildGrid());
        resizeObserver.observe(container);

        let rafId = 0;
        const EASE = 0.12;

        const tick = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(255,255,255,0.04)";

            for (const dot of dots) {
                let tx = 0;
                let ty = 0;

                if (mouse.active) {
                    const dx = dot.x - mouse.x;
                    const dy = dot.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < influence && dist > 0.001) {
                        const force = (influence - dist) / influence;
                        tx = (dx / dist) * force * maxPush;
                        ty = (dy / dist) * force * maxPush;
                    }
                }

                // Ease toward the target offset (repelled position or back to rest).
                dot.ox += (tx - dot.ox) * EASE;
                dot.oy += (ty - dot.oy) * EASE;

                ctx.beginPath();
                ctx.arc(dot.x + dot.ox, dot.y + dot.oy, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerleave", onPointerLeave);
        };
    }, [spacing, radius, influence, maxPush]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={className}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
    );
}

export default InteractiveDotGrid;
