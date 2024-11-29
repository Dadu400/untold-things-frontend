import logo from '../../assets/icons/broken-heart.png';
import Navbar from "./Navbar";
import PostButton from "./PostButton";
import BurgerMenu from "./BurgerMenu";
function Header() {
    return (
        <header className="w-full px-8 py-6">
            <div className="w-[90%] md:w-[85%] lg:mx-auto flex items-center justify-between">
                <div className="flex items-center font-bold text-lg">
                    <a href={'/'} className="flex items-center gap-x-2">
                        <img src={logo} alt="logo" className="w-8 h-8" />
                        <span className="font-bpg tracking-widest font-regular">რაც ვერ გითხარი</span>
                    </a>
                </div>
                <Navbar />
                <PostButton location="header" />
                <BurgerMenu className="flex lg:hidden" />
            </div>
        </header>
    );
}

export default Header;