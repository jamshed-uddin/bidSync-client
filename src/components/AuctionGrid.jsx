import AuctionCard from "./AuctionCard";

const AuctionGrid = ({ items = [], placedIn }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 ">
      {items?.map((item) => (
        <AuctionCard key={item?._id} item={item} placedIn={placedIn} />
      ))}
    </div>
  );
};

export default AuctionGrid;
