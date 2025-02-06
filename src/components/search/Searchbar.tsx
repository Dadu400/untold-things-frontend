import React, { useState } from "react";
import searchIcon from "../../assets/icons/loupe.png";

function SearchBar({ onSearchClicked } : { onSearchClicked: (query: string) => void }) {
    const [searchValue, setSearchValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearchClicked(searchValue);
        }
    };

    return (
        <section className="w-full">
            <div className="flex items-center mx-auto h-10 w-[90%] lg:w-[70%] mt-4">
                <div className="relative w-full">
                    <input
                        placeholder="მოძებნე სახელის მიხედვით..."
                        className="w-full border-gray border-[1px] outline-none text-sm dark:text-gray-100 md:text-lg rounded-xl h-10 py-6 px-4 font-dejavu tracking-widest dark:bg-bgDark"
                        aria-label="Search by name"
                        onChange={e => setSearchValue(e.target.value)}
                        onKeyDown={e => handleKeyDown(e)}
                    />
                    <button
                        className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer w-6 h-6"
                        aria-label="Search"
                        onClick={() => onSearchClicked(searchValue)}
                    >
                        <img src={searchIcon} alt="Search icon" className="w-full h-full" />
                    </button>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;
