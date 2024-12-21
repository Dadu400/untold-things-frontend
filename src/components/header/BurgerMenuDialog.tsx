import CloseIcon from '@mui/icons-material/Close';
import PostButton from "./PostButton";
import {NavLink} from "react-router-dom";

export interface BurgerMenuDialogProps {
    setMenuOpen: (isOpen: boolean) => void;
}
function BurgerMenuDialog({ setMenuOpen }: BurgerMenuDialogProps) {
    return (
        <div className="navbar fixed top-0 right-0 h-screen w-48 p-6 bg-bgColor shadow-lg cursor-normal z-10">
            <div className="flex justify-end mb-5">
                <CloseIcon onClick={() => setMenuOpen(false)} />
            </div>
            <div className="flex flex-col justify-start mt-14">
                <ul className={"space-y-4"}>
                    <li>
                        <NavLink
                            to="/"
                            className= "text-lg font-dejavu tracking-wider">
                            პოსტები
                        </NavLink>
                    </li>
                    <li className="text-lg font-dejavu tracking-wider">
                        ანონიმური SMS
                    </li>
                    <li className="text-lg font-dejavu tracking-wider">
                        ჩვენზე
                    </li>
                    <li>
                        <NavLink
                            to="/terms"
                            className= "text-lg font-dejavu tracking-wider">
                            წესები
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex justify-start gap-[15px] mt-5">
                <div className="flex gap-[10px] justify-center items-center">
                    <PostButton className="flex lg:hidden"/>
                </div>
            </div>
        </div>
)
    ;
}

export default BurgerMenuDialog;
