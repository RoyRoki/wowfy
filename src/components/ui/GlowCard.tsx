"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    tiltStrength?: number;
    onClick?: () => void;
}

export function GlowCard({
    children,
    className,
    glowColor = "rgba(99, 102, 241, 0.4)",
    tiltStrength = 10,
    onClick,
}: GlowCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const percentX = (e.clientX - rect.left) / rect.width;
        const percentY = (e.clientY - rect.top) / rect.height;

        // Calculate rotation
        const x = ((e.clientY - centerY) / (rect.height / 2)) * -tiltStrength;
        const y = ((e.clientX - centerX) / (rect.width / 2)) * tiltStrength;

        setRotateX(x);
        setRotateY(y);
        setGlowPosition({ x: percentX * 100, y: percentY * 100 });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlowPosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-[var(--color-surface-elevated)]",
                "border border-white/[0.08]",
                "transition-shadow duration-500",
                "transform-gpu perspective-1000",
                onClick && "cursor-pointer",
                className
            )}
            animate={{
                rotateX,
                rotateY,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3 },
            }}
            style={{
                transformStyle: "preserve-3d",
            }}
        >
            {/* Glow effect */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                animate={{
                    opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
                    background: `radial-gradient(
            600px circle at ${glowPosition.x}% ${glowPosition.y}%,
            ${glowColor},
            transparent 40%
          )`,
                }}
            />

            {/* Border glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
                animate={{
                    opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
                }}
                style={{
                    background: `radial-gradient(
            400px circle at ${glowPosition.x}% ${glowPosition.y}%,
            rgba(255,255,255,0.1),
            transparent 40%
          )`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
