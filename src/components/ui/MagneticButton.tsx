"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function MagneticButton({
    children,
    className,
    strength = 0.3,
    onClick,
    href,
    variant = "primary",
    size = "md",
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) * strength;
        const y = (e.clientY - centerY) * strength;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const variantStyles = {
        primary: `
      bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-highlight)]
      text-white font-semibold
      shadow-lg hover:shadow-xl
      hover:shadow-[var(--color-accent)]/30
    `,
        secondary: `
      bg-[var(--color-surface-elevated)]
      text-[var(--color-text-primary)]
      border border-[var(--glass-border)]
      hover:bg-[var(--color-accent)]/10
    `,
        outline: `
      bg-transparent
      border-2 border-[var(--color-accent)]
      text-[var(--color-accent)]
      hover:bg-[var(--color-accent)] hover:text-white
    `,
        ghost: `
      bg-transparent
      text-[var(--color-text-primary)]
      hover:bg-[var(--color-surface)]
    `,
    };

    const sizeStyles = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-2xl",
    };

    const Component = href ? motion.a : motion.button;
    const componentProps = href
        ? { href, target: href.startsWith("http") ? "_blank" : undefined }
        : { onClick };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            className="inline-block"
        >
            <Component
                className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "transition-all duration-300 ease-out",
                    "transform-gpu",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...componentProps}
                data-cursor="pointer"
            >
                {children}
            </Component>
        </motion.div>
    );
}
