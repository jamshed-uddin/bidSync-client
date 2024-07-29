import { useEffect, useRef, useState } from "react";
import AuctionGrid from "../components/AuctionGrid";
import CardSkeleton from "../components/CardSkeleton";
import Title from "../components/Title";
import WentWrong from "../components/WentWrong";
import useGetData from "../hooks/useGetData";
import useDebounce from "../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../components/SearchBar";
import useURLParams from "../hooks/useURLParams";

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
  const queryParams = useURLParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [URLParams, setURLParams] = useState({
    category: queryParams.get("category") || "",
    page: queryParams.get("page") || 0,
    limit: queryParams.get("limit") || 0,
    minPrice: queryParams.get("minPrice") || 0,
    maxPrice: queryParams.get("maxPrice") || 0,
    sort: queryParams.get("sort") || "",
    order: queryParams.get("order") || "",
  });

  const { data, isLoading, error } = useGetData(`/listings${location.search}`);

  useEffect(() => {
    if (location.state) {
      if (location?.state?.category) {
        setCategory(location?.state?.category);
        updateURLParams({ category: location?.state?.category });
      }

      if (location?.state?.focusSearchBar) {
        searchBarRef.current && searchBarRef.current.focus();
      }
    }
  }, [location]);

  const filterEmptyParams = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => Boolean(value))
    );
  };

  function updateURLParams(newParams) {
    const updatedParams = { ...URLParams, ...newParams };
    const updatedFilteredParams = filterEmptyParams(updatedParams);
    setURLParams(updatedFilteredParams);

    const searchParms = new URLSearchParams(updatedFilteredParams).toString();

    navigate(`?${searchParms}`, { replace: true });
  }

  return (
    <div>
      <div className="flex justify-between relative mt-4">
        <Title>Auctions</Title>
        <Searchbar searchBarRef={searchBarRef} />
      </div>

      <div>
        {isLoading ? (
          <CardSkeleton />
        ) : error ? (
          <WentWrong />
        ) : (
          <>
            <div className="flex gap-4 flex-nowrap overflow-x-auto mt-2 pt-2 pb-3 hide-scrollbar ">
              {categories.map((cate, index) => (
                <div
                  onClick={() => {
                    setCategory(
                      cate.toLowerCase() === "all" ? "" : cate.toLowerCase()
                    );
                    updateURLParams({
                      category:
                        cate.toLowerCase() === "all" ? "" : cate.toLowerCase(),
                    });
                  }}
                  key={index}
                  className={`px-3 py-1 rounded-xl shadow-md w-fit shrink-0 cursor-pointer ${
                    cate.toLowerCase() === category
                      ? "bg-gray-200 shadow-lg"
                      : ""
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
