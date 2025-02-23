import { Link } from "react-router-dom";
import art from "../../assets/art.jpg";
import Title from "../Title";
import Button from "../Button";

const SellWithBidSync = () => {
  return (
    <div className="lg:flex gap-3 items-center space-y-3 lg:space-y-0 py-6">
      <div className="lg:h-[60vh]  lg:w-1/2 ">
        <div className="h-full w-full overflow-hidden">
          <img
            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
            src={art}
            alt="Image of art work on sell with bid sync"
            loading="lazy"
          />
        </div>
      </div>
      <div className=" lg:w-1/2">
        <Title>Sell with BidSync</Title>
        <p className="text-lg lg:mt-4 mt-2">
          Sell worry free with commited buyers, binding bids and a secure
          payment system.Over 10 million buyers around the world are waiting for
          your special object. Our experts make sure you special object is ready
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
