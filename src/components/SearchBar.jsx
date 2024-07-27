import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useURLParams from "../hooks/useURLParams";

const Searchbar = ({ searchBarRef }) => {
  const navigate = useNavigate();

  const queryParams = useURLParams();
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  const searchQueryHandler = (e) => {
    const value = e.target.value;
    // const params = new URLSearchParams();

    if (value) {
      queryParams.set("q", value);
    } else {
      queryParams.delete("q");
    }

    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const clearSearchBox = () => {
    queryParams.delete("q");
    if (searchBarRef) {
      searchBarRef.current.value = "";
    }
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const searchBarOnFocus = () => {
    if (window.innerWidth > 800) return;
    setSearchBarFocused(true);
  };

  const inputStyle = `input input-bordered pr-0  input-sm w-full border border-gray-400 focus:outline-0 focus:border-[1.9px] focus:border-gray-700  bg-white `;

  return (
    <div
      className={`form-control bg-white absolute top-0  right-0 bottom-0 z-10 h-fit transition-all duration-500 lg:w-64 ${
        searchBarFocused ? " w-full " : "w-28  "
      }`}
    >
      <div className="flex w-full items-center relative overflow-hidden  rounded-lg justify-end">
        {searchBarFocused ? (
          <>
            <button
              onClick={() => {
                setSearchBarFocused(false);
              }}
              className="mr-1 block  lg:hidden"
            >
              <HiXMark size={25} />
            </button>
            <button className=" mr-1 hidden lg:block">
              <HiMagnifyingGlass size={25} />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setSearchBarFocused(true);
              searchBarRef?.current.focus();
            }}
            className=" mr-1"
          >
            <HiMagnifyingGlass size={25} />
          </button>
        )}
        <input
          ref={searchBarRef}
          type="text"
          placeholder="Search"
          className={inputStyle}
          name="searchInput"
          value={queryParams.get("q")}
          onChange={searchQueryHandler}
          autoComplete="new-password"
          onFocus={searchBarOnFocus}
        />
        {queryParams.get("q") && (
          <button
            onClick={clearSearchBox}
            className={`absolute right-[0.4px] top-1/2 -translate-y-1/2 rounded-lg  cursor-pointer bg-white `}
          >
            <HiXMark size={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
