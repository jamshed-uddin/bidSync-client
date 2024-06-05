import AuctionGrid from "../components/AuctionGrid";
import CardSkeleton from "../components/CardSkeleton";
import Title from "../components/Title";
import WentWrong from "../components/WentWrong";

import useGetData from "../hooks/useGetData";

const Auctions = () => {
  const { data, isLoading, error } = useGetData("/listings");
  if (isLoading) {
    return <CardSkeleton />;
  }
  if (error) {
    return <WentWrong />;
  }

  return (
    <div>
      <Title>Place your bid</Title>
      <div>
        <AuctionGrid items={data} />
      </div>
    </div>
  );
};

export default Auctions;
