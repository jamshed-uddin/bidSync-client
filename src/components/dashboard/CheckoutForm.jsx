import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Button from "../Button";
import { useState } from "react";
import ImageCarousel from "../ImageCarousel";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ auction, auctionLoading }) => {
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
        return_url: "http://localhost:5173/dashboard/paymentSuccess",
      },

      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent) {
      try {
        const paymentInfo = {
          auctionId: auction?._id,
          amount: auction?.highestBid,
          transactionId: paymentIntent?.id,
        };

        const result = await axiosSecure.post(`/payment`, paymentInfo);
        const saveToDelivery = await axiosSecure.post("/delivery", {
          auctionId: auction?._id,
          recipient: auction?.highestBidder,
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
        {/* auction images */}
        <div className="w-full h-[50vh]">
          <ImageCarousel images={auction?.photoURL} />
        </div>
        {/* auction detail */}
        <div className="mt-4">
          <h1 className="text-2xl lg:text-3xl font-semibold mb-2">
            {auction?.title}
          </h1>
          <h3 className="text-lg">
            <span>From: </span> {auction?.user?.name}
          </h3>
          <h3 className="text-lg leading-2 ">
            Winning bid: $
            <span className="text-xl font-semibold">{auction?.highestBid}</span>
          </h3>
        </div>
      </div>

      {/* payment form */}
      <div className="lg:w-1/2 ">
        <h1 className="text-2xl font-semibold leading-3 pb-5">Payment info</h1>
        <form onSubmit={handleSubmit} className="space-y-3 ">
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
