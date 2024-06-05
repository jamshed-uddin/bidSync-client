import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  const inputStyle = `input input-bordered focus:outline-0 focus:border-[1.3px]  input-sm w-full bg-white`;

  const searchQueryHandler = (e) => {
    const value = e.target.value;

    setSearchQuery({ q: value }, { replace: true });

    if (!value) {
      setSearchQuery({}, { replace: true });
    }
  };

  return (
    <div className="form-control  ">
      <div className="flex w-full items-center relative overflow-hidden  rounded-lg  py-1 pr-1">
        <span className=" mr-1">
          <HiMagnifyingGlass size={25} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className={inputStyle}
          name="searchInput"
          value={searchQuery}
          onChange={searchQueryHandler}
          autoComplete="new-password"
        />
        {searchQuery && (
          <span
            onClick={() => setSearchQuery("")}
            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg  cursor-pointer `}
          >
            <HiXMark size={25} />
          </span>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
