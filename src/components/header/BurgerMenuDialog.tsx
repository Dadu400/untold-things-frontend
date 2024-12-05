import CloseIcon from '@mui/icons-material/Close';
import PostButton from "./PostButton";

export interface BurgerMenuDialogProps {
    setMenuOpen: (isOpen: boolean) => void;
}
function BurgerMenuDialog({ setMenuOpen }: BurgerMenuDialogProps) {
    return (
        <div className="navbar fixed top-0 right-0 h-screen w-64 p-6 bg-bgColor shadow-lg cursor-normal z-10">
            <div className="flex justify-end mb-5">
                <CloseIcon onClick={() => setMenuOpen(false)} />
            </div>
            <div className="flex flex-col justify-start mt-5">
                <a href="/" className="uppercase font-medium text-base font-bpg tracking-wider p-2 flex gap-5">
                    <span>პოსტები</span>
                </a>
                <div className="flex flex-col">
                    <a href="/" className="uppercase font-medium text-base font-bpg tracking-wider p-2 flex gap-5">
                        <span>ანონიმური SMS</span>
                    </a>
                </div>
                <div className="flex flex-col">
                    <a href="/about" className="uppercase font-medium text-base font-bpg tracking-wider p-2 flex gap-5">
                        <span>ჩვენზე</span>
                    </a>
                </div>
                <div className="flex justify-start gap-[15px] mt-5">
                    <div className="flex gap-[10px] justify-center items-center">
                        <PostButton className="flex lg:hidden" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BurgerMenuDialog;
