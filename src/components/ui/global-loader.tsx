"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";

const FADE_MS = 500;
const FALLBACK_MS = 4000;

export function GlobalLoader() {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        const finish = () => {
            setFading(true);
            window.setTimeout(() => setVisible(false), FADE_MS);
        };

        if (document.readyState === "complete") {
            finish();
            return;
        }

        window.addEventListener("load", finish);
        // Fallback in case `load` is delayed by a slow third-party script.
        const fallback = window.setTimeout(finish, FALLBACK_MS);

        return () => {
            window.removeEventListener("load", finish);
            window.clearTimeout(fallback);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[300] flex items-center justify-center bg-[var(--color-background)] transition-opacity duration-500 ${
                fading ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            <Loader />
        </div>
    );
}

export default GlobalLoader;
