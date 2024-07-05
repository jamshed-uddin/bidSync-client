import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/dashboard/CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
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
        console.log(data);
        setClientSecret(data?.data?.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };

    loadSecret();
  }, [auction?.highestBid, axiosSecure]);

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm auction={auction} auctionLoading={auctionLoading} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
