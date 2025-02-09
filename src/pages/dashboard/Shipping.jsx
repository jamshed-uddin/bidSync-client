import { Link } from "react-router-dom";
import Table from "../../components/dashboard/Table";
import TableSkeleton from "../../components/TableSkeleton";
import WentWrong from "../../components/WentWrong";
import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";
import Button from "../../components/Button";
import DashboardTitle from "../../components/dashboard/DashboardTitle";

const Shipping = () => {
  const { singleUser } = useSingleUser();

  const {
    data: delivery,
    isLoading: deliveryLoading,
    error: deliveryError,
  } = useGetData(`/delivery`, !!singleUser?._id);

  const column = [
    {
      headerName: "Date",
      field: "createdAt",
      width: 250,
    },

    {
      headerName: "Auction id",
      field: "auctionId",
      width: 230,
    },
    {
      headerName: "Status",
      field: "deliveryStatus",
    },
    {
      headerName: "Auction",
      field: "action",
      renderCell: (params) => (
        <Link to={`/auctions/${params.auctionId}`}>
          <Button>See auction</Button>
        </Link>
      ),
      width: 200,
    },
  ];

  return (
    <div className="">
      <DashboardTitle>Shipping</DashboardTitle>
      {deliveryLoading ? (
        <TableSkeleton />
      ) : deliveryError ? (
        <WentWrong />
      ) : (
        <Table column={column} data={delivery} />
      )}
    </div>
  );
};

export default Shipping;
