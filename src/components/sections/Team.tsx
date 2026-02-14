"use client";

import { motion } from "framer-motion";
import { TeamCarousel } from "@/components/ui/team-carousel";
import teamData from "@/data/team.json";

export function Team() {
    return (
        <section className="section-padding relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container-wide relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                        The Team
                    </span>
                    <h2 className="text-headline mb-6">
                        Meet the <span className="text-gradient">Creators</span>
                    </h2>
                    <p className="text-body-lg max-w-2xl mx-auto">
                        Passionate developers crafting premium digital experiences.
                    </p>
                </motion.div>

                {/* Team Carousel */}
                <TeamCarousel members={teamData} />
            </div>
        </section>
    );
}

export default Team;
