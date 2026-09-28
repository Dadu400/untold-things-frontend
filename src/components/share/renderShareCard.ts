// Draws the 9:16 share image for a message with Canvas 2D (no DOM screenshot).
// The message bubble is the hero, sitting directly on the story background:
// light avatar + name, the typed prompt as context, the blue bubble with tail, "Delivered".

export const SHARE_CARD_WIDTH = 1080;
export const SHARE_CARD_HEIGHT = 1920;

type Palette = {
    background: string;
    roseGlow: string;
    periwinkleGlow: string;
    ink: string;
    muted: string;
    bubbleShadow: string;
};

// Same values as the CSS tokens in index.css
const LIGHT: Palette = {
    background: "hsl(24 33% 98%)",
    roseGlow: "rgba(217, 56, 53, 0.08)",
    periwinkleGlow: "rgba(164, 186, 252, 0.22)",
    ink: "hsl(15 12% 10%)",
    muted: "hsl(20 6% 45%)",
    bubbleShadow: "rgba(36, 139, 245, 0.28)",
};

const DARK: Palette = {
    background: "hsl(168 11% 10%)",
    roseGlow: "rgba(217, 56, 53, 0.12)",
    periwinkleGlow: "rgba(164, 186, 252, 0.08)",
    ink: "hsl(40 20% 94%)",
    muted: "hsl(168 5% 62%)",
    bubbleShadow: "rgba(0, 0, 0, 0.45)",
};

