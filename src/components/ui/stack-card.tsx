"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CardItem {
    id: string | number;
    src: string;
    alt: string;
}

interface StackCardProps {
    cards: CardItem[];
    className?: string;
}

export function StackCard({ cards: initialCards, className = "" }: StackCardProps) {
    const [cards, setCards] = useState(initialCards);

    const moveToEnd = (index: number) => {
        setCards((prev) => [...prev.slice(index + 1), prev[index]]);
    };

    // Configuration
    const offset = 12;
    const scaleStep = 0.05;
    const dimStep = 0.12;
    const borderRadius = 16;

    const spring = {
        type: "spring" as const,
        stiffness: 180,
        damping: 28,
    };

    return (
        <div className={`relative w-full aspect-video overflow-visible ${className}`}>
            <ul className="relative w-full h-full m-0 p-0">
                {cards.map(({ id, src, alt }, i) => {
                    const isFront = i === 0;
                    const brightness = Math.max(0.4, 1 - i * dimStep);
                    const baseZ = cards.length - i;

                    return (
                        <motion.li
                            key={id}
                            className="absolute w-full h-full list-none overflow-hidden border-2 border-white/10"
                            style={{
                                borderRadius: `${borderRadius}px`,
                                cursor: isFront ? "grab" : "auto",
                                touchAction: "none",
                                boxShadow: isFront
                                    ? "0 25px 50px rgba(0, 0, 0, 0.5)"
                                    : "0 15px 30px rgba(0, 0, 0, 0.3)",
                            }}
                            animate={{
                                top: `${i * -offset}%`,
                                scale: 1 - i * scaleStep,
                                filter: `brightness(${brightness})`,
                                zIndex: baseZ,
                            }}
                            transition={spring}
                            drag={isFront ? "y" : false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragMomentum={false}
                            onDragEnd={() => moveToEnd(i)}
                            whileDrag={
                                isFront
                                    ? {
                                        zIndex: cards.length,
                                        cursor: "grabbing",
                                        scale: 1 - i * scaleStep + 0.03,
                                        rotate: 2,
                                    }
                                    : {}
                            }
                        >
                            <Image
                                src={src}
                                alt={alt}
                                fill
                                unoptimized
                                className="object-cover pointer-events-none"
                                draggable={false}
                            />
                            {/* Gradient overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </motion.li>
                    );
                })}
            </ul>

            {/* Drag hint */}
            <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <span>Drag to explore</span>
            </motion.div>
        </div>
    );
}
