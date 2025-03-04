import { NavLink } from "react-router-dom";

import { NavbarProps } from "../../types/types";

function Navbar({ resetHomeKey }: NavbarProps) {
    const ClassName = "text-lg tracking-wider transition-colors duration-200 px-4 py-2";

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
                            `${ClassName} ${isActive ? "text-white font-dejavu bg-black rounded-xl dark:text-gray-950 dark:bg-white" : "text-gray-950 dark:text-white font-dejavu"}`
                        }
                        onClick={handleHomeClick}
                    >
                        წერილები
                    </NavLink>
                </li>
                <li className={`${ClassName} text-gray-500 cursor-default dark:text-gray-300 font-dejavu`}>
                    ანონიმური SMS
                </li>
                <li className={`${ClassName} text-gray-500 cursor-default dark:text-gray-300 font-dejavu`}>
                    ჩვენზე
                </li>
                <li>
                    <NavLink
                        to="/terms"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-black rounded-xl dark:text-gray-950 dark:bg-white font-dejavu" : "text-gray-950 dark:text-white font-dejavu"}`
                        }
                    >
                        წესები
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink
                        to="/valentinesday"
                        className={({ isActive }) =>
                            `${ClassName} ${isActive ? "text-white bg-red-400 rounded-xl dark:text-gray-950 dark:bg-white font-dancing text-xl" : "text-gray-950 dark:text-white font-dancing text-xl pb-3"}`
                        }
                    >
                        Valentine's Day Special
                    </NavLink>
                </li> */}
            </ul>
        </nav>
    );
}

export default Navbar;