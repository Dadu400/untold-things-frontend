import { NavLink } from "react-router-dom";

function Navbar() {
    const ClassName = "uppercase text-lg font-dejavu tracking-wider transition-colors duration-200 px-4 py-2";

    return (
        <nav>
            <ul className="hidden lg:flex items-center gap-10">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-black rounded-xl" : "text-gray-700"}`
                        }
                    >
                        პოსტები
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/ssms"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-black rounded-xl" : "text-gray-700"}`
                        }
                    >
                        ანონიმური SMS
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/aboutus"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-black rounded-xl" : "text-gray-700"}`
                        }
                    >
                        ჩვენზე
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
