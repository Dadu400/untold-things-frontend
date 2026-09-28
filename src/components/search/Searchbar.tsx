import React, { useState } from "react";
import searchIcon from "../../assets/icons/loupe.png";
import { useScrollSearch } from "../../hooks/useScrollSearch";

function SearchBar({ onSearchClicked }: { onSearchClicked: (query: string) => void }) {
    const [searchValue, setSearchValue] = useState("");
    const { isScrolled } = useScrollSearch();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearchClicked(searchValue);
        }
    };

    const handleSearch = () => {
        onSearchClicked(searchValue);
    };

    return (
        <section
            className={`
                transition-all duration-500 ease-out
            ${isScrolled
                    ? 'fixed top-[13px] left-[76px] right-[56px] z-20 lg:static lg:w-full lg:z-auto'
                    : 'w-full'
                }
            `}
        >
            <div
                className={`
                    flex items-center mx-auto transition-all duration-500 ease-out
                    ${isScrolled
                        ? 'h-9 w-full lg:h-10 lg:w-[70%] mt-1'
                        : 'h-10 w-full max-w-[1200px] px-4 sm:px-6 lg:px-0 lg:w-[70%] lg:max-w-[860px] mt-4'
                    }
                `}
            >
                <div className="relative w-full">
                    <input
                        placeholder={isScrolled ? "მოძებნე..." : "მოძებნე სახელის მიხედვით..."}
                        value={searchValue}
                        className={`
                            w-full border border-line outline-none text-ink
                            font-dejavu bg-surface placeholder:text-muted/80
                            shadow-[0_1px_2px_hsl(var(--shadow)/0.04)]
                            transition-all duration-500 ease-out
                            focus:border-rose-300 focus:ring-4 focus:ring-rose-100 dark:focus:border-rose-300/60 dark:focus:ring-rose-300/10
                            ${isScrolled
                                ? 'text-[15px] rounded-full h-10 py-2 px-4 pr-9 tracking-wider lg:text-lg lg:rounded-2xl lg:h-10 lg:py-6 lg:pr-12 lg:tracking-widest'
                                : 'text-[15px] md:text-lg rounded-2xl h-10 py-6 px-4 pr-12 tracking-widest'
                            }
                        `}
                        aria-label="Search by name"
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={e => handleKeyDown(e)}
                    />
                    <button
                        className={`
                            absolute top-1/2 -translate-y-1/2 cursor-pointer rounded-full
                            before:absolute before:-inset-2.5 before:content-['']
                            hover:scale-110 active:scale-95 transition-transform duration-200
                            ${isScrolled
                                ? 'right-2 w-5 h-5 lg:right-[10px] lg:w-6 lg:h-6'
                                : 'right-[10px] w-6 h-6'
                            }
                        `}
                        aria-label="Search"
                        onClick={handleSearch}
                    >
                        <img
                            src={searchIcon}
                            alt="Search icon"
                            className={`w-full h-full ${isScrolled ? 'opacity-70' : ''}`}
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;
