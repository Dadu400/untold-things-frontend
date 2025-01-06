import { NavLink } from "react-router-dom";

interface NavbarProps {
    resetHomeKey?: () => void;
}

function Navbar({ resetHomeKey }: NavbarProps) {
    const ClassName = "text-lg font-dejavu tracking-wider transition-colors duration-200 px-4 py-2";

    const handleHomeClick = () => {
        if (resetHomeKey) resetHomeKey();
    };

    return (
        <nav>
            <ul className="hidden lg:flex items-center gap-6">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-black rounded-xl dark:text-gray-950 dark:bg-white" : "text-gray-950 dark:text-white"}`
                        }
                        onClick={handleHomeClick}
                    >
                        წერილები
                    </NavLink>
                </li>
                <li className={`${ClassName} text-gray-500 cursor-default dark:text-gray-300`}>
                    ანონიმური SMS
                </li>
                <li className={`${ClassName} text-gray-500 cursor-default dark:text-gray-300`}>
                    ჩვენზე
                </li>
                <li>
                    <NavLink
                        to="/terms"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-black rounded-xl dark:text-gray-950 dark:bg-white" : "text-gray-950 dark:text-white"}`
                        }
                    >
                        წესები
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
