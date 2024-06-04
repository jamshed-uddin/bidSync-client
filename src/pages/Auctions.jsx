import AuctionCard from "../components/AuctionCard";
import AuctionGrid from "../components/AuctionGrid";
import Title from "../components/Title";
import useAllData from "../hooks/useAllData";

const Auctions = () => {
  const { allListings } = useAllData();

  return (
    <div>
      <Title>Place your bid</Title>
      <div>
        <AuctionGrid items={allListings} />
      </div>
    </div>
  );
};

export default Auctions;
