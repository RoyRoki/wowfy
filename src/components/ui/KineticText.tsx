"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface KineticTextProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    variant?: "fade" | "blur" | "slide" | "wave";
    once?: boolean;
}

const variants = {
    fade: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
    blur: {
        hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
    slide: {
        hidden: { opacity: 0, x: -30, rotateY: 45 },
        visible: { opacity: 1, x: 0, rotateY: 0 },
    },
    wave: {
        hidden: { opacity: 0, y: 50, rotateX: -60 },
        visible: { opacity: 1, y: 0, rotateX: 0 },
    },
};

export function KineticText({
    text,
    className,
    delay = 0,
    staggerDelay = 0.03,
    as: Component = "span",
    variant = "blur",
    once = true,
}: KineticTextProps) {
    // Split text into words and characters
    const words = useMemo(() => text.split(" "), [text]);

    const MotionComponent = motion[Component];

    return (
        <MotionComponent
            className={cn("inline-block", className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-100px" }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, charIndex) => {
                        const index = words.slice(0, wordIndex).join("").length + charIndex + wordIndex;
                        return (
                            <motion.span
                                key={charIndex}
                                className="inline-block"
                                variants={variants[variant]}
                                transition={{
                                    duration: 0.5,
                                    delay: delay + index * staggerDelay,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </span>
            ))}
        </MotionComponent>
    );
}

// Word-level animation variant
interface KineticWordsProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    once?: boolean;
}

export function KineticWords({
    text,
    className,
    delay = 0,
    staggerDelay = 0.08,
    as: Component = "span",
    once = true,
}: KineticWordsProps) {
    const words = useMemo(() => text.split(" "), [text]);

    const MotionComponent = motion[Component];

    return (
        <MotionComponent
            className={cn("inline-block", className)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-100px" }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block mr-[0.25em]"
                    variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    transition={{
                        duration: 0.6,
                        delay: delay + index * staggerDelay,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </MotionComponent>
    );
}
