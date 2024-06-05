import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import AuctionGrid from "../../components/AuctionGrid";
import CardSkeleton from "../../components/CardSkeleton";
import NoItemAvailable from "../../components/NoItemAvailable";
import WentWrong from "../../components/WentWrong";

const MyBids = () => {
  const { singleUser } = useSingleUser();

  const {
    data: myBids,
    error,
    isLoading,
  } = useGetData(`/bids/mybids/${singleUser?._id}`, !!singleUser?._id);

  if (isLoading) {
    return <CardSkeleton amount={3} />;
  }

  if (error) {
    return <WentWrong />;
  }

  return (
    <div>
      <DashboardTitle>My bids</DashboardTitle>
      {!myBids?.length ? (
        <NoItemAvailable />
      ) : (
        <AuctionGrid items={myBids?.map((item) => item.auctionId)} />
      )}
    </div>
  );
};

export default MyBids;
