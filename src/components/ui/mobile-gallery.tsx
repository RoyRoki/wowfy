"use client";

import React from "react";
import { motion } from "framer-motion";
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

interface MobileGalleryProps {
    images: GalleryImage[];
    projectTitle: string;
    className?: string;
}

export function MobileGallery({ images, projectTitle, className }: MobileGalleryProps) {
    return (
        <section className={cn("relative w-full py-8 pb-24", className)}>
            {/* Section Header */}
            <div className="px-4 mb-8">
                <motion.h3
                    className="text-xl font-bold text-white text-center mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {projectTitle} Gallery
                </motion.h3>
                <motion.p
                    className="text-center text-[var(--color-text-muted)] text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Tap cards to view details
                </motion.p>
            </div>

            {/* Vertical Stack of Images */}
            <div className="space-y-6 px-4">
                {images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            ease: "easeOut"
                        }}
                    >
                        {/* Image Card */}
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 shadow-2xl">
                            {/* Image */}
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={assetPath(image.src)}
                                    alt={image.title || "Project screenshot"}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            </div>

                            {/* Info Overlay */}
                            {(image.title || image.description || image.features) && (
                                <div className="p-4 space-y-3">
                                    {image.title && (
                                        <h4 className="text-base font-semibold text-white">
                                            {image.title}
                                        </h4>
                                    )}
                                    {image.description && (
                                        <p className="text-sm text-white/70 leading-relaxed">
                                            {image.description}
                                        </p>
                                    )}
                                    {image.features && image.features.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {image.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Info Cards Section */}
            <div className="mt-8 px-4 space-y-4">
                {/* Tech Stack Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-600/10 backdrop-blur-md border border-white/10 shadow-xl"
                >
                    <div className="text-xs text-purple-300 uppercase tracking-wider mb-1">Tech Stack</div>
                    <div className="text-3xl font-bold text-white">8+</div>
                    <div className="text-xs text-white/60 mt-1">Technologies Used</div>
                </motion.div>

                {/* Performance & Rating Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Performance Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/10 backdrop-blur-md border border-white/10 shadow-xl"
                    >
                        <div className="text-xs text-emerald-300 uppercase tracking-wider mb-1">Performance</div>
                        <div className="text-2xl font-bold text-white">98<span className="text-sm">/100</span></div>
                        <div className="text-xs text-white/60 mt-1">Lighthouse</div>
                    </motion.div>

                    {/* User Rating Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/10 backdrop-blur-md border border-white/10 shadow-xl"
                    >
                        <div className="text-xs text-amber-300 uppercase tracking-wider mb-1">Rating</div>
                        <div className="text-2xl font-bold text-white flex items-center gap-1">
                            4.9
                            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        </div>
                        <div className="text-xs text-white/60 mt-1">Client</div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
