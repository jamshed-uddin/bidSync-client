import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useSingleUser from "../../hooks/useSingleUser";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import AuctionGrid from "../../components/AuctionGrid";

const MyListings = () => {
  const [myListings, setMyListings] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { singleUser } = useSingleUser();

  useEffect(() => {
    const loadMyListings = async () => {
      try {
        const result = await axiosSecure.get(
          `/listings/myListings/${singleUser?._id}`
        );
        setMyListings(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadMyListings();
  }, [axiosSecure, singleUser?._id]);
  return (
    <div>
      <DashboardTitle>My listings</DashboardTitle>
      <AuctionGrid items={myListings} placedIn={"dashboard"} />
    </div>
  );
};

export default MyListings;
