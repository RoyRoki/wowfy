"use client";

import { ParticleTextEffect } from "@/components/ui/particle-text-effect";

export function WhyUs() {
    const particleWords = ["WHY", "CHOOSE", "US?", "EXCELLENCE", "INNOVATION"];

    return (
        <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-start justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />

            {/* Top Fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            {/* Particle Text Effect - Background Layer */}
            <div className="absolute inset-0 z-10">
                <ParticleTextEffect words={particleWords} />
            </div>

            {/* Section Header - Content Layer */}
            <div className="relative z-20 px-4 pt-20 w-full text-center pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    Why Choose wowfy?
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
                    Creative developers who build award-worthy experiences. Premium quality at unbeatable prices. Serving clients from India to Dubai with passion and precision.
                </p>
            </div>

            {/* Bottom Instruction Text */}
            <div className="absolute bottom-8 left-0 right-0 z-20 text-center pointer-events-none">
                <p className="text-gray-500 text-sm md:text-base">
                    Click or hold right click to interact with the particles
                </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
        </section>
    );
}
