import Button from "./Button";
import calculateDays from "../utils/calculateDays";
import useSingleUser from "../hooks/useSingleUser";
import { Link } from "react-router-dom";

const PriceAndBidButton = ({ auction, openModal }) => {
  const { singleUser } = useSingleUser();

  const {
    status,
    user,
    highestBid,
    highestBidder,
    startingPrice,
    clossesIn,
    paymentDeadline,
    _id,
  } = auction || {};

  const isSeller = user?._id === singleUser?._id;
  const isWinner = highestBidder === singleUser?._id;

  // Determine auction message
  const auctionMessage = (() => {
    switch (status) {
      case "active":
        return `Closes in: ${calculateDays(clossesIn)}`;
      case "completed":
        return isWinner
          ? `Payment Deadline: ${calculateDays(paymentDeadline)}`
          : "Auction closed";
      case "expired":
      case "unpaid":
        return isSeller
          ? "Auction expired or unpaid. Relist the auction."
          : "Auction closed";
      case "shipped":
        return "Shipping in progress";
      case "delivered":
        return "Item is delivered";
      default:
        return "";
    }
  })();

  // Determine button action
  const renderActionButton = () => {
    if (status === "active") {
      return <Button clickFunc={openModal}>Place bid</Button>;
    }
    if (status === "completed" && isWinner) {
      return (
        <Link to={`/dashboard/checkout/${_id}`}>
          <Button>Checkout</Button>
        </Link>
      );
    }
    if ((status === "expired" || status === "unpaid") && isSeller) {
      return (
        <Link to={`/dashboard/auction/${_id}`}>
          <Button>Relist</Button>
        </Link>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-between items-end mt-6 fixed md:static bottom-0 right-0 left-0 bg-white z-40 p-3 md:p-0 border-t md:border-t-0 border-gray-300">
      <div>
        <h1 className="font-semibold">
          {status === "active"
            ? highestBid
              ? "Current bid"
              : "Starting from"
            : "Final bid"}
        </h1>
        <h1 className="text-4xl font-semibold">
          <span className="text-sm">$</span>
          {highestBid || startingPrice}
        </h1>
        <h1 className="mt-1 font-semibold">{auctionMessage}</h1>
      </div>
      {renderActionButton()}
    </div>
  );
};

export default PriceAndBidButton;
