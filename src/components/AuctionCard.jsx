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

const AuctionCard = ({ item, placedIn }) => {
  const handleAuctionDelete = async () => {};

  const openModal = () => {
    document.getElementById("myModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("closeBtn").click();
  };
  return (
    <div className=" relative shadow-md p-2 rounded-xl overflow-hidden">
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
      {placedIn === "dashboard" && (
        <div className="absolute  right-0 top-2 pr-2 z-30">
          <div className="flex gap-3">
            <Link to={`/dashboard/editAuction/${item._id}`} replace>
              <span className="cursor-pointer border-[1.3px] border-black rounded-xl px-3 flex items-center gap-1">
                <HiOutlinePencilSquare />
                <span>Edit</span>
              </span>
            </Link>
            <span
              onClick={openModal}
              className="cursor-pointer flex items-center gap-1 border-[1.3px] text-red-600 border-red-600 rounded-xl px-3"
            >
              <HiOutlineArchiveBoxXMark /> <span>Delete</span>
            </span>
          </div>
        </div>
      )}
      <Link to={`/auctions/${item._id}`} preventScrollReset={true}>
        <div className="h-80 w-full  ">
          <img
            className="h-full w-full object-cover"
            src={item?.photoURL}
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

            <h1>{calculateDays(item.clossesIn, true)}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AuctionCard;
