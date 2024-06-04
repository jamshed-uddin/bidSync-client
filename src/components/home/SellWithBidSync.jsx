import { Link } from "react-router-dom";
import art from "../../assets/art.jpg";
import Title from "../Title";
import Button from "../Button";

const SellWithBidSync = () => {
  return (
    <div className="lg:flex gap-3 items-center space-y-3 lg:space-y-0">
      <div className="lg:h-[60vh]  lg:w-1/2 bg-gray-100 p-4 rounded-2xl">
        <div className="h-full w-full">
          <img
            className="w-full h-full object-cover"
            src={art}
            alt="Image of art work on sell with bid sync"
            loading="lazy"
          />
        </div>
      </div>
      <div className=" lg:w-1/2">
        <Title>Sell with BidSync</Title>
        <p className="text-2xl lg:mt-4 mt-2">
          Sell worry free with commited buyers, binding bids and a secure
          payment system.Over 10 million buyers around the world are waiting for
          your special object .Our experts make sure you special object is ready
          to sell for a great price.
        </p>
        <div className="mt-3">
          <Link to={"/dashboard/createAuction"}>
            <Button>Start selling</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellWithBidSync;
