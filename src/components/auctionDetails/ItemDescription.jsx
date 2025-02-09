const ItemDescription = ({ item }) => {
  return (
    <div>
      <h2 className="mt-4 font-semibold text-xl mb-4">Description</h2>
      <p className="text-lg">{item?.description}</p>
    </div>
  );
};

export default ItemDescription;
