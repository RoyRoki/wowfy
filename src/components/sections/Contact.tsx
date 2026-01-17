"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after animation
        setTimeout(() => {
            setIsSubmitted(false);
            setFormState({ name: "", email: "", message: "" });
        }, 3000);
    };

    return (
        <section id="contact" className="section-padding relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[var(--color-background-alt)]/50" />
                <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            <div className="container-wide relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <span className="text-sm uppercase tracking-widest text-[var(--color-accent)] mb-4 block">
                            Get In Touch
                        </span>
                        <h2 className="text-headline mb-6">
                            Let's Build Something <span className="text-gradient">Amazing</span>
                        </h2>
                        <p className="text-body-lg max-w-2xl mx-auto">
                            Ready to transform your vision into reality? We're here to help.
                        </p>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="glass rounded-3xl p-8 md:p-12"
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <SuccessMessage key="success" />
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FloatingInput
                                            id="name"
                                            label="Your Name"
                                            value={formState.name}
                                            onChange={(e) =>
                                                setFormState({ ...formState, name: e.target.value })
                                            }
                                            required
                                        />
                                        <FloatingInput
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            value={formState.email}
                                            onChange={(e) =>
                                                setFormState({ ...formState, email: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                    <FloatingTextarea
                                        id="message"
                                        label="Tell us about your project"
                                        value={formState.message}
                                        onChange={(e) =>
                                            setFormState({ ...formState, message: e.target.value })
                                        }
                                        required
                                        rows={5}
                                    />

                                    <div className="flex justify-center pt-4">
                                        <MagneticButton
                                            variant="primary"
                                            size="lg"
                                            onClick={() => { }}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <motion.span
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </>
                                            )}
                                        </MagneticButton>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

interface FloatingInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

function FloatingInput({
    id,
    label,
    type = "text",
    value,
    onChange,
    required,
}: FloatingInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn(
                    "w-full px-4 py-4 pt-6 rounded-xl",
                    "bg-white/5 border border-white/10",
                    "text-[var(--color-text-primary)]",
                    "outline-none transition-all duration-300",
                    "focus:border-[var(--color-accent)] focus:bg-white/10",
                    isFocused && "shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                )}
                placeholder=" "
            />
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    value || isFocused
                        ? "top-2 text-xs text-[var(--color-accent)]"
                        : "top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                )}
            >
                {label}
            </label>
        </div>
    );
}

interface FloatingTextareaProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    rows?: number;
}

function FloatingTextarea({
    id,
    label,
    value,
    onChange,
    required,
    rows = 4,
}: FloatingTextareaProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative">
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={cn(
                    "w-full px-4 py-4 pt-6 rounded-xl resize-none",
                    "bg-white/5 border border-white/10",
                    "text-[var(--color-text-primary)]",
                    "outline-none transition-all duration-300",
                    "focus:border-[var(--color-accent)] focus:bg-white/10",
                    isFocused && "shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                )}
                placeholder=" "
            />
            <label
                htmlFor={id}
                className={cn(
                    "absolute left-4 transition-all duration-300 pointer-events-none",
                    value || isFocused
                        ? "top-2 text-xs text-[var(--color-accent)]"
                        : "top-6 text-[var(--color-text-muted)]"
                )}
            >
                {label}
            </label>
        </div>
    );
}

function SuccessMessage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
        >
            {/* Animated Checkmark */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
            >
                <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                    />
                </motion.svg>
            </motion.div>

            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-semibold mb-2"
            >
                Message Sent!
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[var(--color-text-secondary)]"
            >
                We'll get back to you within 24 hours.
            </motion.p>
        </motion.div>
    );
}
