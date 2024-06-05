import { useEffect, useState } from "react";
import Title from "../components/Title";
import useGetData from "../hooks/useGetData";
import AuctionGrid from "../components/AuctionGrid";
import CardSkeleton from "../components/CardSkeleton";
import NoItemAvailable from "../components/NoItemAvailable";
import { useLocation } from "react-router-dom";
import WentWrong from "../components/WentWrong";
const categories = [
  "All",
  "Paintings",
  "Jewellery",
  "Fashion",
  "Watches",
  "Coin & stamps",
  "Car & motorbikes",
  "Toy & model",
  "Interior",
];
const CategoryPage = () => {
  const [category, setCategory] = useState("");
  const location = useLocation();

  const { data, isLoading, error } = useGetData(
    `/listings?category=${category}`
  );

  useEffect(() => {
    if (location.state) {
      setCategory(location?.state?.category);
    }
  }, [location.state]);

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (error) {
    return <WentWrong />;
  }

  return (
    <div>
      <Title>Categories</Title>
      <div className="mt-4">
        <div className="flex gap-4 flex-nowrap overflow-x-auto ">
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
        {!data?.length ? (
          <div className="mt-3">
            <NoItemAvailable />
          </div>
        ) : (
          <AuctionGrid items={data} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
