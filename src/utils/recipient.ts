// Rules for the "ვის:" recipient. Mirrored on the backend in RecipientRules.java —
// keep the two in sync.

export const MAX_RECIPIENT_GRAPHEMES = 24;

export type RecipientProblem = "empty" | "unsupported" | "noLetterOrDigit" | "tooLong";

// Same explicit whitespace set as the backend, so both sides collapse identically.
const WHITESPACE_RUN = /[\t\n\v\f\r \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g;

// A Georgian or Latin letter (accented Latin included), an ASCII digit, a space, - ' or ’.
const ALLOWED_CHAR = /^(?:(?=\p{L})[\p{Script=Georgian}\p{Script=Latin}]|[0-9 '\u2019-])$/u;
const LETTER_OR_DIGIT = /[\p{L}0-9]/u;

// Emoji and decorative symbols (plus their joiners / variation selectors) at the edges of a search query.
const EDGE_DECORATION = /^[\p{So}\p{Sk}\p{Me}\p{Cf}\uFE0E\uFE0F ]+|[\p{So}\p{Sk}\p{Me}\p{Cf}\uFE0E\uFE0F ]+$/gu;

type GraphemeSegmenter = { segment(input: string): Iterable<{ segment: string }> };
type SegmenterConstructor = new (locale?: string, options?: { granularity: "grapheme" }) => GraphemeSegmenter;

let segmenter: GraphemeSegmenter | null | undefined;

function getSegmenter(): GraphemeSegmenter | null {
    if (segmenter === undefined) {
        const Segmenter = (Intl as unknown as { Segmenter?: SegmenterConstructor }).Segmenter;
        segmenter = Segmenter ? new Segmenter(undefined, { granularity: "grapheme" }) : null;
    }
    return segmenter;
}

// Falls back to code points on browsers without Intl.Segmenter; every character a valid
// recipient may contain is a single code point, so the limit stays exact for valid input.
export function splitGraphemes(value: string): string[] {
    const s = getSegmenter();
    return s ? Array.from(s.segment(value), (part) => part.segment) : Array.from(value);
}

export function countGraphemes(value: string): number {
    return splitGraphemes(value).length;
}

export function truncateGraphemes(value: string, max: number): string {
    const graphemes = splitGraphemes(value);
    return graphemes.length <= max ? value : graphemes.slice(0, max).join("");
}

// NFC, whitespace runs -> one space, trimmed. This is what gets stored for new posts.
export function normalizeRecipient(value: string): string {
    return value.normalize("NFC").replace(WHITESPACE_RUN, " ").replace(/^ | $/g, "");
}

// Expects an already normalized value. Returns null when the recipient is valid.
export function validateRecipient(normalized: string): RecipientProblem | null {
    if (normalized === "") return "empty";
    for (const ch of normalized) {
        if (!ALLOWED_CHAR.test(ch)) return "unsupported";
    }
    if (!LETTER_OR_DIGIT.test(normalized)) return "noLetterOrDigit";
    if (countGraphemes(normalized) > MAX_RECIPIENT_GRAPHEMES) return "tooLong";
    return null;
}

// Lenient: never rejects. Lowercases, treats ’ as ', and drops emoji/symbols only at the
// edges so "დედა ❤️" still finds every "დედა …" without gluing words together. A query
// made only of symbols is kept as-is so old emoji-only recipients stay findable.
export function normalizeSearchQuery(value: string): string {
    const base = normalizeRecipient(value).toLowerCase().replace(/\u2019/g, "'");
    return base.replace(EDGE_DECORATION, "") || base;
}
