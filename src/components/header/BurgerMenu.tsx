import { useState } from 'react';

import BurgerMenuDialog from './BurgerMenuDialog';
import { BurgerMenuProps } from '../../types/types';

function BurgerMenu({ className }: BurgerMenuProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${className} cursor-pointer`}>
            <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                aria-label="Menu"
                aria-expanded={isMenuOpen}
                className="flex items-center justify-center w-10 h-[54px] -mr-1 rounded-xl transition-transform duration-200 active:scale-90"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="list" className="w-8 h-8 text-periwinkle">
                    <path d="M3 9h26a2 2 0 0 0 0-4H3a2 2 0 0 0 0 4ZM29 14H3a2 2 0 0 0 0 4h26a2 2 0 0 0 0-4ZM29 23H3a2 2 0 0 0 0 4h26a2 2 0 0 0 0-4Z"
                        style={{ fill: 'currentColor' }}></path>
                </svg>
            </button>
            {isMenuOpen && <BurgerMenuDialog setMenuOpen={setMenuOpen} />}
        </div>
    );
}

export default BurgerMenu;