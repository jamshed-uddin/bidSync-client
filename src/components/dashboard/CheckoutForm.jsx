import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "../Button";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import DashboardTitle from "./DashboardTitle";

const CheckoutForm = ({ item, itemLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/paymentSuccess`,
      },

      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent) {
      try {
        const paymentInfo = {
          auctionId: item?._id,
          amount: item?.highestBid,
          transactionId: paymentIntent?.id,
        };

        await axiosSecure.post(`/payment`, paymentInfo);
        await axiosSecure.post("/delivery", {
          auctionId: item?._id,
          recipient: item?.highestBidder,
        });

        navigate("/dashboard/paymentSuccess");
      } catch (error) {
        setIsProcessing(false);
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="lg:flex lg:gap-12 pt-3 pb-10 space-y-10 lg:space-y-0">
      {/* auction detail */}
      <div className="lg:w-1/2 ">
        <DashboardTitle>Item</DashboardTitle>
        <div className="flex gap-4 mt-4">
          {/* auction images */}
          <div className="w-28 h-28 rounded-xl overflow-hidden  ">
            <img
              src={item?.photoURL[0].url}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* auction detail */}
          <div className="">
            <h1 className="text-2xl font-semibold ">{item?.title}</h1>

            <h3 className=" ">
              $
              <span className="text-lg font-semibold">
                {item.format === "auction"
                  ? item?.highestBid || item?.startingPrice
                  : item.priceForBuyItNow}
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* payment form */}
      <div className="lg:w-1/2 ">
        <DashboardTitle>Payment info</DashboardTitle>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <PaymentElement />
          {errorMessage && (
            <span className="block text-red-600">{errorMessage}</span>
          )}
          <Button disabled={!stripe || isProcessing} isLoading={isProcessing}>
            Pay
          </Button>
        </form>
        <h3 className="text-sm text-end">
          Powered by <span className="font-bold">Stripe</span>
        </h3>
      </div>
    </div>
  );
};

export default CheckoutForm;
