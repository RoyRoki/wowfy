"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { SvgRevealText } from "@/components/ui/svg-reveal-text";
import { assetPath } from "@/lib/utils";

// Portfolio images from the project for the marquee
const WELCOME_IMAGES = [
    "/images/welcome/image.webp",
    "/images/welcome/image copy.webp",
    "/images/welcome/image copy 2.webp",
    "/images/welcome/image copy 3.webp",
    "/images/welcome/image copy 4.webp",
    "/images/welcome/image copy 5.webp",
    "/images/welcome/image copy 6.webp",
    "/images/welcome/image copy 7.webp",
    "/images/welcome/image copy 8.webp",
    "/images/welcome/image copy 9.webp",
    "/images/welcome/image copy 10.webp",
    "/images/welcome/image copy 11.webp",
].map(assetPath);

export const Welcome: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create scroll-based animation for blending transition
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    // Fade in as user scrolls into view. Deliberately opacity-only — a
    // scroll-linked scale/translateY transform on this element used to fight
    // with the GSAP ScrollTrigger pin inside AnimatedMarqueeHero (both keyed
    // to the same "top hits viewport top" moment), causing a settle jump
    // right as pinning engaged.
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

    // Scroll to portfolio section
    const handleCtaClick = () => {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className="relative"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Radial Gradient for subtle lighting */}
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]" />
            </div>

            {/* Gradient blend from hero section - creates seamless transition from dark icosahedron */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020202] to-transparent z-20 pointer-events-none" />

            <AnimatedMarqueeHero
                tagline="Available for Projects · 2026"
                title={
                    <>
                        Premium builds.{" "}
                        <SvgRevealText text="Zero excuses." />
                    </>
                }
                description="Full-stack dev based in Siliguri, leading a small senior team. I'm hands-on across design, build, and deploy — no handoffs, no delays, direct accountability."
                ctaText="See the Work"
                images={WELCOME_IMAGES}
                className="bg-transparent relative z-10"
                onCtaClick={handleCtaClick}
            />

            {/* Bottom gradient for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />
        </motion.div>
    );
};

export default Welcome;
