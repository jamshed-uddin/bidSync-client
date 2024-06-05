import AuctionGrid from "../components/AuctionGrid";
import Title from "../components/Title";
import useSaveUnsave from "../hooks/useSaveUnsave";

const SavedItems = () => {
  const { savedItems } = useSaveUnsave();

  return (
    <div>
      <Title>Saved items</Title>
      <AuctionGrid items={savedItems} />
    </div>
  );
};

export default SavedItems;
