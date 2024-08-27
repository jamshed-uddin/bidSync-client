import React, { useEffect, useState } from "react";
import DashboardTitle from "./DashboardTitle";
import MetricCard from "./MetricCard";
import useSingleUser from "../../hooks/useSingleUser";
import useGetData from "../../hooks/useGetData";
import DashboardSkeleton from "./DashboardSkeleton";

const Metrics = () => {
  const { singleUser } = useSingleUser();
  const [bidsSorted, setBidsSorted] = useState({});
  const [auctionsSorted, setAuctionsSorted] = useState({});

  const {
    data: myBids,
    error,
    isLoading: myBidsLoading,
  } = useGetData(`/bids/myBids/${singleUser?._id}`, !!singleUser?._id);

  const {
    data: myListings,
    isLoading: myListingsLoading,
    error: myListingsError,
  } = useGetData(`/listings/myListings/${singleUser?._id}`, !!singleUser?._id);

  useEffect(() => {
    if (myListings) {
      const sortedListings = myListings?.reduce(
        (acc, listing) => {
          let { status } = listing;

          if (status === "expired" || status === "unpaid") {
            status = "expired";
          }

          acc[status] = (acc[status] || 0) + 1;

          return acc;
        },
        { active: 0, sold: 0, expired: 0 }
      );

      setAuctionsSorted(sortedListings);
    }

    if (myBids) {
      const sortedBids = myBids?.reduce(
        (acc, bid) => {
          let { bidStatus } = bid;

          acc[bidStatus] = (acc[bidStatus] || 0) + 1;
          return acc;
        },
        { active: 0, outbidded: 0 }
      );

      setBidsSorted(sortedBids);
    }
  }, [myBids, myListings]);

  if (myListingsLoading || myBidsLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="lg:flex items-center gap-3  justify-between space-y-4 lg:space-y-0">
      <div className="shadow-md p-4 rounded-lg flex-grow bg-gray-100">
        <DashboardTitle>My Auctions</DashboardTitle>
        <div className="flex items-center gap-2  mt-2">
          {Object.keys(auctionsSorted)?.map((status) => (
            <MetricCard
              key={status}
              name={status}
              amount={auctionsSorted[status]}
            />
          ))}
        </div>
      </div>
      <div className="shadow-md p-4 rounded-lg flex-grow bg-gray-100">
        <DashboardTitle>My Bids</DashboardTitle>
        <div className="flex items-center gap-2  mt-2">
          {Object.keys(bidsSorted)?.map((status) => (
            <MetricCard
              key={status}
              name={status}
              amount={bidsSorted[status]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
