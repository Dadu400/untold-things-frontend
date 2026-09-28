import { Children, ReactNode, isValidElement, useLayoutEffect, useRef } from "react";

// Grid masonry: 1px implicit rows, each item spans as many rows as its measured height.
// Keeps the feed's auto-fill column template (so column counts stay responsive).
// Sparse auto-placement never moves backwards, so items are placed strictly in source
// order: each one takes the first free column at or below the previous item's top.
// Layout is a pure function of item heights and column count, so it's deterministic.
function MasonryItem({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        const content = el?.firstElementChild as HTMLElement | null;
        if (!el || !content) return;

        let lastSpan = 0;
        const update = () => {
            // bottom padding stands in for the row gap, since grid row-gap is zeroed
            const paddingBottom = parseFloat(getComputedStyle(el).paddingBottom) || 0;
            const span = Math.ceil(content.getBoundingClientRect().height + paddingBottom);
            if (span === lastSpan) return;
            lastSpan = span;
            el.style.gridRowEnd = `span ${span}`;
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(content);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="w-full pb-8 md:pb-10">
            <div>{children}</div>
        </div>
    );
}

function MasonryGrid({ children, className }: { children: ReactNode; className?: string }) {
    return (
        // negative bottom margin cancels the last row's gap padding
        <div className={`grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_290px),_1fr))] auto-rows-[1px] gap-x-8 -mb-8 md:-mb-10 ${className ?? ""}`}>
            {Children.toArray(children).map((child, i) => (
                <MasonryItem key={isValidElement(child) && child.key !== null ? child.key : i}>{child}</MasonryItem>
            ))}
        </div>
    );
}

export default MasonryGrid;
