import { gsap } from "gsap";

// A few glyphs quietly lift off the written message and drift toward the send arrow.
// The textarea itself is never touched: we float copies over the real characters.

type Glyph = { text: string; index: number; rect: DOMRect };

type Options = {
    // Fired while the glyphs are still drifting, so the next step feels immediate.
    onRelease: () => void;
    onDone: () => void;
};

const OPEN_AT = 0.4;
const DRIFT = 0.44;
const SPREAD = 0.16;
// Timer backstop in case animation frames stall (background tab, heavy jank).
const SAFETY_MS = 1000;

const LETTER = /\p{L}/u;
const EMOJI = /\p{Extended_Pictographic}/u;

const MIRRORED_STYLES = [
    "boxSizing", "width", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
    "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle",
    "fontFamily", "fontSize", "fontWeight", "fontStyle", "fontVariant", "fontFeatureSettings",
    "letterSpacing", "lineHeight", "textTransform", "textIndent", "wordSpacing", "tabSize",
    "wordBreak", "direction",
] as const;

// Grapheme clusters keep Georgian letters with marks, emoji and ZWJ sequences whole.
function segment(text: string): { text: string; index: number }[] {
    const Segmenter = (Intl as any).Segmenter;
    if (Segmenter) {
        const segments = new Segmenter(undefined, { granularity: "grapheme" }).segment(text);
        return Array.from(segments as Iterable<{ segment: string; index: number }>, (s) => ({ text: s.segment, index: s.index }));
    }
    let index = 0;
    return Array.from(text, (ch) => {
        const part = { text: ch, index };
        index += ch.length;
        return part;
    });
}

// Standard textarea mirror: same box and typography, each grapheme wrapped so it can be measured.
function measureVisibleGlyphs(textarea: HTMLTextAreaElement): Glyph[] {
    const style = getComputedStyle(textarea);
    const mirror = document.createElement("div");
    MIRRORED_STYLES.forEach((prop) => {
        mirror.style[prop] = style[prop];
    });
    Object.assign(mirror.style, {
        position: "absolute",
        top: "0",
        left: "-9999px",
        visibility: "hidden",
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        height: "auto",
        overflow: "hidden",
    });

    const spans: { span: HTMLSpanElement; text: string; index: number }[] = [];
    segment(textarea.value).forEach(({ text, index }) => {
        if (!text.trim()) {
            mirror.appendChild(document.createTextNode(text));
            return;
        }
        const span = document.createElement("span");
        span.textContent = text;
        mirror.appendChild(span);
        spans.push({ span, text, index });
    });

    document.body.appendChild(mirror);
    const box = textarea.getBoundingClientRect();
    const origin = mirror.getBoundingClientRect();
    const glyphs = spans.map(({ span, text, index }) => {
        const r = span.getBoundingClientRect();
        const rect = new DOMRect(
            box.left + (r.left - origin.left) - textarea.scrollLeft,
            box.top + (r.top - origin.top) - textarea.scrollTop,
            r.width,
            r.height,
        );
        return { text, index, rect };
    });
    mirror.remove();

    // Only what the writer can actually see right now.
    return glyphs.filter(({ rect }) =>
        rect.width > 0 &&
        rect.top >= box.top - 1 &&
        rect.bottom <= box.bottom + 1 &&
        rect.left >= box.left - 1 &&
        rect.right <= box.right + 1,
    );
}

function glyphCount(total: number) {
    if (total >= 150) return 6;
    if (total >= 60) return 5;
    if (total >= 20) return 4;
    return 3;
}

// Letters first; punctuation/digits next; emoji only if nothing else is there.
function pick(glyphs: Glyph[], textLength: number): Glyph[] {
    const letters = glyphs.filter((g) => LETTER.test(g.text));
    const emoji = glyphs.filter((g) => EMOJI.test(g.text) && !LETTER.test(g.text));
    const other = glyphs.filter((g) => !letters.includes(g) && !emoji.includes(g));

    const count = Math.min(glyphCount(textLength), glyphs.length);
    const pool = letters.length >= count
        ? letters
        : [...letters, ...other, ...emoji].slice(0, count).sort((a, b) => a.index - b.index);

    // One glyph from each stretch of the text, so they come from across the message.
    const bucket = pool.length / count;
    return Array.from({ length: count }, (_, i) => {
        const from = Math.floor(i * bucket);
        const to = Math.max(from + 1, Math.floor((i + 1) * bucket));
        return pool[gsap.utils.random(from, to - 1, 1)];
    });
}

// Returns a cancel function, or null when there was nothing to animate (onRelease already ran).
export function releaseGlyphs(
    textarea: HTMLTextAreaElement,
    target: HTMLElement,
    { onRelease, onDone }: Options,
): (() => void) | null {
    const chosen = pick(measureVisibleGlyphs(textarea), textarea.value.length);
    if (!chosen.length) {
        onRelease();
        return null;
    }

    const style = getComputedStyle(textarea);
    const aim = target.getBoundingClientRect();
    const aimX = aim.left + aim.width / 2;
    const aimY = aim.top + aim.height / 2;

    // Above the dialog backdrop (z-50) so the last glyphs finish fading over it.
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    Object.assign(layer.style, { position: "fixed", inset: "0", zIndex: "60", pointerEvents: "none" });

    const nodes = chosen.map(({ text, rect }) => {
        const node = document.createElement("span");
        node.textContent = text;
        Object.assign(node.style, {
            position: "absolute",
            left: `${rect.left}px`,
            top: `${rect.top}px`,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            letterSpacing: style.letterSpacing,
            lineHeight: `${rect.height}px`,
            color: style.color,
            whiteSpace: "pre",
            willChange: "transform, opacity",
        });
        layer.appendChild(node);
        return node;
    });
    document.body.appendChild(layer);

    let released = false;
    const release = () => {
        if (released) return;
        released = true;
        onRelease();
    };

    const cleanup = () => {
        window.clearTimeout(safety);
        window.clearTimeout(releaseBackstop);
        timeline.kill();
        layer.remove();
    };

    const finish = () => {
        cleanup();
        onDone();
    };

    // Shuffled start offsets: they leave one by one, not in reading order.
    const offsets = gsap.utils.shuffle(chosen.map((_, i) => (chosen.length > 1 ? (i / (chosen.length - 1)) * SPREAD : 0)));

    const timeline = gsap.timeline({ onComplete: finish });

    chosen.forEach(({ rect }, i) => {
        const node = nodes[i];
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const at = offsets[i] + gsap.utils.random(0, 0.02);
        const duration = DRIFT + gsap.utils.random(-0.03, 0.03);

        timeline
            .to(node, {
                x: (aimX - startX) * gsap.utils.random(0.3, 0.55),
                rotation: gsap.utils.random(-5, 5),
                duration,
                ease: "power1.out",
            }, at)
            .to(node, {
                y: Math.min(aimY - startY, 0) * 0.35 - gsap.utils.random(22, 40),
                duration,
                ease: "sine.inOut",
            }, at)
            .to(node, {
                opacity: 0,
                duration: duration * 0.6,
                ease: "sine.in",
            }, at + duration * 0.4);
    });

    timeline.call(release, undefined, OPEN_AT);

    // The confirmation must never wait on animation frames.
    const releaseBackstop = window.setTimeout(release, OPEN_AT * 1000 + 100);
    const safety = window.setTimeout(() => {
        release();
        finish();
    }, SAFETY_MS);

    return cleanup;
}
