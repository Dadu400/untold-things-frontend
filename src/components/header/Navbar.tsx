import { NavLink } from "react-router-dom";

import { NavbarProps } from "../../types/types";

function Navbar({ resetHomeKey }: NavbarProps) {
    const ClassName = "inline-flex items-center h-10 text-lg tracking-wider transition-colors duration-200 px-4 rounded-full";

    const handleHomeClick = () => {
        if (resetHomeKey) resetHomeKey();
    };

    return (
        <nav>
            <ul className="hidden lg:flex items-center gap-2">
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${ClassName} font-dejavu ${isActive ? "text-white bg-black dark:text-gray-950 dark:bg-white" : "text-gray-950 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"}`
                        }
                        onClick={handleHomeClick}
                    >
                        წერილები
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/terms"
                        className={({ isActive }) =>
                            `${ClassName} font-dejavu ${isActive ? "text-white bg-black dark:text-gray-950 dark:bg-white" : "text-gray-950 dark:text-white hover:bg-black/5 dark:hover:bg-white/10"}`
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