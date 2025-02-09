import useSingleUser from "../../hooks/useSingleUser";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import AuctionGrid from "../../components/ListingGrid";
import useGetData from "../../hooks/useGetData";
import CardSkeleton from "../../components/CardSkeleton";
import NoItemAvailable from "../../components/NoItemAvailable";
import WentWrong from "../../components/WentWrong";
import Table from "../../components/dashboard/Table";
import TableSkeleton from "../../components/TableSkeleton";
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import ItemDeleteEdit from "../../components/dashboard/ItemDeleteEdit";

const MyListings = () => {
  const { singleUser } = useSingleUser();

  const {
    data: myListings,
    isLoading,
    error,
  } = useGetData(`/listings/myListings/${singleUser?._id}`, !!singleUser?._id);

  const column = [
    {
      headerName: "Title",
      field: "title",
      width: 250,
    },
    {
      headerName: "Starting price",
      field: "startingPrice",
      width: 250,
    },
    {
      headerName: "Current bid",
      field: "highestBid",
      width: 250,
    },
    {
      headerName: "Actions",

      field: "action",
      renderCell: (params) => <ItemDeleteEdit item={params} />,
      width: 200,
    },
  ];

  return (
    <div>
      <DashboardTitle>My listings</DashboardTitle>
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <WentWrong />
      ) : myListings && !isLoading && !myListings?.length ? (
        <NoItemAvailable />
      ) : (
        <Table column={column} data={myListings} />
      )}
    </div>
  );
};

export default MyListings;
