"use client";

import type { ComponentType, CSSProperties } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { GlowCard } from "@/components/ui/GlowCard";
import techStackData from "@/data/tech-stack.json";
import type { TechStackData } from "@/types/data";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiGreensock,
    SiThreedotjs,
    SiFigma,
    SiNodedotjs,
    SiGo,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiGithub,
    SiVercel,
    SiFlutter,
    SiSwift,
    SiShopify,
    SiWhatsapp,
    SiClaude,
    SiOpenai,
    SiGooglegemini,
    SiN8n,
} from "@icons-pack/react-simple-icons";

type SimpleIcon = ComponentType<{ size?: number; color?: string; style?: CSSProperties }>;

const ICONS: Record<string, SimpleIcon> = {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiGreensock,
    SiThreedotjs,
    SiFigma,
    SiNodedotjs,
    SiGo,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiGit,
    SiGithub,
    SiVercel,
    SiFlutter,
    SiSwift,
    SiShopify,
    SiWhatsapp,
    SiClaude,
    SiOpenai,
    SiGooglegemini,
    SiN8n,
};

const data = techStackData as TechStackData;

export function TechStack() {
    return (
        <section
            id="tech-stack"
            className="section-padding relative overflow-hidden bg-[var(--color-background)]"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background-alt)]/30 via-transparent to-[var(--color-background-alt)]/30" />
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 12% 8%, rgba(99,102,241,0.16) 0%, transparent 45%), radial-gradient(circle at 88% 82%, rgba(99,102,241,0.12) 0%, transparent 42%)`,
                }}
            />
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(var(--color-accent) 1px, transparent 1px),
                        linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                    opacity: 0.07,
                    maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
                }}
            />

            <div className="container-wide relative z-10">
                <SectionHeader
                    eyebrow={data.eyebrow}
                    title={data.title}
                    gradientText={data.gradientText}
                    description={data.description}
                    center
                    className="mb-16"
                />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                    {data.groups.map((group, gi) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: gi * 0.1 }}
                        >
                            <GlowCard className="h-full p-6 md:p-8">
                                <h3 className="text-lg font-semibold text-white mb-1">{group.label}</h3>
                                <p className="text-sm text-white/50 mb-6">{group.description}</p>

                                <div className="grid grid-cols-3 gap-3">
                                    {group.items.map((item) => {
                                        const Icon = item.icon ? ICONS[item.icon] : undefined;
                                        return (
                                            <div
                                                key={item.id}
                                                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
                                            >
                                                {Icon ? (
                                                    <Icon size={26} color="#ffffff" style={{ opacity: 0.85 }} />
                                                ) : item.src ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={item.src} alt={item.name} className="h-[26px] w-auto object-contain" />
                                                ) : null}
                                                <span className="text-[11px] text-white/60 text-center leading-tight">
                                                    {item.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </GlowCard>
                        </motion.div>
                    ))}
                </div>

                <p className="text-body text-[var(--color-text-muted)] leading-relaxed text-center max-w-2xl mx-auto mt-14">
                    {data.footerText}
                </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-32 top-1/4 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -left-32 bottom-1/4 w-64 h-64 bg-[var(--color-highlight)]/10 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
}
