"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUpRight, Calendar, MessageCircle } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ContactData {
    email: string
    phone: string
    whatsapp: string
    calendly: string
}

// Magnetic text component for individual characters
function MagneticChar({
    char,
    index,
    isSpace
}: {
    char: string
    index: number
    isSpace: boolean
}) {
    const charRef = useRef<HTMLSpanElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!charRef.current) return
        const rect = charRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distX = e.clientX - centerX
        const distY = e.clientY - centerY
        const distance = Math.sqrt(distX * distX + distY * distY)
        const maxDistance = 150

        if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.4
            setPosition({
                x: distX * force,
                y: distY * force
            })
        } else {
            setPosition({ x: 0, y: 0 })
        }
    }, [])

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 })
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [handleMouseMove])

    if (isSpace) {
        return <span className="inline-block w-[0.3em]">&nbsp;</span>
    }

    return (
        <span
            ref={charRef}
            className="magnetic-char inline-block transition-transform duration-300 ease-out will-change-transform"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
            }}
            data-index={index}
        >
            {char}
        </span>
    )
}

// Reactive text line with GSAP animations
function AnimatedTextLine({
    text,
    className,
    delay = 0,
    isSecondary = false
}: {
    text: string
    className?: string
    delay?: number
    isSecondary?: boolean
}) {
    const lineRef = useRef<HTMLDivElement>(null)
    const charsRef = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        if (!lineRef.current) return

        const chars = charsRef.current.filter(Boolean)

        // Initial state - chars hidden
        gsap.set(chars, {
            opacity: 0,
            y: 80,
            rotateX: -90,
            scale: 0.5,
        })

        // Create scroll-triggered reveal
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: lineRef.current,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
            }
        })

        tl.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            stagger: {
                each: 0.03,
                from: "start",
            },
            ease: "power4.out",
            delay: delay,
            onComplete: () => {
                if (lineRef.current) {
                    lineRef.current.style.overflow = 'visible';
                }
            }
        })

        return () => {
            tl.kill()
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === lineRef.current) st.kill()
            })
        }
    }, [delay])

    const chars = text.split('')

    return (
        <div
            ref={lineRef}
            className={`perspective-[1000px] ${className || ''}`}
            style={{ perspective: '1000px', overflow: 'hidden' }}
        >
            <div className="flex justify-center flex-wrap">
                {chars.map((char, index) => (
                    <span
                        key={index}
                        ref={el => { charsRef.current[index] = el }}
                        className={`inline-block transform-gpu will-change-transform ${isSecondary ? 'text-muted-foreground/60' : ''
                            }`}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <MagneticChar
                            char={char}
                            index={index}
                            isSpace={char === ' '}
                        />
                    </span>
                ))}
            </div>
        </div>
    )
}

