import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import BurgerMenuDialog from './BurgerMenuDialog';
import { BurgerMenuProps } from '../../types/types';

function BurgerMenu({ className }: BurgerMenuProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${className} cursor-pointer pt-4`}>
            <MenuIcon onClick={() => setMenuOpen(!isMenuOpen)} fontSize={"medium"} />
            {isMenuOpen && (
                <BurgerMenuDialog setMenuOpen={setMenuOpen} />
            )}

        </div>
    )
};

export default BurgerMenu;