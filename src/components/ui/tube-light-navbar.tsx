"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Briefcase, DollarSign, Mail, LucideIcon, User, Star, Code, Folder } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface NavItem {
    name: string
    url: string
    icon: string
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

const iconMap: Record<string, LucideIcon> = {
    Home: Home,
    Briefcase: Briefcase,
    DollarSign: DollarSign,
    Mail: Mail,
    User: User,
    Star: Star,
    Code: Code,
    Folder: Folder,
}

export function NavBar({ items, className }: NavBarProps) {
    const [activeTab, setActiveTab] = useState(items[0].name)
    const isMobile = useMediaQuery("(max-width: 768px)")

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const docHeight = document.documentElement.scrollHeight

            // Handle bottom of page - force the last item to be active if we're at the bottom
            if (scrollPosition + windowHeight >= docHeight - 50) {
                const lastItem = items[items.length - 1]
                if (activeTab !== lastItem.name) {
                    setActiveTab(lastItem.name)
                }
                return
            }

            let maxVisibleHeight = 0
            let currentSection = activeTab // Default to keeping current if no better match found

            for (const item of items) {
                const element = document.querySelector(item.url) as HTMLElement
                if (element) {
                    const rect = element.getBoundingClientRect()

                    // visible height calculation
                    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)

                    if (visibleHeight > maxVisibleHeight) {
                        maxVisibleHeight = visibleHeight
                        currentSection = item.name
                    }
                }
            }

            if (activeTab !== currentSection) {
                setActiveTab(currentSection)
            }
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [items, activeTab])

    return (
        <div
            className={cn(
                "fixed z-[200] h-max",
                // Mobile: Bottom navigation with safe-area padding
                isMobile
                    ? "bottom-0 left-0 right-0 pb-safe"
                    : "top-0 right-0 pt-6 pr-6 md:pr-12 lg:pr-24",
                className,
            )}
        >
            <div className={cn(
                "flex items-center bg-background/5 border border-border backdrop-blur-lg shadow-lg",
                // Mobile: Full-width bottom bar
                isMobile
                    ? "w-full justify-around px-2 py-2 rounded-none"
                    : "gap-3 py-1 px-1 rounded-full"
            )}>
                {items.map((item) => {
                    const Icon = iconMap[item.icon] || Home // Fallback to Home if icon not found
                    const isActive = activeTab === item.name

                    return (
                        <Link
                            key={item.name}
                            href={item.url}
                            onClick={(e) => {
                                e.preventDefault()
                                setActiveTab(item.name)
                                const element = document.querySelector(item.url)
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" })
                                }
                            }}
                            className={cn(
                                "relative cursor-pointer font-semibold transition-colors flex items-center justify-center",
                                // Mobile: Touch-optimized sizing (44x44px minimum)
                                isMobile
                                    ? "flex-col gap-1 min-h-[44px] min-w-[44px] px-2 py-2 rounded-lg"
                                    : "text-sm px-6 py-2 rounded-full",
                                "text-foreground/80 hover:text-accent",
                                isActive && "bg-muted text-accent",
                            )}
                        >
                            {/* Mobile: Show icon + text label */}
                            {isMobile ? (
                                <>
                                    <Icon size={20} strokeWidth={2.5} />
                                    <span className="text-[10px] leading-none">{item.name}</span>
                                </>
                            ) : (
                                <>
                                    {/* Desktop: Text only, icons on smaller desktop screens */}
                                    <span className="hidden md:inline">{item.name}</span>
                                    <span className="md:hidden">
                                        <Icon size={18} strokeWidth={2.5} />
                                    </span>
                                </>
                            )}

                            {/* Tube light effect (only on desktop) */}
                            {isActive && !isMobile && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-accent/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-accent/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-accent/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-accent/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}

                            {/* Mobile: Simple active indicator */}
                            {isActive && isMobile && (
                                <motion.div
                                    layoutId="mobile-indicator"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent rounded-full"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
