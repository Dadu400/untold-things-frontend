import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScrollSearchContextType {
    isScrolled: boolean;
}

const ScrollSearchContext = createContext<ScrollSearchContextType | undefined>(undefined);

export function ScrollSearchProvider({ children }: { children: ReactNode }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <ScrollSearchContext.Provider value={{ isScrolled }}>
            {children}
        </ScrollSearchContext.Provider>
    );
}

export function useScrollSearch() {
    const context = useContext(ScrollSearchContext);
    if (context === undefined) {
        throw new Error('useScrollSearch must be used within a ScrollSearchProvider');
    }
    return context;
}
