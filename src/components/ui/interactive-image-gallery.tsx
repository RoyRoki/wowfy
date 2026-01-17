"use client";

import * as React from "react";
import Image from "next/image";
import { cn, assetPath } from "@/lib/utils";
import { motion } from "framer-motion";

export interface GalleryItem {
    id: string;
    type: "image" | "text";
    src?: string;
    text?: string;
}

interface InteractiveImageGalleryProps {
    items: GalleryItem[];
    className?: string;
}

export function InteractiveImageGallery({
    items,
    className,
}: InteractiveImageGalleryProps) {
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);

    return (
        <div
            className={cn(
                "relative w-full flex flex-wrap justify-center items-center gap-6 p-6",
                className
            )}
        >
            {items.map((item, index) =>
                item.type === "image" ? (
                    <motion.div
                        key={item.id}
                        className={cn(
                            "relative transition-all duration-300 ease-in-out rounded-2xl overflow-hidden",
                            "bg-[var(--color-surface-elevated)] border border-white/[0.08]",
                            hoveredId && hoveredId !== item.id ? "blur-sm opacity-50 scale-95" : "opacity-100"
                        )}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        {item.src && (
                            <Image
                                src={assetPath(item.src)}
                                alt="gallery item"
                                width={400}
                                height={300}
                                unoptimized
                                className="object-cover w-full h-auto md:w-[300px] md:h-[220px] rounded-2xl"
                            />
                        )}
                        {/* Hover glow effect */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none rounded-2xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-highlight)] to-[var(--color-accent)]" />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key={item.id}
                        className="w-72 p-6 rounded-2xl bg-[var(--color-surface-elevated)] border border-white/[0.08] text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <p className="text-sm text-[var(--color-text-muted)]">
                            {item.text}
                        </p>
                    </motion.div>
                )
            )}
        </div>
    );
}
