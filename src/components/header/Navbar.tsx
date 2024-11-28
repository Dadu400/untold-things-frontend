function Navbar() {
    return (
        <nav>
            <ul className="hidden lg:flex items-center gap-10">
                <li className="uppercase font-medium text-base font-bpg tracking-wider"><a href="/">პოსტები</a></li>
                <li className="uppercase font-medium text-base font-bpg tracking-wider"><a href="/">ანონიმური SMS</a></li>
                <li className="uppercase font-medium text-base font-bpg tracking-wider"><a href="/about">ჩვენზე</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;