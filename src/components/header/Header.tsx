import { NavLink } from "react-router-dom";

import logo from '../../assets/icons/logo.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
import ThemeSwitcher from './ThemeSwitcher';
import { useScrollSearch } from "../../hooks/useScrollSearch";

function Header({ resetHomeKey }: { resetHomeKey?: () => void }) {
    const { isScrolled } = useScrollSearch();

    const handleLogoClick = () => {
        if (resetHomeKey) resetHomeKey();
    };

    return (
        <header className={`w-full px-4 lg:px-8 py-2 z-10 flex items-center justify-between bg-bgColor/90 dark:bg-bgDark/90 backdrop-blur-md sticky top-0 lg:relative lg:bg-bgColor lg:dark:bg-bgDark lg:backdrop-blur-none border-b transition-colors duration-300 ${isScrolled ? "border-line/70 lg:border-transparent" : "border-transparent"}`}>
            <div className="w-full lg:w-[90%] lg:mx-auto flex items-center justify-between">
                <NavLink
                    to="/"
                    onClick={handleLogoClick}
                    className="shrink-0 rounded-xl transition-transform duration-200 active:scale-95"
                >
                    <img src={logo} alt="logo" className="w-14 h-[54px] lg:w-16 lg:h-16" />
                </NavLink>
                <Navbar resetHomeKey={resetHomeKey} />
                <div className='hidden lg:flex items-center lg:gap-3'>
                    <ThemeSwitcher className="hidden lg:flex" />
                    <PostButton className="hidden lg:flex" />
                </div>
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;
