import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import NewPost from "./NewPost";

const HINT = "მხოლოდ ასოები, ციფრები, ტირე (-) და აპოსტროფი (')";

jest.mock("../posts/SubmitDialog", () => () => null);

function setup() {
    render(<NewPost />);
    const recipient = screen.getByPlaceholderText("სახელი") as HTMLInputElement;
    const message = screen.getByPlaceholderText("ყოველთვის მინდოდა მეთქვა, რომ...");
    const send = screen.getByRole("button", { name: "Send" });
    return { recipient, message, send };
}

describe("NewPost recipient field", () => {
    it("keeps unsupported characters visible, explains, and blocks sending", () => {
        const { recipient, message, send } = setup();
        fireEvent.change(message, { target: { value: "გამარჯობა ❤️ :)" } });
        fireEvent.change(recipient, { target: { value: "დედა ❤️" } });

        expect(recipient.value).toBe("დედა ❤️");
        expect(screen.getByText(HINT)).toBeTruthy();
        expect(recipient.getAttribute("aria-invalid")).toBe("true");
        expect(send).toBeDisabled();
    });

    it("clears the hint and enables sending once the recipient is valid", () => {
        const { recipient, message, send } = setup();
        fireEvent.change(message, { target: { value: "გამარჯობა ❤️ :)" } });
        fireEvent.change(recipient, { target: { value: "დედა ❤️" } });
        fireEvent.change(recipient, { target: { value: "O’Connor-ი 2" } });

        expect(screen.queryByText(HINT)).toBeNull();
        expect(send).not.toBeDisabled();
    });

    it("does not restrict the message text", () => {
        const { recipient, message, send } = setup();
        fireEvent.change(recipient, { target: { value: "Nini" } });
        fireEvent.change(message, { target: { value: "✨ :) ❤️ #@%" } });

        expect(screen.queryByText(HINT)).toBeNull();
        expect(send).not.toBeDisabled();
    });

    it("caps the recipient at 24 graphemes", () => {
        const { recipient } = setup();
        fireEvent.change(recipient, { target: { value: "ა".repeat(30) } });
        expect(recipient.value).toBe("ა".repeat(24));
    });

    it("stays disabled for whitespace-only recipients without showing the hint", () => {
        const { recipient, message, send } = setup();
        fireEvent.change(message, { target: { value: "hi" } });
        fireEvent.change(recipient, { target: { value: "   " } });

        expect(screen.queryByText(HINT)).toBeNull();
        expect(send).toBeDisabled();
    });
});
