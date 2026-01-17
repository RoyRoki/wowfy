import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Get the base path for public assets (handles GitHub Pages deployment)
export function getBasePath(): string {
    return process.env.NODE_ENV === 'production' ? '/wowfy' : '';
}

// Helper to prefix asset paths with basePath
export function assetPath(path: string): string {
    const basePath = getBasePath();
    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${basePath}${normalizedPath}`;
}

