import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { useParams } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/dashboard/CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Checkout = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: item, isLoading: itemLoading } = useGetData(`/listings/${id}`);
  console.log(item);

  useEffect(() => {
    const loadSecret = async () => {
      const amount =
        item?.format === "auction"
          ? item?.highestBid || item?.startingPrice
          : item?.priceForBuyItNow;

      console.log(amount);
      try {
        const data = await axiosSecure.post(`/payment/secret`, {
          amount: amount,
        });
        setClientSecret(data?.data?.clientSecret);
      } catch (error) {
        return null;
      }
    };

    loadSecret();
  }, [item, axiosSecure]);

  if (itemLoading || !clientSecret) {
    return (
      <div>
        <div className=" bg-gray-200 h-24 rounded-xl skeleton lg:w-1/2"></div>
      </div>
    );
  }

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { loader: "always" } }}
        >
          <CheckoutForm item={item} itemLoading={itemLoading} />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
