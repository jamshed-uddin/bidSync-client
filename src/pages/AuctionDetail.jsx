import { useState } from "react";
import { useParams } from "react-router-dom";

import calculateDays from "../utils/calculateDays";
import Button from "../components/Button";
import DetailSkeleton from "../components/DetailSkeleton";
import Modal from "../components/Modal";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { HiOutlineBookmark } from "react-icons/hi2";
import { HiBookmark } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";

import toast, { Toaster } from "react-hot-toast";
import useSaveUnsave from "../hooks/useSaveUnsave";
import useGetData from "../hooks/useGetData";
import WentWrong from "../components/WentWrong";
import useAuth from "../hooks/useAuth";
const AuctionDetail = () => {
  const { id } = useParams();
  const { user, loading: userLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [bidPlaceLoading, setBidPlaceLoading] = useState(false);
  const [placedBidAmount, setPlacedBidAmount] = useState(null);
  const [bidError, setBidError] = useState("");
  const { handleAuctionSaveUnsave, isSaved } = useSaveUnsave();
  const [isAuctionSaved, setIsAuctionSaved] = useState(
    user ? isSaved(id) : false
  );
  const [photoIndex, setPhotoIndex] = useState(0);

  const openModal = () => {
    document.getElementById("myModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("closeBtn").click();
  };
  const {
    data: auction,
    isLoading: loading,
    error: auctionError,
  } = useGetData(`/listings/${id}`);
  const { data: bids, isLoading: bidsLoading } = useGetData(`/bids/${id}`);

  const placeBidHandler = async () => {
    if (typeof placedBidAmount !== "number") {
      setBidError("Please input valid amount.");
    } else if (
      placedBidAmount < auction?.startingPrice ||
      auction?.highestBid
    ) {
      setBidError("Amount must be bigger than current bid and starting price.");
    }

    try {
      setBidPlaceLoading(true);
      await axiosSecure.post("/bids", {
        auctionId: auction?._id,
        amount: placedBidAmount,
      });
      closeModal();
      setBidPlaceLoading(false);
      toast.success("Bid placed");
    } catch (error) {
      toast.success("Something went wrong!");
      setBidPlaceLoading(false);
    }
  };

  const handleSaveUnsave = () => {
    if (!user && !userLoading) {
      return toast.error("Please login to save auction");
    }

    toast(isAuctionSaved ? "Auction unsaved" : "Auction saved");
    setIsAuctionSaved((p) => !p);
    handleAuctionSaveUnsave(id, isAuctionSaved ? false : true);
  };

  if (loading) {
    return <DetailSkeleton />;
  }

  if (auctionError) {
    return <WentWrong />;
  }
  return (
    <div className=" min-h-[calc(100vh-6rem)] mt-3">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <Modal>
        <div className="  mt-6">
          <div>
            <h1>{auction?.highestBid ? "Current bid" : "Starting from"}</h1>
            <h1 className="text-4xl font-semibold">
              <span className="text-sm">$</span>
              {auction?.highestBid || auction?.startingPrice}
            </h1>
            <h1 className="mt-1">{calculateDays(auction?.clossesIn)}</h1>
          </div>

          <div className="flex justify-between gap-4 mt-2">
            {[40, 70, 100].map((price, index) => (
              <div
                key={index}
                className="border-[1px] border-black p-2 rounded-xl flex-grow text-center cursor-pointer active:scale-95"
                onClick={() => {
                  setPlacedBidAmount(
                    auction?.highestBid
                      ? auction?.highestBid + price
                      : auction?.startingPrice + price
                  );
                }}
              >
                {auction?.highestBid
                  ? auction?.highestBid + price
                  : auction?.startingPrice + price}
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center mt-3 ">
            <div className="flex-grow">
              <input
                type="number"
                placeholder=""
                className="input  input-bordered w-full  focus:outline-none"
                name="amount"
                value={placedBidAmount}
                onChange={(e) => {
                  setBidError("");
                  setPlacedBidAmount(parseInt(e.target.value));
                }}
              />
            </div>
            <div>
              <Button
                isLoading={bidPlaceLoading}
                disabled={bidPlaceLoading}
                clickFunc={placeBidHandler}
              >
                Place bid
              </Button>
            </div>
          </div>
          {bidError && (
            <span className="text-sm text-red-500 font-light">{bidError}</span>
          )}
        </div>
      </Modal>
      <div className="md:flex   gap-5 relative">
        {/* image */}
        <div className="md:w-1/2 shrink-0 overflow-hidden  h-screen lg:sticky top-8">
          <div className="h-full w-full overflow-hidden relative">
            {auction?.photoURL.map((photo, index) => (
              <img
                key={index}
                className={`h-full w-full object-cover transition-opacity absolute duration-500 ${
                  photoIndex === index ? "opacity-100" : "opacity-0"
                }`}
                src={photo}
                alt={`Image of ${auction?.title}`}
                loading="lazy"
              />
            ))}
            {auction?.photoURL.length > 1 && (
              <>
                <span
                  onClick={() => setPhotoIndex((p) => p + 1)}
                  className={`absolute top-1/2  bg-white py-1 rounded-xl right-1 -translate-y-1/2 ${
                    photoIndex + 1 === auction?.photoURL.length
                      ? "hidden"
                      : "absolute"
                  }`}
                >
                  <FaChevronRight size={25} />
                </span>
                <span
                  onClick={() => setPhotoIndex((p) => p - 1)}
                  className={` top-1/2  bg-white py-1 rounded-xl left-1 -translate-y-1/2 ${
                    photoIndex === 0 ? "hidden" : "absolute"
                  }`}
                >
                  <FaChevronLeft size={25} />
                </span>
              </>
            )}
            <span
              onClick={handleSaveUnsave}
              className="absolute top-5 right-5 p-1 rounded-lg bg-white cursor-pointer active:scale-95 shadow-xl"
            >
              {isAuctionSaved ? (
                <HiBookmark size={25} />
              ) : (
                <HiOutlineBookmark size={25} />
              )}
            </span>
          </div>
        </div>

        {/* product details*/}
        <div className=" md:w-1/2 space-y-8">
          <div>
            <h1 className="text-4xl font-semibold mb-3">{auction?.title}</h1>
            <h3 className="">
              From <span className="font-light">{auction?.user?.name}</span>
            </h3>
          </div>

          {/* price and bid button */}

          <div className=" flex justify-between items-end mt-6">
            <div>
              <h1>{auction?.highestBid ? "Current bid" : "Starting from"}</h1>
              <h1 className="text-4xl font-semibold">
                <span className="text-sm">$</span>
                {auction?.highestBid || auction?.startingPrice}
              </h1>
              <h1 className="mt-1">{calculateDays(auction?.clossesIn)}</h1>
            </div>
            {calculateDays(auction?.clossesIn) !== "Auction closed" && (
              <div>
                <Button clickFunc={openModal}>Place bid</Button>
              </div>
            )}
          </div>

          {/* bidders */}
          <div className="mt-4">
            <div className="divider divider-start text-xl mt-8">
              Bid history
            </div>
            <div>
              {bidsLoading ? (
                <h1>Bids loading...</h1>
              ) : bids?.length ? (
                bids?.map((bid) => (
                  <div key={bid?._id}>
                    <h1 className="flex justify-between items-center ">
                      <span>{bid?.user?.name}</span>
                      <span>${bid?.amount}</span>
                    </h1>
                  </div>
                ))
              ) : (
                <h2>Be the first to bid.</h2>
              )}
            </div>
          </div>

          {/* description and others */}
          <div>
            <h2 className="mt-4 text-xl">Description</h2>
            <p className="text-xl  font-light">{auction?.description}</p>
          </div>

          {/* buys protection */}
          <div className="mt-6 border-[1px] border-black p-2 rounded-xl text-sm">
            <h2 className="text-xl mb-1">BidSync buys protection</h2>

            <ul className="list-disc ml-5">
              <li>Your payment is safe</li>
              <li>All objects are quality checked</li>
              <li>All sellers are verified</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
