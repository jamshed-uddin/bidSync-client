import ItemCard from "./ItemCard";

const ListingGrid = ({ items = [], placedIn }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7 mt-4 ">
      {items?.map((item) => (
        <ItemCard key={item?._id} item={item} placedIn={placedIn} />
      ))}
    </div>
  );
};

export default ListingGrid;
