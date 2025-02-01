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
        <header className="w-full px-8 py-2 z-10 flex items-center justify-between bg-bgColor dark:bg-bgDark">
            <div className="w-full lg:w-[90%] lg:mx-auto flex items-center justify-between">
                <NavLink
                    to="/"
                    onClick={handleLogoClick}
                >
                    <img src={logo} alt="logo" className="w-[70px] h-[70px]" />
                </NavLink>
                <Navbar resetHomeKey={resetHomeKey} />
                <div className='flex items-center gap-4'>
                    <ThemeSwitcher className="hidden lg:flex" />
                    <PostButton className="hidden lg:flex" />
                </div>
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;