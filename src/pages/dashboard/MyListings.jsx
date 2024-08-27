import useSingleUser from "../../hooks/useSingleUser";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import AuctionGrid from "../../components/AuctionGrid";
import useGetData from "../../hooks/useGetData";
import CardSkeleton from "../../components/CardSkeleton";
import NoItemAvailable from "../../components/NoItemAvailable";
import WentWrong from "../../components/WentWrong";

const MyListings = () => {
  const { singleUser } = useSingleUser();

  const {
    data: myListings,
    isLoading,
    error,
  } = useGetData(`/listings/myListings/${singleUser?._id}`, !!singleUser?._id);

  if (isLoading) {
    return <CardSkeleton amount={3} />;
  }

  if (error) {
    return <WentWrong />;
  }

  return (
    <div>
      <DashboardTitle>My listings</DashboardTitle>
      {myListings && !isLoading && !myListings?.length ? (
        <NoItemAvailable />
      ) : (
        <AuctionGrid items={myListings} placedIn={"dashboard"} />
      )}
    </div>
  );
};

export default MyListings;
