"use client";

import { useId, useState, type ComponentPropsWithoutRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQEntry {
  question: string;
  answer: string;
}

interface FAQProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  categories: Record<string, string>;
  faqData: Record<string, FAQEntry[]>;
}

export function FAQ({ categories, faqData, className, ...props }: FAQProps) {
  const categoryKeys = Object.keys(categories).filter((key) => faqData[key]?.length);
  const [selected, setSelected] = useState(categoryKeys[0] ?? "");
  const id = useId();

  if (!categoryKeys.length) return null;

  return (
    <div className={cn("relative", className)} {...props}>
      <FAQTabs categories={categories} keys={categoryKeys} selected={selected} setSelected={setSelected} />
      <FAQList id={id} faqData={faqData} selected={selected} />
    </div>
  );
}

function FAQTabs({
  categories,
  keys,
  selected,
  setSelected,
}: {
  categories: Record<string, string>;
  keys: string[];
  selected: string;
  setSelected: (key: string) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-3" aria-label="Filter questions by topic">
      {keys.map((key) => {
        const isActive = selected === key;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={isActive}
            onClick={() => setSelected(key)}
            className={cn(
              "relative overflow-hidden whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]",
              isActive
                ? "border-violet-400/60 text-white"
                : "border-white/10 bg-transparent text-white/55 hover:border-white/25 hover:text-white",
            )}
          >
            <span className="relative z-10">{categories[key]}</span>
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={reduceMotion ? false : { y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={reduceMotion ? undefined : { y: "100%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: "backIn" }}
                  className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-violet-500/80"
                />
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

function FAQList({ id, faqData, selected }: { id: string; faqData: Record<string, FAQEntry[]>; selected: string }) {
  const reduceMotion = useReducedMotion();
  const questions = faqData[selected] ?? [];

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selected}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "backIn" }}
          className="space-y-4"
        >
          {questions.map((faq, index) => (
            <FAQItem key={`${selected}-${faq.question}`} {...faq} panelId={`${id}-${selected}-${index}`} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ question, answer, panelId }: FAQEntry & { panelId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        isOpen ? "border-white/15 bg-white/[0.06]" : "border-white/10 bg-white/[0.025] hover:border-white/20",
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-4 rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 sm:p-5"
        >
          <span
            className={cn(
              "text-base font-medium transition-colors sm:text-lg",
              isOpen ? "text-white" : "text-white/65",
            )}
          >
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="shrink-0"
          >
            <Plus aria-hidden="true" className={cn("size-5 transition-colors", isOpen ? "text-white" : "text-white/55")} />
          </motion.span>
        </button>
      </h3>
      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, marginBottom: isOpen ? 16 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" }}
        aria-hidden={!isOpen}
        className="overflow-hidden px-4 sm:px-5"
      >
        <p className="leading-relaxed text-white/60">{answer}</p>
      </motion.div>
    </div>
  );
}
