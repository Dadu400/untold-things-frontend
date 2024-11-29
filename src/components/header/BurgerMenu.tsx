import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import BurgerMenuDialog from './BurgerMenuDialog';

interface BurgerMenuProps {
    className?: string;
}

function BurgerMenu({ className }: BurgerMenuProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${className} cursor-pointer`}>
            <MenuIcon onClick={() => setMenuOpen(!isMenuOpen)} />
            {isMenuOpen && (
                <BurgerMenuDialog setMenuOpen={setMenuOpen} />
            )}
        </div>
    )
}

export default BurgerMenu;