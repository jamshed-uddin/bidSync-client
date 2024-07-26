import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import AuctionGrid from "../AuctionGrid";
import Title from "../Title";
import CardSkeleton from "../CardSkeleton";

const EasyBids = () => {
  const { data, isLoading } = useGetData("/listings");

  return (
    <div>
      <div className="flex justify-between items-end">
        <Title>Easy bids</Title>
        <Link to={"/auctions"} preventScrollReset>
          <span className="underline">See all</span>
        </Link>
      </div>
      {isLoading ? <CardSkeleton /> : <AuctionGrid items={data?.slice(3, 9)} />}
    </div>
  );
};

export default EasyBids;
