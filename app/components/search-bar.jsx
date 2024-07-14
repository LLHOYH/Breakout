"use client";

import {useRef, useEffect} from "react";

const SearchBar = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="search-bar"
      className="flex items-center justify-end lg:justify-center"
    >
      <input
        ref={inputRef}
        type="text"
        className="pl-4 text-black border-2 rounded-lg h-9 bg-zinc-300"
        placeholder="/⌘+K"
      />
    </div>
  );
};

export default SearchBar;
