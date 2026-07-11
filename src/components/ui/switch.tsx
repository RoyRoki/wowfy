"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border transition-colors duration-300",
                checked
                    ? "border-emerald-400/50 bg-emerald-500/30"
                    : "border-white/15 bg-white/5",
                className
            )}
        >
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={cn(
                    "inline-block h-6 w-6 rounded-full shadow-md",
                    checked ? "bg-emerald-400" : "bg-white/70"
                )}
                style={{ marginLeft: checked ? "calc(100% - 1.5rem - 3px)" : "3px" }}
            />
        </button>
    );
}
