"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Briefcase, DollarSign, Mail, LucideIcon, User, Star, Code, Folder } from "lucide-react"
import { cn } from "@/lib/utils"

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
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            className={cn(
                "fixed top-0 right-0 z-[200] pt-6 pr-24 h-max",
                className,
            )}
        >
            <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
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
                                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
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
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
