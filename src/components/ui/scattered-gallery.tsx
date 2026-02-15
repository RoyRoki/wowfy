"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn, assetPath } from "@/lib/utils";

interface GalleryImage {
    id: string;
    src: string;
    title?: string;
    description?: string;
    metrics?: Record<string, string>;
    features?: string[];
}

interface ScatteredGalleryProps {
    images: GalleryImage[];
    projectTitle: string;
    className?: string;
}

interface ImagePosition {
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

export function ScatteredGallery({ images, projectTitle, className }: ScatteredGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredImage, setHoveredImage] = useState<GalleryImage | null>(null);
    const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    // Set mounted after hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate deterministic positions for images based on index (no Math.random on initial render)
    const imagePositions = useMemo((): ImagePosition[] => {
        const positions: ImagePosition[] = [];
        const cols = 4;
        const rows = Math.ceil(images.length / cols);

        images.forEach((_, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);

            // Base position in grid - spread across full width (5% to 95%)
            const colWidth = 90 / cols; // Each column gets ~22.5% of width
            const baseX = 5 + col * colWidth + colWidth / 2; // Center of each column
            const baseY = (row / Math.max(rows, 1)) * 60 + 20; // 20-80% vertical range

            // Use deterministic "randomness" based on index to avoid hydration issues
            const seed = index * 17 + 7;
            const pseudoRandom1 = ((seed * 9301 + 49297) % 233280) / 233280;
            const pseudoRandom2 = ((seed * 7919 + 31337) % 233280) / 233280;
            const pseudoRandom3 = ((seed * 6151 + 12983) % 233280) / 233280;
            const pseudoRandom4 = ((seed * 3571 + 29123) % 233280) / 233280;

            // Add minor randomness within column bounds
            const randomX = baseX + (pseudoRandom1 - 0.5) * (colWidth * 0.6);
            const randomY = baseY + (pseudoRandom2 - 0.5) * 20;
            const rotation = (pseudoRandom3 - 0.5) * 10; // -5 to +5 degrees
            const scale = 0.9 + pseudoRandom4 * 0.2; // 0.9 to 1.1

            positions.push({
                x: Math.max(8, Math.min(92, randomX)),
                y: Math.max(15, Math.min(85, randomY)),
                rotation,
                scale,
            });
        });

        return positions;
    }, [images.length]);

    // Handle mouse move for card positioning
    const handleMouseMove = (e: React.MouseEvent) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return;

        // Calculate smart card position (avoid edges)
        const cardWidth = 280;
        const cardHeight = 180;
        const padding = 20;

        let cardX = e.clientX - containerRect.left + 30;
        let cardY = e.clientY - containerRect.top - cardHeight / 2;

        // Flip to left if too close to right edge
        if (cardX + cardWidth > containerRect.width - padding) {
            cardX = e.clientX - containerRect.left - cardWidth - 30;
        }

        // Keep within vertical bounds
        cardY = Math.max(padding, Math.min(containerRect.height - cardHeight - padding, cardY));

        setCardPos({ x: cardX, y: cardY });
    };

    // Calculate line path from image top to card
    const getLinePath = (imgElement: HTMLElement | null) => {
        if (!imgElement || !containerRef.current) return "";

        const containerRect = containerRef.current.getBoundingClientRect();
        const imgRect = imgElement.getBoundingClientRect();

        // Start from top center of the image
        const imgCenterX = imgRect.left - containerRect.left + imgRect.width / 2;
        const imgTopY = imgRect.top - containerRect.top;

        // Bezier curve from image top to card
        const cardCenterY = cardPos.y + 90;
        const cardEdgeX = cardPos.x < imgCenterX ? cardPos.x + 280 : cardPos.x;

        const controlX = (imgCenterX + cardEdgeX) / 2;
        const controlY = Math.min(imgTopY, cardCenterY) - 50;

        return `M ${imgCenterX} ${imgTopY} Q ${controlX} ${controlY} ${cardEdgeX} ${cardCenterY}`;
    };

    return (
        <section
            ref={containerRef}
            className={cn(
                "relative min-h-screen w-full overflow-hidden py-20",
                "bg-gradient-to-b from-[var(--color-background)] to-[var(--color-background-alt)]",
                className
            )}
        >
            {/* Section Header */}
            <div className="container-wide mb-16">
                <motion.h3
                    className="text-2xl md:text-3xl font-bold text-white text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Explore {projectTitle}
                </motion.h3>
                <motion.p
                    className="text-center text-[var(--color-text-muted)] mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    Hover over images to discover more details
                </motion.p>
            </div>

            {/* Scattered Images */}
            <div className="relative w-full h-[80vh] md:h-[100vh]">
                {mounted && images.map((image, index) => {
                    const pos = imagePositions[index];
                    if (!pos) return null;

                    return (
                        <motion.div
                            key={image.id}
                            data-image-id={image.id}
                            className="scattered-image absolute cursor-pointer"
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                            }}
                            initial={{
                                opacity: 0,
                                y: 60,
                                scale: 0.8,
                                rotate: pos.rotation,
                                x: "-50%",
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: pos.scale,
                                rotate: pos.rotation,
                                x: "-50%",
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.08,
                                ease: "easeOut"
                            }}
                            whileHover={{
                                scale: 1.15,
                                rotate: 0,
                                zIndex: 50,
                                boxShadow: "0 30px 60px rgba(139, 92, 246, 0.3)",
                            }}
                            onMouseEnter={() => setHoveredImage(image)}
                            onMouseLeave={() => setHoveredImage(null)}
                            onMouseMove={handleMouseMove}
                        >
                            <div className="relative w-64 h-48 md:w-80 md:h-60 lg:w-96 lg:h-72 rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl">
                                <Image
                                    src={assetPath(image.src)}
                                    alt={image.title || "Project screenshot"}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                {/* Hover overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/40 to-transparent"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredImage?.id === image.id ? 1 : 0 }}
                                />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Decorative Info Cards */}
                {mounted && (
                    <>
                        {/* Card 1 - Tech Stack */}
                        <motion.div
                            className="absolute"
                            style={{ left: "75%", top: "25%" }}
                            initial={{ opacity: 0, scale: 0.8, x: "-50%", rotate: 3 }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", rotate: 3 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="w-40 md:w-48 p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-600/10 backdrop-blur-md border border-white/10 shadow-xl">
                                <div className="text-xs text-purple-300 uppercase tracking-wider mb-1">Tech Stack</div>
                                <div className="text-2xl font-bold text-white">8+</div>
                                <div className="text-xs text-white/60 mt-1">Technologies Used</div>
                            </div>
                        </motion.div>

                        {/* Card 2 - Performance */}
                        <motion.div
                            className="absolute"
                            style={{ left: "20%", top: "65%" }}
                            initial={{ opacity: 0, scale: 0.8, x: "-50%", rotate: -4 }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", rotate: -4 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <div className="w-40 md:w-48 p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 backdrop-blur-md border border-white/10 shadow-xl">
                                <div className="text-xs text-emerald-300 uppercase tracking-wider mb-1">Performance</div>
                                <div className="text-2xl font-bold text-white">98<span className="text-lg">/100</span></div>
                                <div className="text-xs text-white/60 mt-1">Lighthouse Score</div>
                            </div>
                        </motion.div>

                        {/* Card 3 - User Rating */}
                        <motion.div
                            className="absolute"
                            style={{ left: "85%", top: "70%" }}
                            initial={{ opacity: 0, scale: 0.8, x: "-50%", rotate: 2 }}
                            animate={{ opacity: 1, scale: 1, x: "-50%", rotate: 2 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <div className="w-40 md:w-48 p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/10 backdrop-blur-md border border-white/10 shadow-xl">
                                <div className="text-xs text-amber-300 uppercase tracking-wider mb-1">User Rating</div>
                                <div className="text-2xl font-bold text-white flex items-center gap-1">
                                    4.9
                                    <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                </div>
                                <div className="text-xs text-white/60 mt-1">Client Satisfaction</div>
                            </div>
                        </motion.div>
                    </>
                )}

                {/* Connecting Line SVG */}
                <AnimatePresence>
                    {hoveredImage && (
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-40"
                            style={{ overflow: "visible" }}
                        >
                            <motion.path
                                d={getLinePath(
                                    containerRef.current?.querySelector(
                                        `[data-image-id="${hoveredImage.id}"] > div`
                                    ) as HTMLElement
                                )}
                                fill="none"
                                stroke="url(#lineGradient)"
                                strokeWidth="2"
                                strokeDasharray="8 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ pathLength: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--color-accent)" />
                                    <stop offset="100%" stopColor="var(--color-highlight)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    )}
                </AnimatePresence>

                {/* Info Card */}
                <AnimatePresence>
                    {hoveredImage && (
                        <motion.div
                            className="absolute z-50 w-72 pointer-events-none"
                            style={{
                                left: cardPos.x,
                                top: cardPos.y,
                            }}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Outer glow effect */}
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-500/30 via-violet-500/20 to-fuchsia-500/30 blur-xl opacity-60" />

                            {/* Glass card */}
                            <div
                                className="relative p-5 rounded-2xl overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                                    backdropFilter: "blur(24px)",
                                    WebkitBackdropFilter: "blur(24px)",
                                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                {/* Gradient border */}
                                <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent">
                                    <div className="absolute inset-[1px] rounded-2xl bg-black/40" />
                                </div>

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50" />

                                {/* Content */}
                                <div className="relative z-10">
                                    <h4 className="text-lg font-semibold text-white mb-2 drop-shadow-sm">
                                        {hoveredImage.title || "Screenshot"}
                                    </h4>
                                    {hoveredImage.description && (
                                        <p className="text-sm text-white/70 mb-3">
                                            {hoveredImage.description}
                                        </p>
                                    )}
                                    {hoveredImage.metrics && (
                                        <div className="flex flex-wrap gap-2">
                                            {Object.entries(hoveredImage.metrics).map(([key, value]) => (
                                                <span
                                                    key={key}
                                                    className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm text-white/90 border border-white/10"
                                                >
                                                    {key}: {value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {hoveredImage.features && (
                                        <div className="flex flex-wrap gap-2">
                                            {hoveredImage.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-sm text-white/90 border border-white/10"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {mounted && (
                    <DecorativeParticles />
                )}
            </div>
        </section>
    );
}

const DecorativeParticles = React.memo(() => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        left: string;
        top: string;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        setParticles([...Array(20)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
        })));
    }, []);

    return (
        <>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-1 h-1 rounded-full bg-[var(--color-accent)]/30"
                    style={{
                        left: p.left,
                        top: p.top,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                    }}
                />
            ))}
        </>
    );
});
