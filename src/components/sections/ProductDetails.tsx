"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, CircleDashed, Loader2, MessageCircle } from "lucide-react";
import { InteractiveDotGrid } from "@/components/ui/interactive-dot-grid";
import type { Product } from "@/types/data";

const WHATSAPP_NUMBER = "919800881300";

const statusIcon = {
    completed: CheckCircle2,
    "in-progress": Loader2,
    pending: CircleDashed,
};

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const isLive = product.status === "live";
    const waMessage = isLive
        ? `Hi! I checked out ${product.name} on Wowfy and I'd love to know more.`
        : `Hi! I'm interested in ${product.name} — let me know when it launches.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    return (
        <div className="relative isolate min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
            {/* Dots background — spans the full scroll height of the page */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 size-full">
                <InteractiveDotGrid spacing={14} radius={1} influence={140} maxPush={32} />
            </div>

            {/* Hero glow — kept behind the dots (like Products/WhatWeBuild) instead of
                painting over them, so the grid stays visible through the tint. */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-[640px] pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse at 20% 0%, ${product.accentColor}59, transparent 60%)`,
                }}
            />

            {/* Hero grid — faint accent-colored grid lines, masked so they only
                glow where the radial hero glow already lives (same treatment as TechStack). */}
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-[640px] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(${product.accentColor} 1px, transparent 1px),
                        linear-gradient(90deg, ${product.accentColor} 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                    opacity: 0.14,
                    maskImage: "radial-gradient(ellipse at 20% 0%, black, transparent 65%)",
                    WebkitMaskImage: "radial-gradient(ellipse at 20% 0%, black, transparent 65%)",
                }}
            />

            {/* Ambient accent blobs — same treatment as Products/TechStack, spread down
                the page so the glow reads as a background theme, not just a hero flourish. */}
            <div
                aria-hidden="true"
                className="absolute right-[-8rem] top-[900px] -z-10 h-64 w-64 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: `${product.accentColor}33` }}
            />
            <div
                aria-hidden="true"
                className="absolute left-[-8rem] top-[1700px] -z-10 h-72 w-72 rounded-full blur-[100px] pointer-events-none"
                style={{ backgroundColor: `${product.accentColor}33` }}
            />
            <div
                aria-hidden="true"
                className="absolute right-[-6rem] bottom-0 -z-10 h-80 w-80 rounded-full blur-[110px] pointer-events-none"
                style={{ backgroundColor: `${product.accentColor}26` }}
            />

            {/* Hero */}
            <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
                <div className="container-wide relative">
                    {/* Hard navigation, not next/link: lands after GSAP's pinned
                        sections have created their spacers, so it scrolls to the
                        correct #products offset instead of a stale pre-pin one. */}
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/#products"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-10"
                    >
                        <ArrowLeft size={16} /> Back to Products
                    </a>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span
                                className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full border"
                                style={{
                                    color: product.accentColor,
                                    borderColor: `${product.accentColor}40`,
                                    backgroundColor: `${product.accentColor}14`,
                                }}
                            >
                                {product.category}
                            </span>
                            {isLive ? (
                                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    Live in Production
                                </span>
                            ) : (
                                <span className="text-xs text-[var(--color-text-muted)]">In Development</span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{product.name}</h1>
                        <p className="text-xl md:text-2xl mb-6" style={{ color: product.accentColor }}>
                            {product.tagline}
                        </p>
                        <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl mb-8">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            {isLive && product.url && (
                                <a
                                    href={product.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-transform hover:scale-105"
                                    style={{ backgroundColor: product.accentColor, color: "#0a0a0f" }}
                                >
                                    Visit {product.name} <ArrowUpRight size={16} />
                                </a>
                            )}
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-white/15 hover:bg-white/5 transition-colors"
                            >
                                <MessageCircle size={16} />
                                {isLive ? "Ask about this product" : "Get notified at launch"}
                            </a>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mt-12">
                        {product.stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] min-w-[140px]"
                            >
                                <span className="block text-2xl font-bold">{stat.value}</span>
                                <span className="block text-xs uppercase tracking-wide text-[var(--color-text-muted)] mt-1">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Banner */}
            <section className="container-wide pb-16 md:pb-24">
                <div className="relative aspect-video rounded-3xl border border-white/10 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={product.images.hero}
                        alt={`${product.name} banner`}
                        className="size-full object-cover"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="relative aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.images.app}
                            alt={`${product.name} app screenshot`}
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="relative aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={product.images.feature}
                            alt={`${product.name} feature screenshot`}
                            className="size-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Gallery */}
            {product.images.gallery && product.images.gallery.length > 0 && (
                <section className="container-wide pb-16 md:pb-24">
                    <h2 className="text-2xl font-semibold mb-6">In the wild</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {product.images.gallery.map((src) => (
                            <div key={src} className="relative aspect-video rounded-2xl border border-white/10 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt={`${product.name} gallery`} className="size-full object-cover" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Features + Capabilities */}
            <section className="container-wide pb-16 md:pb-24 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">What it does</h2>
                    <ul className="space-y-3">
                        {product.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0"
                                    style={{ color: product.accentColor }}
                                />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Built with</h2>
                    <div className="flex flex-wrap gap-3">
                        {product.capabilities.map((capability) => (
                            <span
                                key={capability}
                                className="px-4 py-2 rounded-full text-sm border border-white/10 bg-white/[0.03] text-[var(--color-text-secondary)]"
                            >
                                {capability}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Journey */}
            <section className="container-wide pb-24 md:pb-32">
                <h2 className="text-2xl md:text-3xl font-semibold mb-10">The journey</h2>
                <div className="relative pl-8 md:pl-10">
                    <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-white/10" />
                    <div className="space-y-10">
                        {product.journey.map((step, i) => {
                            const Icon = statusIcon[step.status];
                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, x: -16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="relative"
                                >
                                    <span
                                        className="absolute -left-8 md:-left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full"
                                        style={{ backgroundColor: product.accentColor }}
                                    >
                                        <Icon size={10} className="text-black" />
                                    </span>
                                    <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                                        {step.date}
                                    </span>
                                    <h3 className="text-lg font-semibold mt-1 mb-1.5">{step.title}</h3>
                                    <p className="text-[var(--color-text-secondary)] max-w-xl">{step.content}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
