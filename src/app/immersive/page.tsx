"use client";

import { ImmersiveScrollExperience } from "@/components/ui/immersive-scroll-experience";

export default function ImmersiveDemo() {
    return (
        <main className="relative bg-black">
            <ImmersiveScrollExperience showDebug={true} />

            {/* Placeholder section after the experience */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0f] to-black">
                <div className="text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Continue Scrolling
                    </h2>
                    <p className="text-white/60 font-mono text-sm">
                        The immersive experience is complete
                    </p>
                </div>
            </section>
        </main>
    );
}
