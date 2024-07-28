import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiXMark, HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useURLParams from "../hooks/useURLParams";

const Searchbar = ({ searchBarRef }) => {
  const navigate = useNavigate();
  const queryParams = useURLParams();
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const submitSearchQuery = (e) => {
    e.preventDefault();
    // const params = new URLSearchParams();

    if (searchQuery) {
      queryParams.set("q", searchQuery);
    } else {
      queryParams.delete("q");
    }

    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const inputFieldChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchBox = () => {
    setSearchQuery("");
  };

  const searchBarOnFocus = () => {
    if (window.innerWidth > 800) return;
    setSearchBarFocused(true);
  };

  const navigateBack = () => {
    setSearchBarFocused(false);
    setSearchQuery("");
    queryParams.delete("q");
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const inputStyle = `input input-bordered pr-0  input-sm w-full border border-gray-400 focus:outline-0 focus:border-[1.9px] focus:border-gray-700  bg-white `;

  return (
    <div
      className={`form-control bg-white absolute top-0  right-0 bottom-0 z-10 h-fit transition-all duration-500 lg:w-64 ${
        searchBarFocused ? " w-full " : "w-28  "
      }`}
    >
      <div className="flex gap-2 w-full items-center relative overflow-hidden  rounded-lg justify-end">
        {searchBarFocused ? (
          <>
            <button onClick={navigateBack} className=" block  lg:hidden">
              <HiArrowLeft size={25} />
            </button>
          </>
        ) : null}
        <form className="w-full relative" onSubmit={submitSearchQuery}>
          <input
            ref={searchBarRef}
            type="text"
            placeholder="Search"
            className={inputStyle}
            name="searchInput"
            value={searchQuery}
            onChange={inputFieldChangeHandler}
            autoComplete="new-password"
            onFocus={searchBarOnFocus}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearchBox}
              className={`absolute right-[0.6px] top-1/2 -translate-y-1/2 rounded-lg  cursor-pointer bg-white `}
            >
              <HiXMark size={25} />
            </button>
          )}
        </form>
        <button onClick={submitSearchQuery} className=" mr-1">
          <HiMagnifyingGlass size={25} />
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
