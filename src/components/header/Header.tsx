import logo from '../../assets/icons/new.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header className="w-full px-8 py-6 bg-bgColor z-10">
            <div className="w-[90%] md:w-[85%] lg:mx-auto flex items-center justify-between">
                <NavLink
                    to="/">
                    <img src={logo} alt="logo"/>
                </NavLink>
                <Navbar/>
                <PostButton className="hidden lg:flex" />
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;