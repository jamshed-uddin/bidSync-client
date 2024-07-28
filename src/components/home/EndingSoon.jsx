import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import AuctionGrid from "../AuctionGrid";
import Title from "../Title";
import CardSkeleton from "../CardSkeleton";

const EndingSoon = () => {
  const { data, isLoading } = useGetData("/listings?limit=15");

  console.log(data);

  return (
    <div>
      <div className="flex justify-between items-end">
        <Title>Ending soon</Title>
        <Link to={"/auctions"} preventScrollReset>
          <span className="underline">See all</span>
        </Link>
      </div>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <AuctionGrid items={data?.slice(6, 12)} />
      )}
    </div>
  );
};

export default EndingSoon;
