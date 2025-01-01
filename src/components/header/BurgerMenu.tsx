import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import BurgerMenuDialog from './BurgerMenuDialog';

interface BurgerMenuProps {
    className?: string;
}

function BurgerMenu({ className }: BurgerMenuProps) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${className} cursor-pointer pt-4`}>
            <MenuIcon onClick={() => setMenuOpen(!isMenuOpen)} fontSize={"medium"}/>
            {isMenuOpen && (
                <BurgerMenuDialog setMenuOpen={setMenuOpen} />
            )}
        </div>
    )
}

export default BurgerMenu;