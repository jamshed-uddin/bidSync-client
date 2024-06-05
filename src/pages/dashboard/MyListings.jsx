import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSingleUser from "../../hooks/useSingleUser";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import AuctionGrid from "../../components/AuctionGrid";
import useGetData from "../../hooks/useGetData";
import CardSkeleton from "../../components/CardSkeleton";
import NoItemAvailable from "../../components/NoItemAvailable";

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
  return (
    <div>
      <DashboardTitle>My listings</DashboardTitle>
      {!myListings?.length ? (
        <NoItemAvailable />
      ) : (
        <AuctionGrid items={myListings} placedIn={"dashboard"} />
      )}
    </div>
  );
};

export default MyListings;
