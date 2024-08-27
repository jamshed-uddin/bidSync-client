import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashboardTitle from "./DashboardTitle";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";

const data = [
  {
    name: "Page A",
    Active: 4000,
    Sold: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    Active: 3000,
    Sold: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    Active: 2000,
    Sold: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    Active: 2780,
    Sold: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    Active: 1890,
    Sold: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    Active: 2390,
    Sold: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    Active: 3490,
    Sold: 4300,
    // amt: 2100,
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const AuctionChart = () => {
  const { singleUser } = useSingleUser();
  const [arrangedAuction, setArrangedAuctions] = useState([]);

  const {
    data: myListings,
    isLoading: myListingsLoading,
    error: myListingsError,
  } = useGetData(`/listings/myListings/${singleUser?._id}`, !!singleUser?._id);

  useEffect(() => {
    if (!myListings) return;

    const today = new Date();
    const sixMonthAgo = new Date(today.setMonth(today.getMonth() - 1));

    const recentListings = myListings?.filter((auction) => {
      const auctionCreatedAt = new Date(auction.createdAt);
      return auctionCreatedAt >= sixMonthAgo;
    });

    const data = [];

    for (let i = 0; i < 6; i++) {
      const currentDate = new Date();
      const monthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );

      const monthName = monthDate.toLocaleString("default", { month: "short" });

      const listingsOfTheMonth = recentListings.filter((auction) => {
        const listingDate = new Date(auction.createdAt);
        return (
          listingDate.getMonth() === monthDate.getMonth() &&
          listingDate.getFullYear() === monthDate.getFullYear()
        );
      });

      const activeAmount = listingsOfTheMonth.filter(
        (auction) => auction.status === "active"
      ).length;
      const soldAmount = listingsOfTheMonth.filter(
        (auction) => auction.status === "delevered"
      ).length;

      data.unshift({
        name: monthName,
        Active: activeAmount,
        Sold: soldAmount,
      });
    }

    setArrangedAuctions(data);
  }, [myListings]);

  return (
    <div className="w-full h-80">
      <DashboardTitle>Auction chart</DashboardTitle>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <BarChart
          data={arrangedAuction}
          margin={{
            top: 20,
            left: 0,
            right: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Active" fill="#8884d8" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Sold" fill="#82ca9d" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AuctionChart;
