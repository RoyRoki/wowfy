"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Home, Briefcase, DollarSign, Mail, LucideIcon, User, Star, Code, Folder, Menu, X, ArrowRight } from "lucide-react"
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
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)")

    // Mobile Navigation Logic
    // Desired: Home, Services, Works (Most Imp), Contact, More
    const mobileImportant = ["Home", "Services", "Works", "Contact"]
    const mobileItems = mobileImportant.map(name => items.find(item => item.name === name)).filter(Boolean) as NavItem[]

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const docHeight = document.documentElement.scrollHeight

            // Handle bottom of page
            if (scrollPosition + windowHeight >= docHeight - 50) {
                const lastItem = items[items.length - 1]
                if (activeTab !== lastItem.name) {
                    setActiveTab(lastItem.name)
                }
                return
            }

            let maxVisibleHeight = 0
            let currentSection = activeTab

            for (const item of items) {
                const element = document.querySelector(item.url) as HTMLElement
                if (element) {
                    const rect = element.getBoundingClientRect()
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

    const handleLinkClick = (e: React.MouseEvent, item: NavItem) => {
        e.preventDefault()
        setActiveTab(item.name)
        setIsMenuOpen(false)
        const element = document.querySelector(item.url)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <>
            <div
                className={cn(
                    "fixed z-[200] h-max",
                    isMobile
                        ? "bottom-0 left-0 right-0 pb-safe"
                        : "top-0 right-0 pt-6 pr-6 md:pr-12 lg:pr-24",
                    className,
                )}
            >
                <div className={cn(
                    "flex items-center bg-background/5 border border-border backdrop-blur-lg shadow-lg transition-all duration-300",
                    isMobile
                        ? "w-full justify-around px-1 py-2 rounded-t-2xl border-b-0 bg-black/80 backdrop-blur-xl border-white/10"
                        : "gap-3 py-1 px-1 rounded-full"
                )}>
                    {isMobile ? (
                        /* Mobile Render */
                        <>
                            {mobileItems.map((item, index) => {
                                const Icon = iconMap[item.icon] || Home
                                const isActive = activeTab === item.name

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.url}
                                        onClick={(e) => handleLinkClick(e, item)}
                                        className={cn(
                                            "relative cursor-pointer flex flex-col items-center justify-center transition-all duration-300",
                                            "px-1 py-1 rounded-xl",
                                        )}
                                    >
                                        <div className={cn(
                                            "relative flex items-center justify-center transition-all duration-300",
                                            "w-10 h-10 rounded-xl hover:bg-white/10",
                                            isActive && "text-accent bg-white/10",
                                            !isActive && "text-muted-foreground"
                                        )}>
                                            <Icon
                                                size={20}
                                                strokeWidth={2.5}
                                            />
                                        </div>
                                        <span className={cn(
                                            "text-[10px] font-medium mt-1 leading-none transition-colors",
                                            isActive ? "text-accent" : "text-muted-foreground",
                                        )}>
                                            {item.name}
                                        </span>
                                    </Link>
                                )
                            })}

                            {/* More Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="relative cursor-pointer flex flex-col items-center justify-center px-1 py-1 rounded-xl group"
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors",
                                    isMenuOpen ? "text-accent bg-white/10" : "text-muted-foreground group-hover:text-accent"
                                )}>
                                    {isMenuOpen ? (
                                        <X size={20} strokeWidth={2.5} />
                                    ) : (
                                        <Menu size={20} strokeWidth={2.5} />
                                    )}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-medium mt-1 leading-none transition-colors",
                                    isMenuOpen ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                                )}>
                                    {isMenuOpen ? "Close" : "Menu"}
                                </span>
                            </button>
                        </>
                    ) : (
                        /* Desktop Render */
                        items.map((item) => {
                            const Icon = iconMap[item.icon] || Home
                            const isActive = activeTab === item.name

                            return (
                                <Link
                                    key={item.name}
                                    href={item.url}
                                    onClick={(e) => handleLinkClick(e, item)}
                                    className={cn(
                                        "relative cursor-pointer font-semibold transition-colors flex items-center justify-center text-sm px-6 py-2 rounded-full",
                                        "text-foreground/80 hover:text-accent",
                                        isActive && "bg-muted text-accent",
                                    )}
                                >
                                    <span className="hidden md:inline">{item.name}</span>
                                    <span className="md:hidden">
                                        <Icon size={18} strokeWidth={2.5} />
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="lamp"
                                            className="absolute inset-0 w-full bg-accent/5 rounded-full -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-t-full">
                                                <div className="absolute w-12 h-6 bg-accent/20 rounded-full blur-md -top-2 -left-2" />
                                                <div className="absolute w-8 h-6 bg-accent/20 rounded-full blur-md -top-1" />
                                                <div className="absolute w-4 h-4 bg-accent/20 rounded-full blur-sm top-0 left-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Mobile "More" Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && isMobile && (
                    <>
                        {/* Backdrop to close menu when clicking outside */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-[190] bg-black/50 backdrop-blur-sm"
                        />

                        {/* Menu Popover */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-24 right-4 z-[200] w-64 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-2 space-y-1">
                                {items
                                    .filter(item => !mobileImportant.includes(item.name)) // Filter out already visible items
                                    .map((item, index) => {
                                        const Icon = iconMap[item.icon] || Home
                                        const isActive = activeTab === item.name

                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.url}
                                                onClick={(e) => handleLinkClick(e, item)}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                                    isActive
                                                        ? "bg-white/10 text-accent"
                                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                                )}
                                            >
                                                <Icon size={18} strokeWidth={2} />
                                                <span className="text-sm font-medium">{item.name}</span>
                                            </Link>
                                        )
                                    })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
