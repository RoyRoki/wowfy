export interface ProductStat {
    label: string;
    value: string;
}

export interface ProductJourneyStep {
    title: string;
    date: string;
    content: string;
    status: "completed" | "in-progress" | "pending";
}

export interface ProductImages {
    hero: string;
    app: string;
    feature: string;
    og: string;
    gallery?: string[];
}

export interface Product {
    id: string;
    code: string;
    name: string;
    tagline: string;
    description: string;
    status: "live" | "upcoming";
    category: string;
    url?: string;
    stats: ProductStat[];
    features: string[];
    journey: ProductJourneyStep[];
    capabilities: string[];
    accentColor: string;
    bannerPrompts: string[];
    images: ProductImages;
    upcomingNote?: string;
}

export interface TechStackItem {
    id: string;
    name: string;
    icon?: string;
    src?: string;
}

export interface TechStackGroup {
    id: string;
    label: string;
    description: string;
    items: TechStackItem[];
}

export interface TechStackData {
    eyebrow: string;
    title: string;
    gradientText: string;
    description: string;
    groups: TechStackGroup[];
    footerText: string;
}

export interface SocialLink {
    name: string;
    href: string;
    icon: string; // "GitHub" | "Twitter" | "LinkedIn" | "Instagram"
}

export interface FooterData {
    socialLinks: SocialLink[];
    contactHeading: string;
    contactSubHeading: string;
    copyrightText: string;
}

export interface JourneyItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: string; // Component name mapping
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    title: string;
    company: string;
    avatar: string; // path to avatar image
    rating: number;
}

export interface PricingPlan {
    id: string;
    titleBadge: string;
    priceLabel: string;
    priceSuffix?: string;
    features: string[];
    cta: string;
    isFeatured?: boolean; // For the "Growth" card styling
    isRecommended?: boolean;
}

