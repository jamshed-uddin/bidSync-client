import React from "react";
import Button from "./Button";
import calculateDays from "../utils/calculateDays";
import useSingleUser from "../hooks/useSingleUser";
import { Link } from "react-router-dom";

const PriceAndBidButton = ({ auction, openModal }) => {
  const { singleUser } = useSingleUser();

  const isAuctionActive = auction?.status === "active";
  const isSeller = auction?.user?._id === singleUser?._id;
  const isWinner = auction?.highestBidder === singleUser?._id;
  const auctionCompleted = auction?.status === "completed";
  const auctionUnpaidOrExpired =
    auction?.status === "expired" || auction?.status === "unpaid";

  return (
    <div className=" flex justify-between items-end mt-6 fixed md:static  bottom-0 right-0 left-0 bg-white z-40 p-3 md:p-0   border-t md:border-t-0  border-gray-300">
      <div>
        <h1 className="font-semibold">
          {auction?.status === "active"
            ? auction?.highestBid
              ? "Current bid"
              : "Starting from"
            : "Final bid"}
        </h1>
        <h1 className="text-4xl font-semibold">
          <span className="text-sm">$</span>
          {auction?.highestBid || auction?.startingPrice}
        </h1>
        <h1 className="mt-1 font-semibold">
          {/* auction is active to bid */}
          {isAuctionActive &&
            `Closses in: ${calculateDays(auction?.clossesIn)}`}

          {/* auction is complete with a highest bidder(winner) */}
          {auctionCompleted &&
            isWinner &&
            `Payment Deadline: ${calculateDays(auction?.paymentDeadline)}`}

          {/* auction is expired or unpaid */}
          {auctionUnpaidOrExpired &&
            isSeller &&
            "Auction expired or unpaid.Relist the auction."}

          {!isAuctionActive && !isSeller && !isWinner && "Auction closed"}

          {auction?.status === "shipped" && "Shipping in progress"}
          {auction?.status === "delivered" && "Item is delivered"}
        </h1>
      </div>

      {/* bid / checkout / relist button */}
      {isAuctionActive && (
        <div>
          <Button clickFunc={openModal}>Place bid</Button>
        </div>
      )}

      {auctionCompleted && isWinner && (
        <div>
          <Link to={`/dashboard/checkout/${auction?._id}`}>
            <Button>Checkout</Button>
          </Link>
        </div>
      )}
      {auctionUnpaidOrExpired && isSeller && (
        <div>
          <Link to={`/dashboard/auction/${auction?._id}`}>
            <Button>Relist</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PriceAndBidButton;
