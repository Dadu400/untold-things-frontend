import { ReactNode } from "react";

export type SinglePostProps = {
    id: number;
    messageTo: string;
    message: string;
    timestamp: number;
    likes: number;
    shares: number;
    liked: boolean;
    messageStatus: string;
    className?: string;
    disabled?: boolean;
};

export type PostsListProps = {
    posts: SinglePostProps[];
};

export type PostListsProps = {
    posts: PostsListProps["posts"];
    fetchNextPage: () => void;
    hasNextPage: boolean;
    loading: boolean;
    isInitialLoading: boolean;
};

export type DialogProps = {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    className?: string;
};

export type ShareDialogProps = {
    isModalOpen: boolean; 
    setIsModalOpen: (isOpen: boolean) => void;
    onSharePost: () => void;
    shareUrl: string;
    shareMessage: string;
};

export type SubmitDialogProps = {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    messageTo: string;
    message: string;
    onSubmit?: () => void;
};

export type LayoutProps = {
    particlesComponent?: React.ReactNode;
    resetHomeKey?: () => void;
    centerContent?: boolean;
};

export type WarningBadgeProps ={
    text: string;
    icon: string;
    className?: string;
    altText?: string;
};

export type BurgerMenuProps = {
    className?: string;
};

export type BurgerMenuDialogProps = {
    setMenuOpen: (isOpen: boolean) => void;
};

export type NavbarProps = {
    resetHomeKey?: () => void;
};

export type PostButtonProps = {
    className: string;
    onClick?: () => void;
};

export type ThemeSwitcherProps = {
    className?: string;
};

export type GamesProps ={
    onClick: () => void;
}

export type Product = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
}

export type Cart = {
    [productId: number]: number;
}