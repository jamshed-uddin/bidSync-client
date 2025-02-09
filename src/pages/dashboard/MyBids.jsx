import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";
import NoItemAvailable from "../../components/NoItemAvailable";
import WentWrong from "../../components/WentWrong";
import Table from "../../components/dashboard/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import TableSkeleton from "../../components/TableSkeleton";
import DashboardTitle from "../../components/dashboard/DashboardTitle";

const MyBids = () => {
  const { singleUser } = useSingleUser();

  const {
    data: myBids,
    error,
    isLoading,
  } = useGetData(`/bids/myBids/${singleUser?._id}`, !!singleUser?._id);

  const column = [
    { headerName: "Title", field: "title", width: 200 },
    { headerName: "Bid", field: "amount", width: 200 },
    { headerName: "Status", field: "bidStatus", width: 200 },
    {
      headerName: "Action",
      field: "action",
      renderCell: (params) => (
        <Link to={`/auctions/${params._id}`}>
          <Button>See auction</Button>
        </Link>
      ),
      width: 200,
    },
  ];

  return (
    <div>
      <DashboardTitle>My bids</DashboardTitle>
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <WentWrong />
      ) : !myBids?.length ? (
        <NoItemAvailable />
      ) : (
        <>
          <Table column={column} data={myBids} />
        </>
      )}
    </div>
  );
};

export default MyBids;
