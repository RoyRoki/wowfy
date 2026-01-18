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
    // If already an absolute URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // In production, return full GitHub Pages URL
    if (process.env.NODE_ENV === 'production') {
        return `https://royroki.github.io/wowfy${normalizedPath}`;
    }

    // In development, return local path
    return normalizedPath;
}

