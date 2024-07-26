import { useEffect, useRef, useState } from "react";
import AuctionGrid from "../components/AuctionGrid";
import CardSkeleton from "../components/CardSkeleton";
import Title from "../components/Title";
import WentWrong from "../components/WentWrong";
import useGetData from "../hooks/useGetData";
import useDebounce from "../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import Searchbar from "../components/SearchBar";

const categories = [
  "All",
  "Paintings",
  "Jewellery",
  "Fashion",
  "Watches",
  "Coin & Stamps",
  "Car & Motorbikes",
  "Toy & Model",
  "Interior",
];

const Auctions = () => {
  const searchBarRef = useRef(null);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const debouncedValue = useDebounce(searchQuery, 800);

  const { data, isLoading, error } = useGetData("/listings");
  console.log(debouncedValue);
  useEffect(() => {
    if (location.state) {
      if (location?.state?.category) {
        setCategory(location?.state?.category);
      }

      if (location?.state?.focusSearchBar) {
        searchBarRef.current && searchBarRef.current.focus();
      }
    }
  }, [location]);

  return (
    <div>
      <div className="flex justify-between relative mt-4">
        <Title>Auctions</Title>
        <Searchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchBarRef={searchBarRef}
        />
      </div>

      <div>
        {isLoading ? (
          <CardSkeleton />
        ) : error ? (
          <WentWrong />
        ) : (
          <>
            <div className="flex gap-4 flex-nowrap overflow-x-auto my-2">
              {categories.map((cate, index) => (
                <div
                  onClick={() => setCategory(cate.toLowerCase())}
                  key={index}
                  className={`px-3 py-1 rounded-xl border-[1.2px] border-black w-fit shrink-0 cursor-pointer ${
                    cate.toLowerCase() === category ? "bg-gray-300 " : ""
                  }`}
                >
                  {cate}
                </div>
              ))}
            </div>
            <AuctionGrid items={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Auctions;
