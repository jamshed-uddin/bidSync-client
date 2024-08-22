/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";

import calculateDays from "../utils/calculateDays";

import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useSingleUser from "../hooks/useSingleUser";
import { useState } from "react";
import CustomModal from "./CustomModal";

const AuctionCard = ({ item, placedIn }) => {
  const axiosSecure = useAxiosSecure();
  const { singleUser } = useSingleUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAuctionDelete = async () => {
    try {
      await axiosSecure.delete(`/listings/${item._id}`);
      toast.success("Auction deleted.");
      closeDialog();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="  shadow-md p-2 rounded-xl overflow-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />

      {/* modal for deleting confirmation */}
      <CustomModal
        isOpen={isDialogOpen}
        onRequestClose={closeDialog}
        shouldCloseOnOverlayClick={false}
      >
        <div>
          <h1 className="text-2xl">
            Are you sure you want to delete this auction?
          </h1>
          <span className="text-red-500 text-sm ">
            Note: This action cannot be reversed.
          </span>
          <div className="text-end space-x-4 mt-4">
            <Button clickFunc={handleAuctionDelete}>Delete</Button>
            <Button style={"bordered"} clickFunc={closeDialog}>
              Cancel
            </Button>
          </div>
        </div>
      </CustomModal>

      {/* edit and delete button for dashbaord and item seller only */}
      {placedIn === "dashboard" && item?.user?._id === singleUser?._id && (
        <div className=" bg-white h-6  rounded-lg shadow flex justify-end">
          <div className="flex  gap-3 ">
            <Link
              className=" rounded-lg cursor-pointer active:scale-95 shadow-xl"
              to={`/dashboard/editAuction/${item?._id}`}
              replace
            >
              <FiEdit size={20} />
            </Link>
            <span
              onClick={() => setIsDialogOpen(true)}
              className="  text-red-600  rounded-lg  cursor-pointer active:scale-95 shadow-xl"
            >
              <FaRegTrashCan size={20} />
            </span>
          </div>
        </div>
      )}

      {/* auction card */}
      <Link to={`/auctions/${item?._id}`} preventScrollReset={true}>
        <div className="h-52 lg:h-72 w-full  overflow-hidden">
          <img
            className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
            src={item?.photoURL?.at(0)}
            alt={`Image of ${item?.title}`}
            loading="lazy"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mt-1 lg:px-1">
            <h1 className=" md:text-xl font-semibold">{item?.title}</h1>
          </div>

          <div className="leading-5 mt-3 lg:flex justify-between ">
            <div>
              <h1 className="opacity-90">
                {item?.highestBid ? "Current bid" : "Starting from"}
              </h1>
              <h1 className="text-xl font-medium">
                <span className="text-sm">$</span>
                {item?.highestBid || item?.startingPrice}
              </h1>
            </div>

            <h1 className="opacity-90">
              {calculateDays(item?.clossesIn, true)}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
