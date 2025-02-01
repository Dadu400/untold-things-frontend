import { useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';

import PostButton from "./PostButton";
import ThemeSwitcher from './ThemeSwitcher';

import { BurgerMenuDialogProps } from "../../types/types";

function BurgerMenuDialog({ setMenuOpen }: BurgerMenuDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const handleMenuClick = () => {
        setMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={dialogRef}
            className="navbar fixed top-0 right-0 h-screen w-48 p-6 bg-bgColor shadow-lg cursor-normal z-10">
            <div className="flex justify-end mb-5">
                <CloseIcon onClick={handleMenuClick} />
            </div>
            <div className="flex flex-col justify-start mt-14">
                <ul className={"space-y-4"}>
                    <li>
                        <NavLink
                            to="/"
                            className="text-lg font-dejavu tracking-wider text-gray-950 dark:text-white"
                            onClick={handleMenuClick}>
                            წერილები
                        </NavLink>
                    </li>
                    <li className="text-lg font-dejavu tracking-wider text-gray-500 cursor-default dark:text-gray-300">
                        ანონიმური SMS
                    </li>
                    <li className="text-lg font-dejavu tracking-wider text-gray-500 cursor-default dark:text-gray-300">
                        ჩვენზე
                    </li>
                    <li>
                        <NavLink
                            to="/terms"
                            className="text-lg font-dejavu tracking-wider text-gray-950 dark:text-white"
                            onClick={handleMenuClick} >
                            წესები
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex justify-start gap-[15px] mt-5">
                <div className="flex gap-[10px] items-center">
                    <PostButton className="flex lg:hidden" onClick={handleMenuClick} />
                    <ThemeSwitcher className="flex lg:hidden" />
                </div>
            </div>
        </div>
    );
}

export default BurgerMenuDialog;