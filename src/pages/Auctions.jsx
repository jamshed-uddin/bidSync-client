import AuctionCard from "../components/AuctionCard";
import AuctionGrid from "../components/AuctionGrid";
import CardSkeleton from "../components/CardSkeleton";
import Title from "../components/Title";
import useAllData from "../hooks/useAllData";
import useGetData from "../hooks/useGetData";

const Auctions = () => {
  const { data, isLoading } = useGetData("/listings");
  if (isLoading) {
    return <CardSkeleton />;
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
