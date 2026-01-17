"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { assetPath } from "@/lib/utils";

// Portfolio images from the project for the marquee
const WELCOME_IMAGES = [
    "/projects/Works_Best/p1/images/image.png",
    "/projects/Works_Best/p2/images/image.png",
    "/projects/Works_Best/p3/images/image.png",
    "/projects/Works_Best/p4/images/image.png",
    "/projects/Works_Best/p5/images/image.png",
    "/projects/Works_Best/p6/images/image.png",
    "/projects/Works_Best/p1/images/image copy.png",
    "/projects/Works_Best/p2/images/image copy.png",
    "/projects/Works_Best/p3/images/image copy.png",
    "/projects/Works_Best/p4/images/image copy.png",
    "/projects/Works_Best/p5/images/image copy.png",
    "/projects/Works_Best/p6/images/image copy.png",
].map(assetPath);

export const Welcome: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Create scroll-based animation for blending transition
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });

    // Fade in as user scrolls into view
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, 0]);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, scale, y }}
            className="relative"
        >
            {/* Gradient blend from hero section - creates seamless transition from dark icosahedron */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#020202] to-transparent z-20 pointer-events-none" />

            <AnimatedMarqueeHero
                tagline="Welcome to the Future of Digital"
                title={
                    <>
                        Crafting <span className="bg-gradient-to-r from-red-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">Immersive</span>
                        <br />
                        Digital Experiences
                    </>
                }
                description="We blend cutting-edge technology with bold creative vision to deliver digital products that captivate, engage, and convert. Your audience deserves nothing less than extraordinary."
                ctaText="Explore Our Work"
                images={WELCOME_IMAGES}
                className="bg-[#020202]"
            />

            {/* Bottom gradient for smooth transition to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />
        </motion.div>
    );
};

export default Welcome;