const BRAND_RED = "#D93835";
const BUBBLE_BLUE = "#248bf5";
const SYSTEM_SANS = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`;
const READING_FONT = `Font63, ${SYSTEM_SANS}`;
const PROMPT_FONT = `DejaVuSans, ${SYSTEM_SANS}`;
const PROMPT = "ყოველთვის მინდოდა მეთქვა, რომ";
const DOMAIN = "racvergitxari.ge";
// user.svg avatar, 24×24 viewBox
const AVATAR_PATH = "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z";

// Instagram/TikTok cover roughly the top and bottom 250px with UI; content stays between.
const SAFE_TOP = 250;
const SAFE_BOTTOM = 1560;
const ATTRIBUTION_Y = 1628;
const DELIVERED_SIZE = 38;
const MAX_FONT = 72;
const BUBBLE_RADIUS = 1.1; // × font size

// Spacing presets, from roomy to compact. Font size only drops below a preset's minimum
// once the next, tighter preset has been tried.
type Density = {
    minFont: number;
    marginX: number;
    avatarSize: number;
    nameSize: number;
    nameGap: number;
    headerGap: number;
    promptSize: number;
    promptGap: number;
    deliveredGap: number;
    bubblePadX: number; // × font size
    bubblePadY: number; // × font size
    lineHeight: number;
};

const DENSITIES: Density[] = [
    { minFont: 52, marginX: 80, avatarSize: 92, nameSize: 48, nameGap: 16, headerGap: 104, promptSize: 60, promptGap: 40, deliveredGap: 20, bubblePadX: 0.8, bubblePadY: 0.46, lineHeight: 1.4 },
    { minFont: 42, marginX: 64, avatarSize: 76, nameSize: 44, nameGap: 14, headerGap: 68, promptSize: 56, promptGap: 30, deliveredGap: 16, bubblePadX: 0.76, bubblePadY: 0.44, lineHeight: 1.4 },
    { minFont: 32, marginX: 52, avatarSize: 60, nameSize: 40, nameGap: 12, headerGap: 42, promptSize: 50, promptGap: 22, deliveredGap: 12, bubblePadX: 0.7, bubblePadY: 0.42, lineHeight: 1.36 },
];

// letterSpacing is missing from this TS version's DOM types; browsers without it just ignore it.
function setLetterSpacing(ctx: CanvasRenderingContext2D, value: string) {
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = value;
}

type Radius = number | { x: number; y: number };

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radii: [Radius, Radius, Radius, Radius]) {
    const [tl, tr, br, bl] = radii.map((r) => (typeof r === "number" ? { x: r, y: r } : r));
    ctx.beginPath();
    ctx.moveTo(x + tl.x, y);
    ctx.lineTo(x + w - tr.x, y);
    ctx.ellipse(x + w - tr.x, y + tr.y, tr.x, tr.y, 0, -Math.PI / 2, 0);
    ctx.lineTo(x + w, y + h - br.y);
    ctx.ellipse(x + w - br.x, y + h - br.y, br.x, br.y, 0, 0, Math.PI / 2);
    ctx.lineTo(x + bl.x, y + h);
    ctx.ellipse(x + bl.x, y + h - bl.y, bl.x, bl.y, 0, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + tl.y);
    ctx.ellipse(x + tl.x, y + tl.y, tl.x, tl.y, 0, Math.PI, Math.PI * 1.5);
    ctx.closePath();
}

// Greedy word wrap that keeps the author's line breaks; words wider than the line break by character.
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const lines: string[] = [];
    for (const paragraph of text.split("\n")) {
        const words = paragraph.split(/ +/).filter(Boolean);
        if (words.length === 0) {
            lines.push("");
            continue;
        }
        let line = "";
        for (const word of words) {
            const candidate = line ? `${line} ${word}` : word;
            if (ctx.measureText(candidate).width <= maxWidth) {
                line = candidate;
                continue;
            }
            if (line) lines.push(line);
            line = "";
            if (ctx.measureText(word).width <= maxWidth) {
                line = word;
                continue;
            }
            for (const char of Array.from(word)) {
                if (line && ctx.measureText(line + char).width > maxWidth) {
                    lines.push(line);
                    line = "";
                }
                line += char;
            }
        }
        if (line) lines.push(line);
    }
    return lines;
}

// Only used for the recipient name, never for the message.
function truncateToWidth(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
    if (ctx.measureText(text).width <= maxWidth) return text;
    const chars = Array.from(text);
    while (chars.length > 1 && ctx.measureText(chars.join("") + "…").width > maxWidth) chars.pop();
    return chars.join("") + "…";
}

type Layout = { d: Density; lines: string[]; fontSize: number };

// The CSS bubble is a pill whose 20px tail is as tall as its corner radius; keep that ratio
// so the tail meets the curve. Scale of the tail (defined in px at 1×) for a font size:
const tailScale = (size: number) => (size * BUBBLE_RADIUS) / 20;
// room on the right for the tail, which sticks out past the bubble
const bubbleMaxWidth = (d: Density, size: number) => SHARE_CARD_WIDTH - d.marginX * 2 - 10 * tailScale(size);
const headerHeight = (d: Density) => d.avatarSize + d.nameGap + d.nameSize * 1.25;

function contentHeight(d: Density, lineCount: number, size: number) {
    const bubbleH = lineCount * size * d.lineHeight + size * d.bubblePadY * 2;
    return headerHeight(d) + d.headerGap + d.promptSize * 1.2 + d.promptGap + bubbleH + d.deliveredGap + DELIVERED_SIZE * 1.2;
}

function tryLayout(ctx: CanvasRenderingContext2D, text: string, d: Density, size: number, available: number): Layout | null {
    ctx.font = `400 ${size}px ${READING_FONT}`;
    const lines = wrapText(ctx, text, bubbleMaxWidth(d, size) - size * d.bubblePadX * 2);
    return contentHeight(d, lines.length, size) <= available ? { d, lines, fontSize: size } : null;
}

// The full message is always kept. Order of compromises: tighter spacing presets with the
// font stepping down inside each, then collapsing long runs of blank lines, then a smaller font.
function layoutMessage(ctx: CanvasRenderingContext2D, message: string): Layout {
    const available = SAFE_BOTTOM - SAFE_TOP;
    const text = message.replace(/\r\n?/g, "\n").trim();

    for (const d of DENSITIES) {
        for (let size = MAX_FONT; size >= d.minFont; size -= 2) {
            const layout = tryLayout(ctx, text, d, size, available);
            if (layout) return layout;
        }
    }

    const compact = DENSITIES[DENSITIES.length - 1];
    const variants = [text.replace(/\n{3,}/g, "\n\n"), text.replace(/\n{2,}/g, "\n")];
    for (const variant of variants) {
        const layout = tryLayout(ctx, variant, compact, compact.minFont, available);
        if (layout) return layout;
    }

    // Extreme input only (e.g. dozens of one-character lines): keep shrinking, and allow
    // the block to use the full canvas height rather than drop any text.
    const tightest = variants[variants.length - 1];
    for (let size = compact.minFont - 1; size > 8; size--) {
        const layout = tryLayout(ctx, tightest, compact, size, SHARE_CARD_HEIGHT - 160);
        if (layout) return layout;
    }
    ctx.font = `400 8px ${READING_FONT}`;
    return { d: compact, lines: wrapText(ctx, tightest, bubbleMaxWidth(compact, 8) - 8 * compact.bubblePadX * 2), fontSize: 8 };
}

async function loadFonts(message: string, messageTo: string) {
    if (!document.fonts) return;
    await Promise.all([
        document.fonts.load(`400 48px ${READING_FONT}`, message + messageTo),
        document.fonts.load(`500 48px ${READING_FONT}`, messageTo),
        document.fonts.load(`48px ${PROMPT_FONT}`, PROMPT),
    ]).catch(() => undefined);
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
    const s = size / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy + s * 0.9);
    ctx.bezierCurveTo(cx - s * 1.3, cy + s * 0.05, cx - s * 0.95, cy - s * 1.05, cx, cy - s * 0.35);
    ctx.bezierCurveTo(cx + s * 0.95, cy - s * 1.05, cx + s * 1.3, cy + s * 0.05, cx, cy + s * 0.9);
    ctx.closePath();
    ctx.fill();
}

// Same geometry as .imessage-bubble::before minus ::after, cut out on its own canvas so the
// tail sits cleanly on the gradient background (no background-coloured notch).
function drawTail(ctx: CanvasRenderingContext2D, bubbleRight: number, bubbleBottom: number, t: number) {
    const w = Math.ceil(23 * t);
    const h = Math.ceil(20 * t);
    const tail = document.createElement("canvas");
    tail.width = w;
    tail.height = h;
    const tctx = tail.getContext("2d");
    if (!tctx) return;
    tctx.fillStyle = BUBBLE_BLUE;
    roundedRect(tctx, 0, 0, 20 * t, 20 * t, [0, 0, 0, { x: 16 * t, y: 14 * t }]);
    tctx.fill();
    tctx.globalCompositeOperation = "destination-out";
    roundedRect(tctx, 13 * t, 0, 10 * t, 20 * t, [0, 0, 0, 10 * t]);
    tctx.fill();
    ctx.drawImage(tail, bubbleRight - 13 * t, bubbleBottom - 20 * t);
}

export async function renderShareCard({ message, messageTo, dark }: { message: string; messageTo: string; dark: boolean }): Promise<Blob> {
    await loadFonts(message, messageTo);

    const p = dark ? DARK : LIGHT;
    const canvas = document.createElement("canvas");
    canvas.width = SHARE_CARD_WIDTH;
    canvas.height = SHARE_CARD_HEIGHT;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported");

    // Background: paper tone with soft brand glows
    ctx.fillStyle = p.background;
    ctx.fillRect(0, 0, SHARE_CARD_WIDTH, SHARE_CARD_HEIGHT);
    const glow = (x: number, y: number, r: number, color: string) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, SHARE_CARD_WIDTH, SHARE_CARD_HEIGHT);
    };
    glow(940, 180, 900, p.roseGlow);
    glow(120, 1780, 1000, p.periwinkleGlow);

    // Measure
    const { d, lines, fontSize } = layoutMessage(ctx, message);
    const lineH = fontSize * d.lineHeight;
    const padX = fontSize * d.bubblePadX;
    const padY = fontSize * d.bubblePadY;
    ctx.font = `400 ${fontSize}px ${READING_FONT}`;
    const textW = Math.max(...lines.map((l) => ctx.measureText(l).width), fontSize);
    const bubbleW = Math.min(textW + padX * 2, bubbleMaxWidth(d, fontSize));
    const bubbleH = lines.length * lineH + padY * 2;
    const blockH = contentHeight(d, lines.length, fontSize);
    const available = SAFE_BOTTOM - SAFE_TOP;
    const fitsSafeArea = blockH <= available;
    // sit slightly above the optical centre
    const top = fitsSafeArea ? SAFE_TOP + (available - blockH) * 0.44 : Math.max(60, (SHARE_CARD_HEIGHT - blockH) / 2 - 60);
    const centerX = SHARE_CARD_WIDTH / 2;
    const left = d.marginX;
    const bubbleRight = SHARE_CARD_WIDTH - d.marginX - 7 * tailScale(fontSize);

    ctx.textBaseline = "middle";

    // Recipient: quiet, no card header
    ctx.save();
    ctx.globalAlpha = dark ? 0.75 : 0.85;
    ctx.translate(centerX - d.avatarSize / 2, top);
    ctx.scale(d.avatarSize / 24, d.avatarSize / 24);
    ctx.fillStyle = "#999999";
    ctx.fill(new Path2D(AVATAR_PATH), "evenodd");
    ctx.restore();

    ctx.fillStyle = p.muted;
    ctx.font = `500 ${d.nameSize}px ${READING_FONT}`;
    ctx.textAlign = "center";
    ctx.fillText(truncateToWidth(ctx, messageTo, SHARE_CARD_WIDTH * 0.7), centerX, top + d.avatarSize + d.nameGap + d.nameSize * 0.62);

    // Prompt as secondary context, with the site's red typing cursor
    const promptTop = top + headerHeight(d) + d.headerGap;
    const promptY = promptTop + d.promptSize * 0.6;
    // Same face as TypedText (font-dejavu tracking-wider); shrinks only if it would overflow the line
    ctx.font = `${d.promptSize}px ${PROMPT_FONT}`;
    setLetterSpacing(ctx, `${d.promptSize * 0.05}px`);
    const promptMaxW = SHARE_CARD_WIDTH - left * 2 - d.promptSize * 0.4;
    const promptSize = Math.min(d.promptSize, Math.floor((d.promptSize * promptMaxW) / ctx.measureText(PROMPT).width));
    ctx.font = `${promptSize}px ${PROMPT_FONT}`;
    setLetterSpacing(ctx, `${promptSize * 0.05}px`);
    ctx.textAlign = "left";
    ctx.fillStyle = p.ink;
    ctx.globalAlpha = dark ? 0.78 : 0.72;
    ctx.fillText(PROMPT, left, promptY);
    ctx.globalAlpha = 1;
    const promptW = ctx.measureText(PROMPT).width;
    setLetterSpacing(ctx, "0px");
    ctx.fillStyle = BRAND_RED;
    ctx.fillRect(left + promptW + 10, promptY - promptSize * 0.55, Math.max(4, promptSize / 10), promptSize * 1.1);

    // Bubble (hero) with a soft lift and the iMessage tail
    const bubbleX = bubbleRight - bubbleW;
    const bubbleY = promptTop + d.promptSize * 1.2 + d.promptGap;
    const bubbleBottom = bubbleY + bubbleH;
    const bubbleRadius = Math.min(fontSize * BUBBLE_RADIUS, bubbleH / 2);
    const tail = bubbleRadius / 20;
    ctx.save();
    ctx.shadowColor = p.bubbleShadow;
    ctx.shadowBlur = 70;
    ctx.shadowOffsetY = 24;
    ctx.fillStyle = BUBBLE_BLUE;
    roundedRect(ctx, bubbleX, bubbleY, bubbleW, bubbleH, [bubbleRadius, bubbleRadius, bubbleRadius, bubbleRadius]);
    ctx.fill();
    ctx.restore();
    drawTail(ctx, bubbleRight, bubbleBottom, tail);

    ctx.fillStyle = "#ffffff";
    ctx.font = `400 ${fontSize}px ${READING_FONT}`;
    lines.forEach((line, i) => {
        ctx.fillText(line, bubbleX + padX, bubbleY + padY + i * lineH + lineH / 2);
    });

    ctx.fillStyle = p.muted;
    ctx.font = `500 ${DELIVERED_SIZE}px ${SYSTEM_SANS}`;
    ctx.textAlign = "right";
    ctx.fillText("Delivered", bubbleRight - 6, bubbleBottom + d.deliveredGap + DELIVERED_SIZE * 0.6);

    // Attribution: small red heart + domain, sized to survive story compression
    const attributionY = fitsSafeArea ? ATTRIBUTION_Y : Math.min(SHARE_CARD_HEIGHT - 40, top + blockH + 50);
    ctx.font = `500 46px ${READING_FONT}`;
    ctx.textAlign = "left";
    const domainW = ctx.measureText(DOMAIN).width;
    const heartSize = 36;
    const gap = 16;
    const startX = centerX - (heartSize + gap + domainW) / 2;
    ctx.fillStyle = BRAND_RED;
    drawHeart(ctx, startX + heartSize / 2, attributionY, heartSize);
    ctx.fillStyle = p.ink;
    ctx.globalAlpha = dark ? 0.78 : 0.72;
    ctx.fillText(DOMAIN, startX + heartSize + gap, attributionY);
    ctx.globalAlpha = 1;

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))), "image/png");
    });
}

