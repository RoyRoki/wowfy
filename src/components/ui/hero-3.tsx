"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Ambient auto-scroll speed — one full loop of the (duplicated) track, in seconds.
const IDLE_LOOP_DURATION = 90;

// Props interface for the component
interface AnimatedMarqueeHeroProps {
    tagline: string;
    title: React.ReactNode;
    description: string;
    ctaText: string;
    images: string[];
    className?: string;
    onCtaClick?: () => void;
}

// Reusable Button component styled like in the image
const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 rounded-full bg-red-500 text-white font-semibold shadow-lg transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
    >
        {children}
    </motion.button>
);

// The main hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
    tagline,
    title,
    description,
    ctaText,
    images,
    className,
    onCtaClick,
}) => {
    // Animation variants for the text content
    const FADE_IN_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
    };

    // Duplicate images for a seamless loop
    const duplicatedImages = [...images, ...images];

    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const ctx = gsap.context(() => {
            // Single non-repeating tween is the only thing that ever sets
            // xPercent — its progress is driven exclusively by scroll (see
            // onUpdate below). No repeat + no modulo means the track advances
            // once from -50% to 0% and holds at the end, never snapping back.
            const loop = gsap.fromTo(
                track,
                { xPercent: -50 },
                { xPercent: 0, duration: IDLE_LOOP_DURATION, ease: "none", paused: true }
            );

            // Lock vertical scroll for one viewport and convert it into horizontal
            // card movement — releases back to normal scroll at either end.
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=100%",
                pin: true,
                scrub: 0.4,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                // onEnter: () => loop.pause(),
                // onEnterBack: () => loop.pause(),
                // onLeave: () => loop.play(),
                // onLeaveBack: () => loop.play(),
                // Map scroll progress straight to the tween (no modulo) so the
                // track holds its final position at the end instead of wrapping
                // back to the start.
                onUpdate: (self) => loop.progress(self.progress),
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={cn(
                "relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-center text-center px-4",
                className
            )}
        >
            <div className="z-10 flex flex-col items-center -translate-y-16 md:-translate-y-24">
                {/* Tagline */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    className="mb-4 inline-block rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm"
                >
                    {tagline}
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="link text-5xl md:text-7xl font-bold tracking-tighter text-foreground"
                >
                    {typeof title === 'string' ? (
                        title.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                className="inline-block"
                            >
                                {word}&nbsp;
                            </motion.span>
                        ))
                    ) : (
                        title
                    )}
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial="hidden"
                    animate="show"
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    transition={{ delay: 0.5 }}
                    className="mt-6 max-w-xl text-lg text-muted-foreground"
                >
                    {description}
                </motion.p>

                {/* Call to Action Button */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={FADE_IN_ANIMATION_VARIANTS}
                    transition={{ delay: 0.6 }}
                >
                    <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
                </motion.div>
            </div>

            {/* Animated Image Marquee */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
                <div ref={trackRef} className="flex gap-4 will-change-transform">
                    {duplicatedImages.map((src, index) => (
                        <div
                            key={index}
                            className="relative aspect-[3/4] h-48 md:h-64 flex-shrink-0"
                            style={{
                                rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Showcase image ${index + 1}`}
                                className="w-full h-full object-cover rounded-2xl shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AnimatedMarqueeHero;
