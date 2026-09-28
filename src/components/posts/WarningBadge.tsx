import { WarningBadgeProps } from "../../types/types";

function WarningBadge({ text, className, icon, altText, compact }: WarningBadgeProps) {
    // compact: a quiet status notice that shouldn't compete with the card below
    const box = compact ? "gap-x-2 py-1.5 px-3.5" : "gap-x-3 bg-surface py-2.5 px-4 shadow-card";
    const iconSize = compact ? "h-[18px] w-[18px] md:h-5 md:w-5" : "h-7 w-7 md:h-8 md:w-8";
    const textStyle = compact ? "font-heading text-[14px] md:text-[15px] leading-5 text-ink/80" : "font-dejavu tracking-wide text-lg md:text-2xl";

    return (
        <div className={`flex self-center items-center justify-center border text-ink rounded-2xl animate-fade-up ${box} ${className}`}>
            <span className="shrink-0">
                <img src={icon} alt={altText || "icon"} className={iconSize} />
            </span>
            <span className={textStyle}>
                {text}
            </span>
        </div>
    );
}

export default WarningBadge;
