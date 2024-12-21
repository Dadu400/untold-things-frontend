function TermsAndCondition() {
    return (
        <section className="w-[90%] md:w-[80%] flex flex-col mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-firago tracking-wider">წესები და პირობები</h1>
            </div>
            <div className="flex flex-col space-y-6 font-roboto">
                <span className="font-roboto text-[16px]">⛔ პლატფორმაზე აკრძალულია სხვა პირის პირადი ან იდენტიფიცირებადი ინფორმაციის გამოქვეყნება, როგორიცაა:
                <span className="font-semibold"> მისამართი, ტელეფონის ნომერი, ინფორმაცია პირის ოჯახის, სამუშაო ადგილის ან სხვა იდენტიფიცირებადი დეტალების შესახებ.</span>
                    </span>
                <span className="font-roboto text-[16px]">
                     ⛔ არ დაიშვება ნებისმიერი უკანონო, ცილისწამების, მუქარის, შევიწროების შემცველი, შეურაცხმყოფელი ან დამამცირებელი ტექსტები, რომელიც შეიძლება ჩაითვალოს დისკრიმინაციულად ეთნიკური წარმომავლობის, ეროვნების,
                        რასის, ფერის, რელიგიის, შშმ პირის, სექსუალური ორიენტაციის, გენდერული იდენტობის, ან ფიზიკური გარეგნობის მიმართ.
                </span>
                <span className="font-roboto text-[16px] font-semibold">
                    "რაც ვერ გითხარის" გუნდი უფლებას იტოვებს არ გამოაქვეყნოს ისეთი პოსტი, რომლის შინაარსიც არ შეესაბამება აღნიშნულ წესებს.
                </span>
                <div className="mb-10">
                    <h2 className="text-2xl font-dejavu tracking-wider">პერსონალური მონაცემების დამუშავება</h2>
                </div>
                <span className="font-roboto text-[16px]">
                    ✅ მომხმარებლის მიერ მიწოდებული ინფორმაცია შეინახება კონფიდენციალურობის პრინციპების დაცვით.
                </span>
                <span className="font-roboto text-[16px]">
                    ✅ პერსონალური მონაცემები დამუშავდება მხოლოდ "რაც ვერ გითხარი" პროექტის მიზნებისათვის.
                </span>
            </div>
        </section>
    )
}

export default TermsAndCondition;