import logo from '../../assets/icons/logo.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header className="w-full px-8 py-2 bg-bgColor z-10 flex items-center justify-between">
            <div className="w-full lg:w-[90%] lg:mx-auto flex items-center justify-between">
                <NavLink
                    to="/">
                    <img src={logo} alt="logo" className="w-[70px] h-[70px]"/>
                </NavLink>
                <Navbar/>
                <PostButton className="hidden lg:flex" />
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;