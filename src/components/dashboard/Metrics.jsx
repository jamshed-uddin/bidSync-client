import React, { useEffect, useState } from "react";
import DashboardTitle from "./DashboardTitle";
import MetricCard from "./MetricCard";
import useSingleUser from "../../hooks/useSingleUser";
import useGetData from "../../hooks/useGetData";

const Metrics = () => {
  const { singleUser } = useSingleUser();
  const [bidsSorted, setBidsSorted] = useState([]);
  const [auctionsSorted, setAuctionsSorted] = useState([]);

  const {
    data: myBids,
    error,
    isLoading,
  } = useGetData(`/bids/myBids/${singleUser?._id}`, !!singleUser?._id);

  const {
    data: myListings,
    isLoading: myListingsLoading,
    error: myListingsError,
  } = useGetData(`/listings/myListings/${singleUser?._id}`, !!singleUser?._id);

  return (
    <div className="lg:flex items-center gap-3  justify-between">
      <div className="shadow-md p-4 rounded-lg flex-grow">
        <DashboardTitle>My Auctions</DashboardTitle>
        <div className="flex items-center gap-2 divide-x-[1.2px] divide-black mt-2">
          <MetricCard name={"Active"} amount={30} />
          <MetricCard name={"Sold"} amount={30} />
          <MetricCard name={"Relist"} amount={30} />
        </div>
      </div>
      <div className="shadow-md p-4 rounded-lg flex-grow">
        <DashboardTitle>My Bids</DashboardTitle>
        <div className="flex items-center gap-2 divide-x-[1.2px] divide-black mt-2">
          <MetricCard name={"Active"} amount={30} />
          <MetricCard name={"Won"} amount={30} />
          <MetricCard name={"Outbidded"} amount={30} />
        </div>
      </div>
    </div>
  );
};

export default Metrics;
