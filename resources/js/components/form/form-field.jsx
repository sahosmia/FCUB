import { Label } from "@/components/ui/label";

export default function FormField({ label, error, children }) {
    return (
        <div className="mb-4">
            {label && <Label className="mb-1 block">{label}</Label>}
            {children}
            {error && (
                <p className="text-sm font-medium text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
}
