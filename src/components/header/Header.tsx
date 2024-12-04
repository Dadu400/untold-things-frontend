import logo from '../../assets/icons/new.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
import fontLogo from "../../assets/icons/ss.png";
function Header() {
    return (
        <header className="w-full px-8 py-6">
            <div className="w-[90%] md:w-[85%] lg:mx-auto flex items-center justify-between">
                {/*<div className="flex items-baseline">*/}
                {/*    <a href={'/'} className="flex">*/}
                        <img src={logo} alt="logo"/>
                {/*        <img src={fontLogo} alt="logo" />*/}
                {/*        <span className="font-bpg tracking-widest font-regular text-bgColor">რაც ვერ გითხარი</span>*/}
                {/*    </a>*/}
                {/*</div>*/}
                <Navbar/>
                <PostButton location="header" />
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;