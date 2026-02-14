"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import testimonialsData from "@/data/testimonials.json";
import { Testimonial } from "@/types/data";

export function Testimonials() {
    return (
        <section id="testimonials" className="section-padding relative overflow-hidden">
            <div className="container-wide">
                {/* Header */}
                <SectionHeader
                    eyebrow="Testimonials"
                    title="Loved by"
                    gradientText="Clients"
                    description="Don&apos;t just take our word for it — hear what our partners have to say."
                    center
                />
            </div>

            {/* Marquee */}
            <div className="relative">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 pointer-events-none" />

                {/* First Row */}
                <Marquee direction="left">
                    {testimonialsData.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </Marquee>

                {/* Second Row (Reverse) */}
                <Marquee direction="right">
                    {[...testimonialsData].reverse().map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}

interface MarqueeProps {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
}

function Marquee({ children, direction = "left", speed = 30 }: MarqueeProps) {
    return (
        <div className="flex overflow-hidden py-4">
            <motion.div
                className="flex gap-6 shrink-0"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear",
                    },
                }}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <motion.div
            className="w-[350px] md:w-[400px] shrink-0 p-6 rounded-2xl glass"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Quote */}
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm leading-relaxed">
                "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-highlight)] flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                    <p className="font-medium text-[var(--color-text-primary)] text-sm">
                        {testimonial.name}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                        {testimonial.title}, {testimonial.company}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
