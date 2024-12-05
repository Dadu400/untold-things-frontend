import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav>
            <ul className="hidden lg:flex items-center gap-10">
                <li className="uppercase text-base font-firago tracking-wider">
                    <Link to="/">პოსტები</Link>
                </li>
                <li className="uppercase text-base font-firago tracking-wider">
                    <Link to="/">ანონიმური SMS</Link>
                </li>
                <li className="uppercase text-base font-firago tracking-wider">
                    <Link to="/aboutus">ჩვენზე</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;