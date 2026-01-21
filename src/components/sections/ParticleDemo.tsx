"use client";

import { ParticleTextEffect } from "@/components/ui/interactive-text-particle";

/**
 * Demo component for the Interactive Text Particle Effect
 * Displays "WOWFY" text with vibrant particle animation
 */
export const ParticleDemo = () => {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden">
            {/* Interactive Particle Text Background */}
            <ParticleTextEffect
                text="WOWFY"
                className="absolute inset-0 z-0"
                colors={[
                    'ff6b6b',  // Red
                    'feca57',  // Yellow
                    '48dbfb',  // Blue
                    '1dd1a1',  // Green
                    'ff9ff3',  // Pink
                    'a29bfe'   // Purple
                ]}
                animationForce={100}
                particleDensity={3}
            />

            {/* Optional: Instruction text at bottom */}
            <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
                <p className="text-white/40 text-xs uppercase tracking-widest font-mono">
                    Hover or move your cursor to interact
                </p>
            </div>
        </section>
    );
};

export default ParticleDemo;
