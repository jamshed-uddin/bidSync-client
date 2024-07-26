import { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

const Searchbar = ({ searchQuery, setSearchQuery, searchBarRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location?.search);
    const queryValue = params.get("q") || "";
    setSearchQuery(queryValue);
  }, [location?.search, setSearchQuery]);

  const searchQueryHandler = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams();
    if (value) {
      params.set("q", value);
    } else {
      params.set({});
    }

    navigate(`?${params.toString()}`, { replace: true });
  };

  const searchBarOnFocus = () => {
    if (window.innerWidth > 800) return;
    setSearchBarFocused(true);
  };

  const inputStyle = `input input-bordered pr-0  input-sm w-full focus:outline-0 focus:border focus:border-gray-500  bg-white `;

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
                setSearchQuery("");
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
          value={searchQuery}
          onChange={searchQueryHandler}
          autoComplete="new-password"
          onFocus={searchBarOnFocus}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg  cursor-pointer `}
          >
            <HiXMark size={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
