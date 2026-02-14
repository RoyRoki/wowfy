"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { cn, assetPath } from "@/lib/utils";
import { ParticleBurst } from "./ParticleBurst";

export interface Project {
    id: string;
    title: string;
    year: string;
    role: string;
    description: string;
    tech: string[];
    image?: string;
    liveUrl?: string;
    featured?: boolean;
    deviceType?: "laptop" | "phone";
    screenshots?: string[];
    metrics?: {
        users?: string;
        revenue?: string;
        performance?: string;
    };
    problem?: string;
    solution?: string;
    results?: string;
    projectType?: string;
}

interface Project3DCardProps {
    project: Project;
    index: number;
    onClick: () => void;
}

export function Project3DCard({ project, index, onClick }: Project3DCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Magnetic effect
    const magneticX = useMotionValue(0);
    const magneticY = useMotionValue(0);
    const magneticXSpring = useSpring(magneticX, { stiffness: 200, damping: 25 });
    const magneticYSpring = useSpring(magneticY, { stiffness: 200, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);

        // Magnetic pull
        magneticX.set(xPct * 20);
        magneticY.set(yPct * 20);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        magneticX.set(0);
        magneticY.set(0);
        setIsHovered(false);
    };

    // Get project image (primary screenshot or placeholder)
    const projectImage = project.screenshots?.[0] || project.image;

    return (
        <motion.div
            ref={cardRef}
            className="project-3d-card relative perspective-1000 group"
            style={{
                x: magneticXSpring,
                y: magneticYSpring,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <motion.div
                className={cn(
                    "relative overflow-hidden rounded-xl cursor-pointer",
                    "bg-[var(--color-surface-elevated)]",
                    "border border-white/[0.08]",
                    "h-[260px] md:h-[320px]", // Reduced height
                    "transform-gpu will-change-transform",
                    "transition-all duration-500 ease-out"
                )}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: {
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                    },
                }}
                animate={{
                    boxShadow: isHovered
                        ? "0 15px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                        : "0 4px 10px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
            >
                {/* Image */}
                <div className="absolute inset-0">
                    {projectImage ? (
                        <motion.img
                            src={assetPath(projectImage)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.05 }}
                            animate={{ scale: isHovered ? 1.1 : 1.05 }}
                            transition={{ duration: 0.6 }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-highlight)]/20">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl font-bold text-white/5">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Overlay - Dark Filter + Gradient for Text Readability */}
                <motion.div
                    className="absolute inset-0 bg-black/40" // General darkening filter
                    animate={{ opacity: isHovered ? 0.3 : 0.4 }} // Slightly lighten on hover
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"
                    animate={{ opacity: isHovered ? 1 : 0.9 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Project Type Badge */}
                <motion.div
                    className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.6)]",
                        project.projectType === "Team Project" ? "bg-blue-400 shadow-blue-400/50" : "bg-purple-400 shadow-purple-400/50"
                    )} />
                    <span className="text-[10px] font-medium text-white/90 tracking-wide uppercase">
                        {project.projectType || "Freelance"}
                    </span>
                </motion.div>

                {/* Year Badge - Minimal */}
                <span className="absolute top-4 right-4 text-[10px] font-medium text-white/60 tracking-wider">
                    {project.year}
                </span>

                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end" style={{ transform: "translateZ(20px)" }}>

                    {/* Tech Tags - Minimal */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.slice(0, 3).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/80 border border-white/5"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="px-1.5 py-0.5 text-[10px] text-white/50">+{project.tech.length - 3}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight group-hover:text-[var(--color-highlight)] transition-colors duration-300">
                        {project.title}
                    </h3>

                    {/* Role */}
                    <p className="text-xs text-white/60 line-clamp-1 mb-0">
                        {project.role}
                    </p>
                </div>

                {/* View Live Button - Minimal Icon */}
                {project.liveUrl && (
                    <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                        title="View Live Site"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.a>
                )}
            </motion.div>
        </motion.div>
    );
}
