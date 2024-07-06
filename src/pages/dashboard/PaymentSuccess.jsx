import { FaCircleCheck } from "react-icons/fa6";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <span>
        <FaCircleCheck color="#4ad66d" size={50} />
      </span>

      <h1 className="text-3xl font-semibold mb-2">Payment successful</h1>
      <Link to={"/dashboard/payments"}>
        <Button>See transactions</Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
