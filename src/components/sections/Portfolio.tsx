"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

export function Portfolio() {
    const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

    return (
        <section id="portfolio" className="section-padding relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--color-background-alt)]/50" />

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
                        Our Work
                    </span>
                    <h2 className="text-headline mb-6">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-body-lg max-w-2xl mx-auto">
                        A showcase of our finest work — crafted with precision and passion.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

interface ProjectCardProps {
    project: typeof projectsData[0];
    onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <motion.div
            onClick={onClick}
            className={cn(
                "group relative overflow-hidden rounded-2xl",
                "bg-[var(--color-surface-elevated)]",
                "border border-white/[0.08]",
                "cursor-pointer h-[300px] md:h-[350px]"
            )}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            {/* Placeholder Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-highlight)]/20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-white/10">
                        {project.title.charAt(0)}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"
            />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6">
                {/* Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>

                {/* Title & Role */}
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[var(--color-highlight)] transition-colors">
                    {project.title}
                </h3>
                <p className="text-sm text-white/60">{project.role}</p>

                {/* Year */}
                <span className="absolute top-6 right-6 text-sm text-white/40">
                    {project.year}
                </span>
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-highlight)]/10" />
            </div>
        </motion.div>
    );
}

interface ProjectModalProps {
    project: typeof projectsData[0];
    onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-[10%] z-50 overflow-auto rounded-3xl glass-strong"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                        <span className="text-sm text-[var(--color-highlight)] uppercase tracking-wider">
                            {project.year} • {project.role}
                        </span>
                        <h2 className="text-title mt-2 mb-4">{project.title}</h2>
                        <p className="text-body-lg">{project.description}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                        <h3 className="text-sm uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 rounded-full border border-[var(--color-accent)]/30 text-sm text-[var(--color-accent)]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Placeholder for project visual */}
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-highlight)]/20 flex items-center justify-center">
                        <div className="text-8xl font-bold text-white/10">
                            {project.title.charAt(0)}
                        </div>
                    </div>

                    {/* CTA */}
                    {project.liveUrl && (
                        <div className="mt-8 text-center">
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition-opacity"
                            >
                                View Live Project
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
