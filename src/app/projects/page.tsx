"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { KineticText } from "@/components/ui/KineticText";
import { Project3DCard, type Project } from "@/components/ui/Project3DCard";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type FilterType = "all" | "website" | "mobile";

export default function ProjectsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    // specific type casting
    const projects = projectsData as Project[];

    const filteredProjects = projects.filter((project) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "website") return project.deviceType === "laptop";
        if (activeFilter === "mobile") return project.deviceType === "phone";
        return true;
    });

    const handleProjectClick = (projectId: string) => {
        router.push(`/projects/${projectId}`);
    };

    const filters: { id: FilterType; label: string }[] = [
        { id: "all", label: "All Works" },
        { id: "website", label: "Website" },
        { id: "mobile", label: "Mobile App" },
    ];

    return (
        <main className="min-h-screen relative pt-24 pb-20">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[var(--color-background)]" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(var(--color-text-secondary) 1px, transparent 1px),
                                            linear-gradient(90deg, var(--color-text-secondary) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            <div className="container-wide relative z-10">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 group"
                    >
                        <svg
                            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                        <div>
                            <motion.h1
                                className="text-display mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <KineticText text="All Projects" />
                            </motion.h1>
                            <motion.p
                                className="text-body-lg max-w-xl text-[var(--color-text-muted)]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                A complete collection of my work, experiments, and contributions.
                                Exploring the boundaries of web development and design.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-right hidden md:block"
                        >
                            <span className="text-6xl font-bold text-[var(--color-accent)]/20">
                                {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
                            </span>
                        </motion.div>
                    </div>

                    {/* Filter Tabs */}
                    <motion.div
                        className="flex flex-wrap gap-2 md:gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={cn(
                                    "relative px-4 py-3 text-sm md:text-base font-medium transition-colors",
                                    activeFilter === filter.id
                                        ? "text-[var(--color-text-primary)]"
                                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                                )}
                            >
                                {filter.label}
                                {activeFilter === filter.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Project3DCard
                                    project={project}
                                    index={index}
                                    onClick={() => handleProjectClick(project.id)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center text-[var(--color-text-muted)]"
                    >
                        <p>No projects found in this category.</p>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
