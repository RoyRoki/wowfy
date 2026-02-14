"use client";

import { motion } from "framer-motion";
import { TeamCarousel } from "@/components/ui/team-carousel";
import { SectionHeader } from "@/components/ui/section-header";
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
                <SectionHeader
                    eyebrow="The Team"
                    title="Meet the"
                    gradientText="Creators"
                    description="Passionate developers crafting premium digital experiences."
                    center
                />

                {/* Team Carousel */}
                <TeamCarousel members={teamData} />
            </div>
        </section>
    );
}

export default Team;
