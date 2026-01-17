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
            className="project-3d-card relative perspective-1000"
            style={{
                x: magneticXSpring,
                y: magneticYSpring,
            }}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <motion.div
                className={cn(
                    "relative overflow-hidden rounded-2xl cursor-pointer",
                    "bg-[var(--color-surface-elevated)]",
                    "border border-white/[0.08]",
                    "h-[320px] md:h-[380px]",
                    "transform-gpu will-change-transform",
                    "transition-all duration-500 ease-out"
                )}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: {
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                    },
                }}
                animate={{
                    boxShadow: isHovered
                        ? "0 20px 60px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(167, 139, 250, 0.4)"
                        : "0 4px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.08)",
                }}
            >
                {/* Image / Gradient Background */}
                <div className="absolute inset-0">
                    {projectImage ? (
                        <motion.img
                            src={assetPath(projectImage)}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: isHovered ? 1.15 : 1.05 }}
                            transition={{ duration: 0.6 }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/30 to-[var(--color-highlight)]/30">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-8xl font-bold text-white/10">
                                    {project.title.charAt(0)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                    animate={{ opacity: isHovered ? 0.95 : 0.7 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Neon Glow Effect on Hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/20 via-transparent to-[var(--color-highlight)]/20" />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-highlight)] to-[var(--color-accent)]" />
                </motion.div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end" style={{ transform: "translateZ(40px)" }}>
                    {/* Year Badge */}
                    <motion.span
                        className="absolute top-6 right-6 text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/70"
                        animate={{ y: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0.7 }}
                    >
                        {project.year}
                    </motion.span>

                    {/* Tech Tags with Neon Glow */}
                    <motion.div
                        className="flex flex-wrap gap-2 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {project.tech.slice(0, 4).map((tech, i) => (
                            <motion.span
                                key={i}
                                className={cn(
                                    "relative px-3 py-1 text-xs font-medium rounded-full",
                                    "bg-[#7c3aed] backdrop-blur-sm",
                                    "border border-[#a78bfa]",
                                    "text-white",
                                    "transition-all duration-300"
                                )}
                                onMouseEnter={() => setHoveredTech(tech)}
                                onMouseLeave={() => setHoveredTech(null)}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                                }}
                            >
                                {tech}
                                {hoveredTech === tech && <ParticleBurst trigger={true} />}
                            </motion.span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="px-2 py-1 text-xs text-white/50">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </motion.div>

                    {/* Title with Kinetic Effect */}
                    <motion.h3
                        className="text-xl md:text-2xl font-semibold text-white mb-2"
                        animate={{
                            x: isHovered ? 10 : 0,
                            textShadow: isHovered
                                ? "0 0 30px rgba(139, 92, 246, 0.5)"
                                : "0 0 0px transparent",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Role */}
                    <motion.p
                        className="text-sm text-white/60"
                        animate={{ x: isHovered ? 10 : 0 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                    >
                        {project.role}
                    </motion.p>

                    {/* Metrics Preview on Hover */}
                    {project.metrics && (
                        <motion.div
                            className="mt-4 flex gap-4"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                        >
                            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                                <div key={key} className="text-center">
                                    <div className="text-lg font-bold text-[var(--color-highlight)]">{value}</div>
                                    <div className="text-xs text-white/40 uppercase">{key}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* View Project Indicator */}
                <motion.div
                    className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
