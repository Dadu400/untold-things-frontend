import { NavLink } from "react-router-dom";

import logo from '../../assets/icons/logo.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
import ThemeSwitcher from './ThemeSwitcher';

function Header({ resetHomeKey }: { resetHomeKey?: () => void }) {

    const handleLogoClick = () => {
        if (resetHomeKey) resetHomeKey();
    };

    return (
        <header className="w-full px-4 lg:px-8 py-2 z-10 flex items-center justify-between bg-bgColor dark:bg-bgDark sticky top-0 lg:relative">
            <div className="w-full lg:w-[90%] lg:mx-auto flex items-center justify-between">
                <NavLink
                    to="/"
                    onClick={handleLogoClick}
                >
                    <img src={logo} alt="logo" className="w-14 h-[54px] lg:w-16 lg:h-16" />
                </NavLink>
                <Navbar resetHomeKey={resetHomeKey} />
                <div className='flex items-center lg:gap-4'>
                    <ThemeSwitcher className="hidden lg:flex" />
                    <PostButton className="hidden lg:flex" />
                </div>
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;