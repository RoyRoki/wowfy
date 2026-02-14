"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
    const [formData, setFormData] = useState({
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFormData({ email: "", message: "" });

            // Reset success message after 3 seconds
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <input
                        type="email"
                        placeholder="Your email address"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all text-sm placeholder:text-white/40"
                    />
                </div>

                <div className="space-y-2">
                    <textarea
                        placeholder="What's on your mind?"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all text-sm resize-none placeholder:text-white/40"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className={cn(
                        "group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-medium uppercase tracking-widest transition-all duration-500",
                        status === "success"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20 cursor-default"
                            : status === "error"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-transparent text-white border border-white/20 hover:bg-white hover:text-black hover:border-white hover:scale-[1.02]"
                    )}
                >
                    {status === "loading" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : status === "success" ? (
                        <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Message Sent</span>
                        </>
                    ) : status === "error" ? (
                        <>
                            <AlertCircle className="w-4 h-4" />
                            <span>Try Again</span>
                        </>
                    ) : (
                        <>
                            <span>Send Message</span>
                            <Send className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                    )}
                </button>

                {status === "error" && (
                    <p className="text-xs text-red-400/80 text-center mt-2">{errorMessage}</p>
                )}
            </form>
        </div>
    );
}
