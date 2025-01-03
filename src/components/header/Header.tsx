import logo from '../../assets/icons/logo.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
import {NavLink} from "react-router-dom";

function Header( { resetHomeKey } : { resetHomeKey?: () => void } ) {

    const handleLogoClick = () => {
        if (resetHomeKey) resetHomeKey(); // Reset key to remount the Home component
    };

    return (
        <header className="w-full px-8 py-2 bg-bgColor z-10 flex items-center justify-between">
            <div className="w-full lg:w-[90%] lg:mx-auto flex items-center justify-between">
                <NavLink
                    to="/"
                    onClick={handleLogoClick}
                >
                    <img src={logo} alt="logo" className="w-[70px] h-[70px]" />
                </NavLink>
                <Navbar resetHomeKey={resetHomeKey} />
                <PostButton className="hidden lg:flex" />
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;