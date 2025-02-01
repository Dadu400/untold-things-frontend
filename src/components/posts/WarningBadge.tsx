import { WarningBadgeProps } from "../../types/types";

function WarningBadge({ text, className, icon, altText }: WarningBadgeProps) {
    return (
        <div className={`flex self-center items-center justify-center gap-x-2 border bg-white rounded-xl py-2 px-4 ${className}`}>
            <span>
                <img src={icon} alt={altText || "icon"} className="h-8 w-8" />
            </span>
            <span className="font-dejavu text-lg md:text-2xl">
                {text}
            </span>
        </div>
    );
}

export default WarningBadge;