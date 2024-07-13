import Table from "../../components/dashboard/Table";
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
      width: 200,
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
      <Table column={column} data={payments} />
    </div>
  );
};

export default Payments;
