export interface WhyUsData {
    hero: {
        title: string;
        highlightedWord: string;
        particleWords: string[];
    };
    valueProposition: {
        headline: string;
        subheadline: string;
        description: string;
    };
    location: {
        label: string;
        city: string;
        servingLabel: string;
        targetAudience: string;
    };
    accessibility: {
        instruction: string;
    };
}

export interface TechStackItem {
    id: string;
    src: string;
    alt: string;
    title: string;
    glowColor: string;
}

export interface TechCategory {
    label: string;
    tech: string;
    color: string;
    modelPath: string;
}

export interface TechStackData {
    eyebrow: string;
    title: string;
    gradientText: string;
    description: string;
    logos: TechStackItem[];
    categories: TechCategory[];
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

