import Table from "../../components/dashboard/Table";
import TableSkeleton from "../../components/TableSkeleton";
import WentWrong from "../../components/WentWrong";
import useGetData from "../../hooks/useGetData";
import useSingleUser from "../../hooks/useSingleUser";

const Payments = () => {
  const { singleUser } = useSingleUser();

  const {
    data: payments,
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useGetData(`/payment`, !!singleUser?._id);

  console.log(payments);

  const column = [
    {
      headerName: "Date",
      field: "createdAt",
      width: 250,
    },
    {
      headerName: "Transaction id",
      field: "transactionId",
    },
    {
      headerName: "Auction id",
      field: "auctionId",
    },
    {
      headerName: "Amount",
      field: "amount",
    },
  ];

  return (
    <div className="">
      {paymentsLoading ? (
        <TableSkeleton />
      ) : paymentsError ? (
        <WentWrong />
      ) : (
        <Table column={column} data={payments} />
      )}
    </div>
  );
};

export default Payments;
