import AuctionCard from "./AuctionCard";

const AuctionGrid = ({ items = [], placedIn }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 ">
      {items?.map((item) => (
        <AuctionCard key={item?._id} item={item} placedIn={placedIn} />
      ))}
    </div>
  );
};

export default AuctionGrid;
