import { Variants } from "framer-motion";

// ========================================
// Fade & Slide Animations
// ========================================

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeInDown: Variants = {
    hidden: {
        opacity: 0,
        y: -40
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    },
};

// ========================================
// Scale Animations
// ========================================

export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
};

export const scaleInBounce: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 300,
        }
    },
};

// ========================================
// Blur Animations
// ========================================

export const blurIn: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
};

export const blurInUp: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 50,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    },
};

// ========================================
// Container Animations (Stagger Children)
// ========================================

export const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerFast: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

export const staggerContainerSlow: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

// ========================================
// Character Animation (for text reveals)
// ========================================

export const charContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        },
    },
};

export const charVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
        rotateX: -90,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
        }
    },
};

export const charBlurVariant: Variants = {
    hidden: {
        opacity: 0,
        filter: "blur(8px)",
        y: 30,
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
        }
    },
};

// ========================================
// Hover Animations
// ========================================

export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const hoverLift = {
    y: -8,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};

export const hoverGlow = {
    boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)",
    transition: { duration: 0.3 },
};

// ========================================
// Card Animations
// ========================================

export const cardHover = {
    y: -12,
    scale: 1.02,
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

export const cardVariant: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
        }
    },
};

// ========================================
// Parallax Helper
// ========================================

export const parallaxY = (strength: number = 50): Variants => ({
    hidden: { y: strength },
    visible: {
        y: -strength,
        transition: {
            duration: 0.1,
            ease: "linear",
        }
    },
});

// ========================================
// Exit Animations
// ========================================

export const exitFade = {
    opacity: 0,
    transition: { duration: 0.3 },
};

export const exitScale = {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
};

export const exitSlideUp = {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
};
