import { useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import PostButton from "./PostButton";
import ThemeSwitcher from './ThemeSwitcher';
import { usePWAInstallContext } from '../../hooks/PWAInstallContext';
interface BurgerMenuDialogProps {
  setMenuOpen: (open: boolean) => void;
}

function BurgerMenuDialog({ setMenuOpen }: BurgerMenuDialogProps) {
  const { triggerInstall, isInstalled, deferredPrompt } = usePWAInstallContext();
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  }, [setMenuOpen]);

  useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    return () => {
            document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={dialogRef}
      className="navbar fixed top-0 right-0 h-screen w-48 p-6 bg-bgColor shadow-lg cursor-normal z-10"
    >
      <div className="flex justify-end mb-5">
        <CloseIcon onClick={handleMenuClick} />
      </div>
      <div className="flex flex-col justify-start mt-14">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className="text-lg font-dejavu tracking-wider text-gray-950 dark:text-white"
              onClick={handleMenuClick}
            >
              წერილები
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/terms"
              className="text-lg font-dejavu tracking-wider text-gray-950 dark:text-white"
              onClick={handleMenuClick}
            >
              წესები
            </NavLink>
          </li>
          {!isInstalled && (
            <li>
              <button
                onClick={triggerInstall}
                disabled={!deferredPrompt}
                className={`text-lg font-dejavu tracking-wider ${
                  deferredPrompt
                    ? 'text-gray-950 dark:text-white hover:text-gray-700 dark:hover:text-gray-300'
                    : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
                title={deferredPrompt ? '' : 'Install not available yet'}
              >
                Install App
              </button>
            </li>
          )}
        </ul>
            </div>
            <div className="flex flex-col justify-start gap-[15px] mt-5">
                <div className="flex gap-[10px] items-center">
                    <PostButton className="flex lg:hidden" onClick={handleMenuClick} />
                    <ThemeSwitcher className="flex lg:hidden" />
                </div>
            </div>
            <div className='flex flex-col absolute mt-10 space-y-2'>
                <p className="font-dejavu tracking-wider text-gray-950 dark:text-white text-xl">გამოგვყევით:</p>
                <div className='flex items-center gap-1'>
                    <a href="https://www.tiktok.com/@racvergitxari.ge" target="_blank" rel="noreferrer">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            fontSize="24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M412.19 118.66a109.27 109.27 0 01-9.45-5.5 132.87 132.87 0 01-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14 23.9 350 16 350.13 16h-82.44v318.78c0 4.28 0 8.51-.18 12.69 0 .52-.05 1-.08 1.56 0 .23 0 .47-.05.71v.18a70 70 0 01-35.22 55.56 68.8 68.8 0 01-34.11 9c-38.41 0-69.54-31.32-69.54-70s31.13-70 69.54-70a68.9 68.9 0 0121.41 3.39l.1-83.94a153.14 153.14 0 00-118 34.52 161.79 161.79 0 00-35.3 43.53c-3.48 6-16.61 30.11-18.2 69.24-1 22.21 5.67 45.22 8.85 54.73v.2c2 5.6 9.75 24.71 22.38 40.82A167.53 167.53 0 00115 470.66v-.2l.2.2c39.91 27.12 84.16 25.34 84.16 25.34 7.66-.31 33.32 0 62.46-13.81 32.32-15.31 50.72-38.12 50.72-38.12a158.46 158.46 0 0027.64-45.93c7.46-19.61 9.95-43.13 9.95-52.53V176.49c1 .6 14.32 9.41 14.32 9.41s19.19 12.3 49.13 20.31c21.48 5.7 50.42 6.9 50.42 6.9v-81.84c-10.14 1.1-30.73-2.1-51.81-12.61z"></path>
                        </svg>
                    </a>
                    <a href="https://www.instagram.com/racvergitxari" target="_blank" rel="noreferrer">
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            fontSize="24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"></path>
                            <path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"></path>
                        </svg>
                    </a>
                    <a href="mailto:info@racvergitxari.ge" target="_blank" rel="noreferrer" className="ml-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            fontSize="26"
                            height="1em"
                            width="1em"
                            viewBox="0 0 50 50"
                        >
                            <path d="M12 23.403V23.39 10.389L11.88 10.3h-.01L9.14 8.28C7.47 7.04 5.09 7.1 3.61 8.56 2.62 9.54 2 10.9 2 12.41v3.602L12 23.403zM38 23.39v.013l10-7.391V12.41c0-1.49-.6-2.85-1.58-3.83-1.46-1.457-3.765-1.628-5.424-.403L38.12 10.3 38 10.389V23.39zM14 24.868l10.406 7.692c.353.261.836.261 1.189 0L36 24.868V11.867L25 20l-11-8.133V24.868zM38 25.889V41c0 .552.448 1 1 1h6.5c1.381 0 2.5-1.119 2.5-2.5V18.497L38 25.889zM12 25.889L2 18.497V39.5C2 40.881 3.119 42 4.5 42H11c.552 0 1-.448 1-1V25.889z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default BurgerMenuDialog;