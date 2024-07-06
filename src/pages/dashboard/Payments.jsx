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
  return <div>payments</div>;
};

export default Payments;
