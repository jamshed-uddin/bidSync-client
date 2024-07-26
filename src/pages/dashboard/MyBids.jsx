import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";
import DashboardTitle from "../../components/dashboard/DashboardTitle";

import CardSkeleton from "../../components/CardSkeleton";
import NoItemAvailable from "../../components/NoItemAvailable";
import WentWrong from "../../components/WentWrong";
import Table from "../../components/dashboard/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const MyBids = () => {
  const { singleUser } = useSingleUser();

  const {
    data: myBids,
    error,
    isLoading,
  } = useGetData(`/bids/myBids/${singleUser?._id}`, !!singleUser?._id);
  console.log(myBids);

  const column = [
    { headerName: "Title", field: "title", width: 200 },
    { headerName: "Bid", field: "amount", width: 200 },
    { headerName: "Status", field: "bidStatus", width: 200 },
    {
      headerName: "Auction",
      field: "action",
      renderCell: (params) => (
        <Link to={`/auctions/${params._id}`}>
          <Button>See auction</Button>
        </Link>
      ),
      width: 200,
    },
  ];

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
        <Table column={column} data={myBids} />
      )}
    </div>
  );
};

export default MyBids;
