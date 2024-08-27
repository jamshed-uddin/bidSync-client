import { useEffect, useState } from "react";
import useSingleUser from "../../hooks/useSingleUser";
import Button from "../Button";
import { FaCircleCheck } from "react-icons/fa6";
import { GoInfo } from "react-icons/go";

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
        return null;
      }
    };

    loadStatus();
  }, [
    axiosSecure,
    singleUser?._id,
    singleUser?.bankInfoAdded,
    singleUser?.email,
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
      <div className="text-2xl  font-semibold flex items-end gap-2 mb-4">
        <h3> Payment</h3>
        {singleUser?.bankInfoAdded && (
          <div
            className="tooltip "
            data-tip={`${
              singleUser?.bankInfoAdded
                ? "Use 000000 as dashboard OTP to login"
                : "Use test bank data to add bank account"
            }`}
          >
            <span className=" cursor-pointer">
              <GoInfo size={20} />
            </span>
          </div>
        )}
      </div>
      {!singleUser?.bankInfoAdded && (
        <h4 className="text-lg leading-5 ">
          Add your bank account information to take payment for your sold
          auction.
        </h4>
      )}

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
