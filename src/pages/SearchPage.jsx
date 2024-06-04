import { useSearchParams } from "react-router-dom";
import Searchbar from "../components/searchPage/SearchBar";
import useDebounce from "../hooks/useDebounce";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedValue = useDebounce(searchParams.get("q") || "", 800);

  console.log(debouncedValue);

  return (
    <div className="mt-7">
      <div className="w-1/2 mx-auto">
        <Searchbar
          searchQuery={searchParams.get("q") || ""}
          setSearchQuery={setSearchParams}
        />
      </div>
      <div className="mt-2 text-center">
        {!searchParams.get("q") && (
          <h1 className="text-xl font-semibold">Search for auctions</h1>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
