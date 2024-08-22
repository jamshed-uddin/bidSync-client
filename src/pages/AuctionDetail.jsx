import { useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import calculateDays from "../utils/calculateDays";
import Button from "../components/Button";
import DetailSkeleton from "../components/DetailSkeleton";

import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  HiOutlineBookmark,
  HiBookmark,
  HiChevronDown,
  HiXMark,
} from "react-icons/hi2";
import { SlMagnifierAdd } from "react-icons/sl";
import { AiOutlineSafety } from "react-icons/ai";
import { IoCardOutline } from "react-icons/io5";

import toast, { Toaster } from "react-hot-toast";
import useSaveUnsave from "../hooks/useSaveUnsave";
import useGetData from "../hooks/useGetData";
import WentWrong from "../components/WentWrong";
import useAuth from "../hooks/useAuth";
import useSingleUser from "../hooks/useSingleUser";
import ImageCarousel from "../components/ImageCarousel";

import ShareButtons from "../components/auctionDetails/ShareButtons";
import AuctionDescription from "../components/auctionDetails/AuctionDescription";
import calculateTime from "../utils/calculateTime";
import PriceAndBidButton from "../components/PriceAndBidButton";
import CustomModal from "../components/CustomModal";
const AuctionDetail = () => {
  const { id } = useParams();
  const { user, loading: userLoading } = useAuth();
  const { singleUser } = useSingleUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidPlaceLoading, setBidPlaceLoading] = useState(false);
  const [placedBidAmount, setPlacedBidAmount] = useState("");
  const [bidError, setBidError] = useState("");
  const { handleAuctionSaveUnsave, isSaved } = useSaveUnsave();
  const [isAuctionSaved, setIsAuctionSaved] = useState(
    user ? isSaved(id) : false
  );
  const [showAllBids, setShowAllBids] = useState(false);

  const {
    data: auction,
    isLoading: loading,
    error: auctionError,
  } = useGetData(`/listings/${id}`);
  const {
    data: bids,
    isLoading: bidsLoading,
    refetch: bidsRefetch,
  } = useGetData(`/bids/${id}`);

  const handleRedirect = async (redirectTo) => {
    navigate(`/${redirectTo}`, { state: { from: location } });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  //--------------

  const placeBidHandler = async () => {
    if (typeof placedBidAmount !== "number" || !placedBidAmount) {
      return setBidError("Please enter a valid amount.");
    } else if (
      placedBidAmount < (auction?.highestBid || auction?.startingPrice)
    ) {
      return setBidError(
        "Amount must be bigger than current bid and starting price."
      );
    }

    try {
      setBidPlaceLoading(true);
      await axiosSecure.post("/bids", {
        auctionId: auction?._id,
        amount: placedBidAmount,
        currentBidId: bids?.at(0)?._id,
      });
      closeModal();
      setBidPlaceLoading(false);
      toast.success("Bid placed");
      setPlacedBidAmount(null);
      bidsRefetch();
    } catch (error) {
      closeModal();
      toast.error("Something went wrong!");
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

      {/* place bid modal */}
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAfterClose={() => {
          setPlacedBidAmount("");
          setBidError("");
        }}
      >
        {user ? (
          <div className="">
            <div className="flex justify-end">
              <button onClick={closeModal} className="">
                <HiXMark size={25} />
              </button>
            </div>
            <div>
              <h1 className="font-semibold">
                {auction?.highestBid ? "Current bid" : "Starting from"}
              </h1>
              <h1 className="text-4xl font-semibold">
                <span className="text-sm">$</span>
                {auction?.highestBid || auction?.startingPrice}
              </h1>
              <h1 className="mt-1 font-semibold">{`Closses in: ${calculateDays(
                auction?.clossesIn
              )}`}</h1>
            </div>

            <div className="flex justify-between gap-4 mt-2">
              {[40, 70, 100].map((price, index) => (
                <div
                  key={index}
                  className="shadow-md p-2 rounded-xl flex-grow text-center cursor-pointer active:scale-95"
                  onClick={() => {
                    setPlacedBidAmount(
                      auction?.highestBid
                        ? auction?.highestBid + price
                        : auction?.startingPrice + price
                    );
                  }}
                >
                  $
                  {auction?.highestBid
                    ? auction?.highestBid + price
                    : auction?.startingPrice + price}
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center mt-5 ">
              <div className="flex-grow">
                <input
                  type="number"
                  placeholder="Enter a valid amount"
                  className="input input-sm rounded-none border-0 border-b-[1.2px] border-black  focus:border-black w-full  focus:outline-none bg-white text-lg"
                  name="amount"
                  value={placedBidAmount}
                  onChange={(e) => {
                    setBidError("");
                    setPlacedBidAmount(parseInt(e.target.value));
                  }}
                />
              </div>
              <div className="shrink-0 ">
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
              <span className="text-sm text-red-500 ">{bidError}</span>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-semibold">
              Login or register to place the bid.
            </h1>
            <div className="flex gap-2 justify-center  mt-4">
              <Button clickFunc={() => handleRedirect("login")}>Login</Button>
              <Button clickFunc={() => handleRedirect("signup")}>
                Register
              </Button>
              <Button clickFunc={closeModal} style={"bordered"}>
                Not now
              </Button>
            </div>
          </div>
        )}
      </CustomModal>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 relative">
        {/* image and title */}
        <div className=" overflow-hidden flex flex-col col-span-2 order-1">
          {/* title */}
          <div className=" mb-4 order-last md:order-first">
            {/* title, save */}
            <h1 className="text-3xl md:text-4xl font-semibold mb-1 flex justify-between items-center w-full">
              <span> {auction?.title}</span>

              <span
                onClick={handleSaveUnsave}
                className=" p-1 rounded-lg  cursor-pointer active:scale-95 "
              >
                {isAuctionSaved ? (
                  <HiBookmark size={25} />
                ) : (
                  <HiOutlineBookmark size={25} />
                )}
              </span>
            </h1>
            <h3 className="text-sm ">
              From{" "}
              <span className="font-semibold  text-base">
                {auction?.user?.name}
              </span>
            </h3>
          </div>

          {/* image */}
          <div className=" h-[55vh]  lg:h-[90vh] lg:sticky top-8  mb-5 lg:mb-0">
            <ImageCarousel images={auction?.photoURL} />
          </div>
        </div>

        {/* acution biding and other*/}
        <div className="sticky top-4 right-0  p-2 order-last md:order-2">
          {/* price and bid button */}
          <PriceAndBidButton
            auction={auction}
            openModal={() => setIsModalOpen(true)}
          />

          {/* bidders */}
          <div className="mt-4">
            <h4 className="mb-2 text-xl mt-8 font-semibold">Bid history</h4>
            <div className=" space-y-1">
              {bidsLoading ? (
                <h1>Bids loading...</h1>
              ) : bids?.length ? (
                bids?.slice(0, showAllBids ? bids?.length : 3).map((bid) => (
                  <div key={bid?._id}>
                    <h1 className="flex justify-between items-center ">
                      <span className="">{bid?.user?.name}</span>
                      <span className="text-sm font-normal">
                        {calculateTime(bid?.createdAt)}
                      </span>
                      <span>${bid?.amount}</span>
                    </h1>
                  </div>
                ))
              ) : (
                <h2>Be the first to bid.</h2>
              )}
            </div>
            {bids?.length > 3 && (
              <button
                onClick={() => setShowAllBids((p) => !p)}
                className=" font-semibold mt-4 flex items-end gap-1"
              >
                {showAllBids
                  ? "See fewer"
                  : `See all 
              (${bids?.length})`}{" "}
                <span
                  className={`transform-all duration-500 ${
                    showAllBids ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <HiChevronDown size={20} />
                </span>
              </button>
            )}
          </div>

          {/* buyers protection */}
          <div className="mt-6   rounded-xl text-sm">
            <h2 className="text-xl mb-1 font-semibold">
              BidSync buyers protection
            </h2>

            <ul className="  text-lg ">
              <li className="flex items-center gap-2">
                <IoCardOutline /> Your payment is safe
              </li>
              <li className="flex items-center gap-2">
                <SlMagnifierAdd /> All objects are quality checked
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineSafety /> All sellers are verified
              </li>
            </ul>
          </div>

          {/*share buttons            */}

          <div className="mt-6">
            <ShareButtons />
          </div>
        </div>

        {/* auction description */}
        <div className="col-span-2 order-3 md:order-3 flex flex-col ">
          {/* description and others */}
          <AuctionDescription auction={auction} />
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
