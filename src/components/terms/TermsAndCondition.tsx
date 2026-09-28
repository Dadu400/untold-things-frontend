import { ReactNode } from "react";

// Small status marker, vertically centered on the first line of its text.
function Marker({ type }: { type: "restricted" | "allowed" }) {
    const isRestricted = type === "restricted";
    return (
        <span className="flex h-[1.85em] shrink-0 items-center" aria-hidden="true">
            <svg
                viewBox="0 0 16 16"
                className={`h-4 w-4 ${isRestricted ? "text-brand dark:text-[#f07a77]" : "text-emerald-600 dark:text-emerald-400"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="8" cy="8" r="6.75" />
                {isRestricted ? <path d="M5.25 8h5.5" /> : <path d="M5.25 8.25l1.9 1.9 3.6-3.9" />}
            </svg>
        </span>
    );
}

function Item({ type, children }: { type: "restricted" | "allowed"; children: ReactNode }) {
    return (
        <li className="flex gap-3">
            <Marker type={type} />
            <span className="min-w-0">{children}</span>
        </li>
    );
}

function TermsAndCondition() {
    return (
        <section className="w-full max-w-[800px] flex flex-col mx-auto px-5 md:px-8 mt-10 md:mt-16 mb-16">
            <h1 className="font-heading font-normal text-[26px] md:text-[32px] leading-[1.25] text-ink mb-8 md:mb-10">წესები და პირობები</h1>
            <div className="font-read text-[16px] md:text-[17px] leading-[1.85] text-ink">
                <ul className="flex flex-col space-y-5">
                    <Item type="restricted">პლატფორმაზე აკრძალულია სხვა პირის პირადი ან იდენტიფიცირებადი ინფორმაციის გამოქვეყნება, როგორიცაა:
                    <span className="font-semibold"> მისამართი, ტელეფონის ნომერი, ინფორმაცია პირის ოჯახის, სამუშაო ადგილის ან სხვა იდენტიფიცირებადი დეტალების შესახებ.</span>
                    </Item>
                    <Item type="restricted">
                        არ დაიშვება ნებისმიერი უკანონო, ცილისწამების, მუქარის, შევიწროების შემცველი, შეურაცხმყოფელი ან დამამცირებელი ტექსტები, რომელიც შეიძლება ჩაითვალოს დისკრიმინაციულად ეთნიკური წარმომავლობის, ეროვნების,
                        რასის, ფერის, რელიგიის, შშმ პირის, სექსუალური ორიენტაციის, გენდერული იდენტობის, ან ფიზიკური გარეგნობის მიმართ.
                    </Item>
                </ul>
                <p className="mt-6 font-semibold">
                    "რაც ვერ გითხარის" გუნდი უფლებას იტოვებს არ გამოაქვეყნოს ისეთი პოსტი, რომლის შინაარსიც არ შეესაბამება აღნიშნულ წესებს.
                </p>

                <h2 className="font-heading font-normal text-[21px] md:text-[23px] leading-[1.35] text-ink mt-12 md:mt-14 mb-5">პერსონალური მონაცემების დამუშავება</h2>
                <ul className="flex flex-col space-y-4">
                    <Item type="allowed">
                        მომხმარებლის მიერ მიწოდებული ინფორმაცია შეინახება კონფიდენციალურობის პრინციპების დაცვით.
                    </Item>
                    <Item type="allowed">
                        პერსონალური მონაცემები დამუშავდება მხოლოდ "რაც ვერ გითხარი" პროექტის მიზნებისათვის.
                    </Item>
                </ul>
            </div>
        </section>
    )
}

export default TermsAndCondition;
