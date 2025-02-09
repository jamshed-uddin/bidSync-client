import AuctionGrid from "../../components/ListingGrid";
import CardSkeleton from "../../components/CardSkeleton";
import NoItemAvailable from "../../components/NoItemAvailable";
import WentWrong from "../../components/WentWrong";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";

const WonAuctions = () => {
  const { singleUser } = useSingleUser();

  const {
    data: myListings,
    isLoading,
    error,
  } = useGetData(`/listings/wonAuctions/${singleUser?._id}`, !!singleUser?._id);

  if (isLoading) {
    return <CardSkeleton amount={3} />;
  }

  if (error) {
    return <WentWrong />;
  }
  return (
    <div>
      <DashboardTitle>Won auctions</DashboardTitle>
      {!myListings?.length ? (
        <NoItemAvailable />
      ) : (
        <AuctionGrid items={myListings} placedIn={"dashboard"} />
      )}
    </div>
  );
};

export default WonAuctions;
