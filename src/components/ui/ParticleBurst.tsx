"use client";

import { useRef, useEffect, useState } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
}

interface ParticleBurstProps {
    trigger: boolean;
    colors?: string[];
    particleCount?: number;
    className?: string;
}

export function ParticleBurst({
    trigger,
    colors = ["#8b5cf6", "#a855f7", "#d946ef", "#f0abfc"],
    particleCount = 20,
    className = "",
}: ParticleBurstProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | undefined>(undefined);
    const [dimensions, setDimensions] = useState({ width: 100, height: 100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (parent) {
            const rect = parent.getBoundingClientRect();
            setDimensions({ width: rect.width, height: rect.height });
        }
    }, []);

    useEffect(() => {
        if (!trigger) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Create particles from center
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;

        particlesRef.current = Array.from({ length: particleCount }, () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            return {
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 0.5 + Math.random() * 0.5,
                size: 2 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        });

        const animate = () => {
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            particlesRef.current = particlesRef.current.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // gravity
                p.life -= 0.02;

                if (p.life <= 0) return false;

                const alpha = p.life / p.maxLife;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
                ctx.fill();

                return true;
            });

            if (particlesRef.current.length > 0) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [trigger, colors, particleCount, dimensions]);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className={`absolute inset-0 pointer-events-none ${className}`}
        />
    );
}
