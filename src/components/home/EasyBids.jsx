import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import AuctionGrid from "../ListingGrid";
import Title from "../Title";
import CardSkeleton from "../CardSkeleton";
import { MdArrowOutward } from "react-icons/md";

const EasyBids = () => {
  const { data, isLoading } = useGetData("/listings?limit=15");

  return (
    <div>
      <div className="flex justify-between items-end">
        <Title>Easy bids</Title>
        <Link
          to={"/listings"}
          className="flex items-center text-sm  font-light underline  justify-end"
        >
          See all <MdArrowOutward />
        </Link>
      </div>
      <div className="my-5">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <AuctionGrid items={data?.slice(3, 9)} />
        )}
      </div>
    </div>
  );
};

export default EasyBids;
