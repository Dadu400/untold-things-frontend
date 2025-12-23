import { useState } from 'react';

import BurgerMenuDialog from './BurgerMenuDialog';
import { BurgerMenuProps } from '../../types/types';

function BurgerMenu({ className }: BurgerMenuProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${className} cursor-pointer`}>
            <button onClick={() => setMenuOpen(!isMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="list" className="w-6 h-8 text-[#a4bafc]">
                    <path d="M3 9h26a2 2 0 0 0 0-4H3a2 2 0 0 0 0 4ZM29 14H3a2 2 0 0 0 0 4h26a2 2 0 0 0 0-4ZM29 23H3a2 2 0 0 0 0 4h26a2 2 0 0 0 0-4Z"
                        style={{ fill: 'currentColor' }}></path>
                </svg>
            </button>
            {isMenuOpen && <BurgerMenuDialog setMenuOpen={setMenuOpen} />}
        </div>
    );
}

export default BurgerMenu;