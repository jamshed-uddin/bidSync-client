/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import axios from "axios";

import {
  HiOutlinePencilSquare,
  HiOutlineArchiveBoxXMark,
} from "react-icons/hi2";
import calculateDays from "../utils/calculateDays";
import Modal from "./Modal";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useSingleUser from "../hooks/useSingleUser";

const AuctionCard = ({ item, placedIn }) => {
  const axiosSecure = useAxiosSecure();
  const { singleUser } = useSingleUser();
  const openModal = () => {
    document.getElementById("myModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("closeBtn").click();
  };
  const handleAuctionDelete = async () => {
    try {
      await axiosSecure.delete(`/listings/${item._id}`);
      toast.success("Auction deleted.");
      closeModal();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className=" relative shadow-md p-2 rounded-xl overflow-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <Modal>
        <div>
          <h1 className="text-2xl">
            Are you sure you want to delete this auction?
          </h1>
          <span className="text-red-500 text-sm ">
            Note: This action cannot be reversed.
          </span>
          <div className="text-end space-x-4 mt-4">
            <Button clickFunc={handleAuctionDelete}>Delete</Button>
            <Button style={"bordered"} clickFunc={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      {placedIn === "dashboard" && singleUser?._id === item?.user?._id && (
        <div className="absolute  right-0 top-0 pr-2 z-30">
          <div className="flex items-center gap-3">
            <Link to={`/dashboard/editAuction/${item?._id}`} replace>
              <span className="cursor-pointer  px-3">
                <HiOutlinePencilSquare size={25} />
              </span>
            </Link>
            <span
              onClick={openModal}
              className="cursor-pointer   text-red-600 rounded-xl px-3"
            >
              <HiOutlineArchiveBoxXMark size={25} />
            </span>
          </div>
        </div>
      )}
      <Link to={`/auctions/${item?._id}`} preventScrollReset={true}>
        <div className="h-80 w-full  ">
          <img
            className="h-full w-full object-cover"
            src={item?.photoURL.at(0)}
            alt={`Image of ${item?.title}`}
            loading="lazy"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mt-1 px-1">
            <h1 className="text-xl font-semibold">{item?.title}</h1>
          </div>

          <div className="leading-5 mt-3 flex justify-between ">
            <div>
              <h1>{item?.highestBid ? "Current bid" : "Starting from"}</h1>
              <h1 className="text-xl">
                <span className="text-sm">$</span>
                {item?.highestBid || item?.startingPrice}
              </h1>
            </div>

            <h1>{calculateDays(item?.clossesIn, true)}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
