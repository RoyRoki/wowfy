"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Draggable);
}

interface NavItem {
    id: string;
    label: string;
    href: string;
}

interface CircularRadialNavProps {
    items?: NavItem[];
}

const defaultItems: NavItem[] = [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "welcome", label: "About", href: "#welcome" },
    { id: "services", label: "Services", href: "#services" },
    { id: "tech-stack", label: "Tech Stack", href: "#tech-stack" },
    { id: "portfolio", label: "Projects", href: "#portfolio" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
    { id: "contact", label: "Contact", href: "#contact" },
].reverse(); // Reverse order: Contact, Pricing, Projects, Services, About, Home

// Helper to create SVG arc path
const createArcPath = (radius: number) => {
    const startAngle = -Math.PI / 2; // Top (-90°)
    const endAngle = Math.PI / 2; // Bottom (+90°)
    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    const endX = Math.cos(endAngle) * radius;
    const endY = Math.sin(endAngle) * radius;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
};

export function CircularRadialNav({ items = defaultItems }: CircularRadialNavProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentRotation, setCurrentRotation] = useState(0);
    const [dragRotation, setDragRotation] = useState(0); // Track rotation only during drag
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);

    // Radius of the semicircle
    const radius = 160;
    const itemCount = items.length;

    useEffect(() => {
        if (!containerRef.current || !circleRef.current) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        // Setup Draggable
        const draggableInstance = Draggable.create(circleRef.current, {
            type: "rotation",
            inertia: true,
            onDragStart: function () {
                isDraggingRef.current = true;
                setIsDragging(true);
            },
            onDrag: function () {
                const rotation = this.rotation;
                setCurrentRotation(rotation);
                setDragRotation(rotation); // Update drag rotation for text counter-rotation
            },
            onDragEnd: function () {
                setTimeout(() => {
                    isDraggingRef.current = false;
                    setIsDragging(false);
                }, 100);
            },
        });

        // Setup ScrollTrigger for each section
        const triggers = items.map((item, index) => {
            return ScrollTrigger.create({
                trigger: item.href,
                start: "top center",
                end: "bottom center",
                onEnter: () => !isDraggingRef.current && setActiveIndex(index),
                onEnterBack: () => !isDraggingRef.current && setActiveIndex(index),
            });
        });

        return () => {
            draggableInstance[0]?.kill();
            triggers.forEach((t) => t.kill());
        };
    }, [items]);

    // Auto-rotate to bring active item to top position (-90°)
    useEffect(() => {
        if (!circleRef.current || isDraggingRef.current) return;

        // Calculate rotation needed to bring active item to -90° (top position)
        // Items are arranged from -90° (top) to +90° (bottom) in the semicircle
        // We want to rotate so active item moves to the -90° position (top)
        const targetRotation = -activeIndex * (180 / (itemCount - 1)) + 270;

        gsap.to(circleRef.current, {
            rotation: targetRotation,
            duration: 1.2,
            ease: "back.out(1.2)", // Spring-like ease for creative agency feel
            onUpdate: function () {
                const rotation = this.targets()[0]._gsap.rotation || 0;
                setCurrentRotation(rotation);
            },
        });
    }, [activeIndex, itemCount]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                e.preventDefault();
                setActiveIndex((prev) => Math.max(0, prev - 1));
                buttonRefs.current[Math.max(0, activeIndex - 1)]?.focus();
            } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                e.preventDefault();
                setActiveIndex((prev) => Math.min(itemCount - 1, prev + 1));
                buttonRefs.current[Math.min(itemCount - 1, activeIndex + 1)]?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, itemCount]);

    const handleItemClick = (index: number, href: string) => {
        setActiveIndex(index);

        // Smooth scroll to section
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div
            ref={containerRef}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none overflow-visible"
            style={{ touchAction: "none" }}
            role="navigation"
            aria-label="Circular radial navigation"
        >
            {/* Backdrop gradient for visual polish */}
            <div
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                    width: radius * 2.5,
                    height: radius * 2.5,
                    background: `radial-gradient(circle at 100% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)`,
                }}
            />

            {/* Main semicircle container - positioned so circle center is AT the right edge */}
            <div
                ref={circleRef}
                className={`relative pointer-events-auto transition-opacity duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    // Position so the circle center is exactly at the right edge of screen
                    transform: `translateX(${radius}px)`,
                    willChange: 'transform',
                }}
                aria-hidden="true"
            >
                {/* SVG Arc Path */}
                <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    width={radius * 2}
                    height={radius * 2}
                    viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                    style={{ overflow: 'visible' }}
                >
                    {/* Main arc path */}
                    <path
                        d={createArcPath(radius)}
                        stroke="url(#arcGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        className="opacity-30"
                    />

                    {/* Animated dashed overlay for creative effect */}
                    <path
                        d={createArcPath(radius)}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="4 8"
                        strokeLinecap="round"
                        className="animate-dash"
                    />

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.6)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Menu items arranged in semicircle */}
                {items.map((item, index) => {
                    // Semicircle: from top (-90°) to bottom (+90°)
                    const angle = (index / (itemCount - 1)) * Math.PI - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const active = index === activeIndex;
                    const hovered = index === hoveredIndex;

                    // Calculate effective angle after rotation (in degrees)
                    const angleDeg = angle * (180 / Math.PI);
                    let effectiveAngle = angleDeg + currentRotation;

                    // Normalize to -180 to 180 range
                    while (effectiveAngle > 180) effectiveAngle -= 360;
                    while (effectiveAngle < -180) effectiveAngle += 360;

                    // Determine text position based on dot's effective angle
                    // Top-right quadrant (-90° to 0°): text to the left
                    // Bottom-right quadrant (0° to 90°): text to the left
                    // Other positions: text to the right
                    const textOnLeft = effectiveAngle >= -90 && effectiveAngle <= 90;

                    return (
                        <div
                            key={item.id}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                zIndex: active ? 10 : 1,
                            }}
                        >
                            <button
                                ref={(el) => { buttonRefs.current[index] = el; }}
                                onClick={() => handleItemClick(index, item.href)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative pointer-events-auto transition-all duration-500 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
                                aria-label={`Navigate to ${item.label}`}
                                aria-current={active ? "page" : undefined}
                                tabIndex={0}
                            >
                                {/* Glow effect for active item */}
                                {active && (
                                    <div
                                        className="absolute inset-0 rounded-full blur-xl animate-pulse"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                                            width: '32px',
                                            height: '32px',
                                            transform: 'translate(-50%, -50%)',
                                            left: '50%',
                                            top: '50%',
                                        }}
                                    />
                                )}

                                {/* Item dot with enhanced active state */}
                                <div
                                    className={`
                                        rounded-full transition-all duration-500 ease-out relative
                                        ${active
                                            ? "w-5 h-5 bg-gradient-to-br from-white via-white to-white/80 shadow-lg shadow-white/30"
                                            : hovered
                                                ? "w-3 h-3 bg-white/70 scale-110 shadow-md shadow-white/20"
                                                : "w-2 h-2 bg-white/40"
                                        }
                                    `}
                                    style={{
                                        willChange: active ? 'transform' : 'auto',
                                    }}
                                >
                                    {/* Inner dot for active state */}
                                    {active && (
                                        <div className="absolute inset-1 rounded-full bg-white/90 animate-pulse" />
                                    )}
                                </div>

                                {/* Label - always stays horizontal with smart positioning */}
                                <div
                                    ref={(el) => { labelRefs.current[index] = el; }}
                                    className={`
                                        absolute whitespace-nowrap pointer-events-none
                                        transition-all duration-500
                                        ${textOnLeft ? 'right-full mr-4' : 'left-full ml-4'}
                                        ${active
                                            ? "text-white font-semibold text-base tracking-wide"
                                            : hovered
                                                ? "text-white/90 font-normal text-sm"
                                                : "text-white/50 font-light text-sm"
                                        }
                                    `}
                                    style={{
                                        transformOrigin: textOnLeft ? "right center" : "left center",
                                        transform: `rotate(${-currentRotation}deg) ${active ? 'scale(1.1)' : hovered ? 'scale(1.05)' : 'scale(1)'}`,
                                        textShadow: active ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
                                    }}
                                >
                                    {item.label}
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Add dash animation styles */}
            <style jsx>{`
                @keyframes dash {
                    to {
                        stroke-dashoffset: -100;
                    }
                }
                .animate-dash {
                    animation: dash 20s linear infinite;
                }
            `}</style>
        </div>
    );
}
