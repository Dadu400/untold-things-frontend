import {
    MAX_RECIPIENT_GRAPHEMES,
    countGraphemes,
    normalizeRecipient,
    normalizeSearchQuery,
    truncateGraphemes,
    validateRecipient,
} from "./recipient";

const check = (raw: string) => validateRecipient(normalizeRecipient(raw));

describe("recipient validation", () => {
    it.each(["დედა", "მამა", "ჩემს ყოფილს", "Nini", "José", "Zoë", "Ana-Maria", "O'Connor", "O’Connor", "მეგობარი 2", "Ñandú", "Müller", "ნინი Nini", "ანა-Maria"])(
        "accepts %s",
        (raw) => expect(check(raw)).toBeNull()
    );

    it.each(["დედა ❤️", "ნინი✨", "შენ :)", "❤️", "L🤞🏼", "a.b", "ana@", "#1", "ანა_მარია"])("rejects %s as unsupported", (raw) =>
        expect(check(raw)).toBe("unsupported")
    );

    it("rejects empty and whitespace-only values", () => {
        expect(check("")).toBe("empty");
        expect(check("   \t ")).toBe("empty");
    });

    it("requires at least one letter or digit", () => {
        expect(check("-")).toBe("noLetterOrDigit");
        expect(check("' ’ -")).toBe("noLetterOrDigit");
    });

    it("does not accept non-ASCII digits or non-Georgian/Latin letters", () => {
        expect(check("٣")).toBe("unsupported"); // Arabic-Indic digit
        expect(check("Анна")).toBe("unsupported"); // Cyrillic
    });

    it("allows exactly 24 graphemes and rejects 25", () => {
        expect(check("ა".repeat(24))).toBeNull();
        expect(check("ა".repeat(25))).toBe("tooLong");
        expect(check("é".repeat(24))).toBeNull();
        expect(check("é".repeat(24))).toBeNull(); // decomposed input composes under NFC
    });

    it("counts the limit after normalization", () => {
        expect(check(`  ${"ა".repeat(12)}    ${"ბ".repeat(11)}  `)).toBeNull(); // 24 once collapsed
    });
});

describe("normalizeRecipient", () => {
    it("trims and collapses whitespace", () => {
        expect(normalizeRecipient("  ჩემს   ყოფილს  ")).toBe("ჩემს ყოფილს");
        expect(normalizeRecipient("Ana \t Maria")).toBe("Ana Maria");
    });

    it("applies NFC", () => {
        expect(normalizeRecipient("José")).toBe("José");
        expect(normalizeRecipient("José")).toHaveLength(4);
    });

    it("keeps apostrophe style and case as typed", () => {
        expect(normalizeRecipient("O’Connor")).toBe("O’Connor");
        expect(normalizeRecipient("NINI")).toBe("NINI");
    });
});

describe("graphemes", () => {
    it("counts user-perceived characters, not code units", () => {
        expect(countGraphemes("🤞🏼")).toBe(1);
        expect(countGraphemes("👩‍❤️‍👨")).toBe(1);
        expect("👩‍❤️‍👨".length).toBeGreaterThan(1);
    });

    it("truncates without splitting a grapheme", () => {
        expect(truncateGraphemes("ab🤞🏼cd", 3)).toBe("ab🤞🏼");
        expect(truncateGraphemes("ა".repeat(30), MAX_RECIPIENT_GRAPHEMES)).toBe("ა".repeat(24));
        expect(truncateGraphemes("short", 24)).toBe("short");
    });
});

describe("normalizeSearchQuery", () => {
    it("normalizes whitespace, case and apostrophes", () => {
        expect(normalizeSearchQuery("  NINI  ")).toBe("nini");
        expect(normalizeSearchQuery("ჩემს   ყოფილს")).toBe("ჩემს ყოფილს");
        expect(normalizeSearchQuery("O’Connor")).toBe("o'connor");
        expect(normalizeSearchQuery("O'Connor")).toBe("o'connor");
        expect(normalizeSearchQuery("José")).toBe("josé");
    });

    it("never rejects emoji or symbols", () => {
        expect(normalizeSearchQuery("❤️")).toBe("❤️");
        expect(normalizeSearchQuery("✨🤞🏼გ")).toBe("გ");
        expect(normalizeSearchQuery("შენ :)")).toBe("შენ :)");
    });

    it("drops decorative symbols only at the edges", () => {
        expect(normalizeSearchQuery("დედა ❤️")).toBe("დედა");
        expect(normalizeSearchQuery("✨ნინი✨")).toBe("ნინი");
        expect(normalizeSearchQuery("დედა❤️მამა")).toBe("დედა❤️მამა");
    });

    it("keeps LIKE metacharacters for the backend to escape", () => {
        expect(normalizeSearchQuery("100%")).toBe("100%");
        expect(normalizeSearchQuery("a_b")).toBe("a_b");
        expect(normalizeSearchQuery("[a]")).toBe("[a]");
    });
});
