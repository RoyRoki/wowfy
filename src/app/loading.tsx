import { Loader } from "@/components/ui/loader";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[var(--color-background)]">
            <Loader />
        </div>
    );
}
