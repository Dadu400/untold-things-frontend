import { WarningBadgeProps } from "../../types/types";

function WarningBadge({ text, className, icon, altText }: WarningBadgeProps) {
    return (
        <div className={`flex self-center items-center justify-center gap-x-3 border bg-surface text-ink rounded-2xl py-2.5 px-4 shadow-card animate-fade-up ${className}`}>
            <span>
                <img src={icon} alt={altText || "icon"} className="h-7 w-7 md:h-8 md:w-8" />
            </span>
            <span className="font-dejavu tracking-wide text-lg md:text-2xl">
                {text}
            </span>
        </div>
    );
}

export default WarningBadge;