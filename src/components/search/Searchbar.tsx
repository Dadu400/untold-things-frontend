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
                    ? 'fixed top-[14px] left-[76px] right-[56px] z-20 lg:static lg:w-full lg:z-auto'
                    : 'w-full'
                }
            `}
        >
            <div
                className={`
                    flex items-center mx-auto transition-all duration-500 ease-out
                    ${isScrolled
                        ? 'h-9 w-full lg:h-10 lg:w-[70%] lg:mt-4'
                        : 'h-10 w-[90%] lg:w-[70%] mt-4'
                    }
                `}
            >
                <div className="relative w-full">
                    <input
                        placeholder={isScrolled ? "მოძებნე..." : "მოძებნე სახელის მიხედვით..."}
                        value={searchValue}
                        className={`
                            w-full border-gray border-[1px] outline-none dark:text-gray-100 
                            font-dejavu dark:bg-bgDark bg-bgColor
                            transition-all duration-500 ease-out
                            focus:border-rose-200 dark:focus:border-rose-300
                            ${isScrolled
                                ? 'text-sm rounded-full h-9 py-2 px-4 pr-9 tracking-wider lg:text-sm lg:md:text-lg lg:rounded-xl lg:h-10 lg:py-6 lg:tracking-widest'
                                : 'text-sm md:text-lg rounded-xl h-10 py-6 px-4 tracking-widest'
                            }
                        `}
                        aria-label="Search by name"
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={e => handleKeyDown(e)}
                    />
                    <button
                        className={`
                            absolute top-1/2 -translate-y-1/2 cursor-pointer 
                            hover:scale-110 transition-transform duration-200
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
