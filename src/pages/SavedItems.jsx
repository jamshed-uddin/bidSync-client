import AuctionGrid from "../components/ListingGrid";
import CardSkeleton from "../components/CardSkeleton";
import Title from "../components/Title";
import WentWrong from "../components/WentWrong";

import useSaveUnsave from "../hooks/useSaveUnsave";

const SavedItems = () => {
  const { savedItems, savedItemLoading, savedItemError } = useSaveUnsave();

  if (savedItemLoading) {
    return <CardSkeleton />;
  }
  if (savedItemError) {
    return <WentWrong />;
  }

  return (
    <div>
      <Title>Saved items</Title>
      <AuctionGrid items={savedItems} />
    </div>
  );
};

export default SavedItems;
