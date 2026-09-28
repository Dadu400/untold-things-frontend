import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const matches = () => window.matchMedia?.(QUERY).matches ?? false;

// For JS-driven animations the global CSS reduced-motion rule can't reach.
export function usePrefersReducedMotion() {
    const [reduce, setReduce] = useState(matches);

    useEffect(() => {
        const mql = window.matchMedia?.(QUERY);
        if (!mql) return;
        const handleChange = () => setReduce(mql.matches);
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);

    return reduce;
}
