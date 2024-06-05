import { useSearchParams } from "react-router-dom";
import Searchbar from "../components/searchPage/SearchBar";
import useDebounce from "../hooks/useDebounce";
import useGetData from "../hooks/useGetData";
import AuctionGrid from "../components/AuctionGrid";
import CardSkeleton from "../components/CardSkeleton";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedValue = useDebounce(searchParams.get("q") || "", 800);

  const { data, isLoading } = useGetData(
    `/listings/search?q=${debouncedValue}`
  );

  return (
    <div className="lg:mt-7">
      <div className="lg:w-1/2 mx-auto">
        <Searchbar
          searchQuery={searchParams.get("q") || ""}
          setSearchQuery={setSearchParams}
        />
      </div>
      <div className="mt-2 text-center">
        {!debouncedValue && (
          <h1 className="text-xl font-semibold">Search for auctions</h1>
        )}
      </div>
      {debouncedValue && isLoading ? (
        <CardSkeleton amount={3} />
      ) : (
        <AuctionGrid items={data} />
      )}
    </div>
  );
};

export default SearchPage;
