import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/dashboard/CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PaymentSuccess from "./PaymentSuccess";
import DetailSkeleton from "../../components/DetailSkeleton";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Checkout = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: auction,
    isLoading: auctionLoading,
    error: auctionError,
  } = useGetData(`/listings/${id}`);

  useEffect(() => {
    const loadSecret = async () => {
      try {
        const data = await axiosSecure.post(`/payment/secret`, {
          amount: auction?.highestBid,
        });
        setClientSecret(data?.data?.clientSecret);
      } catch (error) {
        return null;
      }
    };

    loadSecret();
  }, [auction?.highestBid, axiosSecure]);

  if (auctionLoading || !clientSecret) {
    return <DetailSkeleton />;
  }

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { loader: "always" } }}
        >
          <CheckoutForm auction={auction} auctionLoading={auctionLoading} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