export function LetsWorkTogether() {
    const sectionRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const [contactData, setContactData] = useState<ContactData | null>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    // Track mouse for glow effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // GSAP hover glow animation
    useEffect(() => {
        if (!glowRef.current) return

        gsap.to(glowRef.current, {
            x: mousePos.x,
            y: mousePos.y,
            duration: 0.8,
            ease: "power2.out",
        })
    }, [mousePos])

    useEffect(() => {
        fetch('/data/contact.json')
            .then(res => res.json())
            .then(data => setContactData(data))
            .catch(() => {
                setContactData({
                    email: "rokiroydev@gmail.com",
                    phone: "9800881300",
                    whatsapp: "9800881300",
                    calendly: "https://cal.com/jatin-yadav05/15min"
                })
            })
    }, [])

    // GSAP entrance animation
    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            // Animate the availability badge
            gsap.from(".availability-badge", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out",
            })

            // Animate the CTA button
            gsap.from(".cta-button", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                },
                opacity: 0,
                scale: 0.8,
                duration: 1,
                delay: 0.5,
                ease: "elastic.out(1, 0.5)",
            })

            // Animate the bottom text
            gsap.from(".bottom-text", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.8,
                ease: "power3.out",
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsClicked(true)

        // GSAP explosion effect
        if (containerRef.current) {
            gsap.to(".magnetic-char", {
                y: () => gsap.utils.random(-200, -400),
                x: () => gsap.utils.random(-100, 100),
                rotation: () => gsap.utils.random(-45, 45),
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                stagger: {
                    each: 0.02,
                    from: "center",
                },
                ease: "power3.out",
            })
        }

        setTimeout(() => {
            setShowSuccess(true)
        }, 600)
    }

    const handleWhatsAppClick = () => {
        const whatsappNumber = contactData?.whatsapp || "9800881300"
        const message = encodeURIComponent("Hi! I'd like to discuss a project with you.")
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
    }

    const handleCallNow = () => {
        const phoneNumber = contactData?.phone || "9800881300"
        window.location.href = `tel:${phoneNumber}`
    }

    return (
        <section
            ref={sectionRef}
            className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden"
        >
            {/* Animated glow that follows mouse */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute w-[600px] h-[600px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0.1) 40%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(60px)',
                }}
            />

            <div ref={containerRef} className="relative flex flex-col items-center gap-12">
                {/* Success state overlay */}
                <div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                        opacity: showSuccess ? 1 : 0,
                        transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                        pointerEvents: showSuccess ? "auto" : "none",
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span
                            className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground transition-all duration-500"
                            style={{
                                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                opacity: showSuccess ? 1 : 0,
                                transitionDelay: "100ms",
                            }}
                        >
                            Perfect
                        </span>
                        <h3
                            className="text-3xl font-light tracking-tight text-foreground transition-all duration-500 sm:text-4xl"
                            style={{
                                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                                opacity: showSuccess ? 1 : 0,
                                transitionDelay: "200ms",
                            }}
                        >
                            Let&apos;s talk
                        </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <button
                            onClick={handleWhatsAppClick}
                            className="group relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 transition-all duration-500 cursor-pointer hover:border-emerald-500 hover:bg-emerald-500 sm:px-8 sm:py-4"
                            style={{
                                transform: showSuccess ? "translateY(0) scale(1)" : "translateY(15px) scale(1)",
                                opacity: showSuccess ? 1 : 0,
                                transitionDelay: "150ms",
                            }}
                        >
                            <MessageCircle
                                className="size-4 transition-all duration-500 group-hover:text-white sm:size-5"
                                strokeWidth={1.5}
                            />
                            <span className="text-sm font-medium tracking-wide transition-all duration-500 group-hover:text-white sm:text-base">
                                WhatsApp
                            </span>
                            <ArrowUpRight
                                className="size-4 transition-all duration-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-5"
                                strokeWidth={1.5}
                            />
                        </button>

                        <button
                            onClick={handleCallNow}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}
                            className="group relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 transition-all duration-500 cursor-pointer sm:px-8 sm:py-4 min-w-[180px] sm:min-w-[200px]"
                            style={{
                                transform: showSuccess
                                    ? isButtonHovered
                                        ? "translateY(0) scale(1.02)"
                                        : "translateY(0) scale(1)"
                                    : "translateY(15px) scale(1)",
                                opacity: showSuccess ? 1 : 0,
                                transitionDelay: "250ms",
                                borderColor: isButtonHovered ? "var(--foreground)" : "var(--border)",
                                backgroundColor: isButtonHovered ? "var(--foreground)" : "transparent",
                                boxShadow: isButtonHovered ? "0 0 30px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.08)" : "none",
                            }}
                        >
                            <Calendar
                                className="size-4 transition-all duration-500 sm:size-5"
                                strokeWidth={1.5}
                                style={{
                                    color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                }}
                            />
                            <span
                                className="text-sm font-medium tracking-wide transition-all duration-500 sm:text-base whitespace-nowrap"
                                style={{
                                    color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                }}
                            >
                                Call now
                            </span>
                            <ArrowUpRight
                                className="size-4 transition-all duration-500 sm:size-5 ml-auto"
                                strokeWidth={1.5}
                                style={{
                                    color: isButtonHovered ? "var(--background)" : "var(--foreground)",
                                    transform: isButtonHovered ? "translate(3px, -3px) scale(1.1)" : "translate(0, 0) scale(1)",
                                }}
                            />
                        </button>
                    </div>

                    <span
                        className="text-xs tracking-widest uppercase text-muted-foreground/50 transition-all duration-500"
                        style={{
                            transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                            opacity: showSuccess ? 1 : 0,
                            transitionDelay: "450ms",
                        }}
                    >
                        Quick response guaranteed
                    </span>
                </div>

                {/* Availability badge */}
                <div
                    className="availability-badge flex items-center gap-3 transition-all duration-500"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(-20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                        Available for projects
                    </span>
                </div>

                {/* Main reactive text */}
                <div
                    className="group relative cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleClick}
                    style={{
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        {/* Animated headline with magnetic characters */}
                        <div
                            className="text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl font-display"
                            style={{
                                opacity: isClicked ? 0 : 1,
                            }}
                        >
                            <AnimatedTextLine
                                text="Let's work"
                                delay={0}
                            />
                            <AnimatedTextLine
                                text="together"
                                delay={0.15}
                                isSecondary
                            />
                        </div>

                        {/* CTA button */}
                        <div className="cta-button relative mt-8 flex size-16 items-center justify-center sm:size-20">
                            <div
                                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                                style={{
                                    borderColor: isClicked ? "var(--foreground)" : isHovered ? "var(--foreground)" : "var(--border)",
                                    backgroundColor: isClicked ? "transparent" : isHovered ? "var(--foreground)" : "transparent",
                                    transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                                    opacity: isClicked ? 0 : 1,
                                    transitionDuration: isClicked ? "700ms" : "500ms",
                                }}
                            />
                            <ArrowUpRight
                                className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                                style={{
                                    transform: isClicked
                                        ? "translate(100px, -100px) scale(0.5)"
                                        : isHovered
                                            ? "translate(2px, -2px)"
                                            : "translate(0, 0)",
                                    opacity: isClicked ? 0 : 1,
                                    color: isHovered && !isClicked ? "var(--background)" : "var(--foreground)",
                                    transitionDuration: isClicked ? "600ms" : "500ms",
                                }}
                            />
                        </div>
                    </div>

                    {/* Side decorative lines */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
                        <div
                            className="h-px w-8 bg-gradient-to-r from-transparent via-border to-border transition-all duration-500 sm:w-12"
                            style={{
                                transform: isClicked ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                            }}
                        />
                    </div>
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
                        <div
                            className="h-px w-8 bg-gradient-to-l from-transparent via-border to-border transition-all duration-500 sm:w-12"
                            style={{
                                transform: isClicked ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                                opacity: isClicked ? 0 : isHovered ? 1 : 0.5,
                            }}
                        />
                    </div>
                </div>

                {/* Bottom text */}
                <div
                    className="bottom-text mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
                    style={{
                        opacity: isClicked ? 0 : 1,
                        transform: isClicked ? "translateY(20px)" : "translateY(0)",
                        pointerEvents: isClicked ? "none" : "auto",
                    }}
                >
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                        Have a project in mind? I&apos;d love to hear about it. Let&apos;s create something exceptional together.
                    </p>
                    <span className="text-xs tracking-widest uppercase text-muted-foreground/60">
                        {contactData?.email || "rokiroydev@gmail.com"}
                    </span>
                </div>
            </div>

            {/* CSS for perspective and 3D transforms */}
            <style jsx>{`
                .magnetic-char {
                    display: inline-block;
                    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .magnetic-char:hover {
                    color: rgb(16, 185, 129);
                }
            `}</style>
        </section>
    )
}
