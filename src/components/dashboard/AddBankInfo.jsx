import { useEffect, useState } from "react";
import useSingleUser from "../../hooks/useSingleUser";
import Button from "../Button";
import { FaCircleCheck } from "react-icons/fa6";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddBankInfo = () => {
  const { singleUser } = useSingleUser();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (singleUser?.bankInfoAdded) {
      return;
    }

    const loadStatus = async () => {
      try {
        const { data } = await axiosSecure.post(
          `/payment/connectAndOnboardUser`,
          { userId: singleUser?._id }
        );
      } catch (error) {
        console.log(error);
      }
    };

    loadStatus();
  }, [
    axiosSecure,
    singleUser?._id,
    singleUser?.bankInfoAdded,
    singleUser.email,
  ]);

  const onboardAndConnectUser = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.post(
        `/payment/connectAndOnboardUser`,
        { userId: singleUser?._id, email: singleUser?.email }
      );
      window.open(data?.accountLinks.url, "_self");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(error.response?.data?.message);
    }
  };

  const loadLoginLink = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.post(`/payment/dashboardLoginLink`, {
        userId: singleUser?._id,
      });
      setLoading(false);
      window.open(data?.url, "_self");
    } catch (error) {
      toast.error("Something went wrong.Try again later");
      setLoading(false);
    }
  };
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 6000 }}
      />
      <h1 className="text-2xl  font-semibold">Payment</h1>
      <h4 className="text-lg leading-5 mb-4">
        Add your bank account information to take payment for your sold auction.
      </h4>

      {singleUser?.bankInfoAdded ? (
        <>
          <h1 className="flex items-center gap-1 text-xl mb-2">
            <FaCircleCheck color="green" /> <span>Bank information added</span>
          </h1>
          <Button
            className=""
            clickFunc={loadLoginLink}
            isLoading={loading}
            disabled={loading}
          >
            Account dashboard
          </Button>
        </>
      ) : (
        <Button
          className=""
          clickFunc={onboardAndConnectUser}
          isLoading={loading}
          disabled={loading}
        >
          Add Bank info
        </Button>
      )}
    </div>
  );
};

export default AddBankInfo;
