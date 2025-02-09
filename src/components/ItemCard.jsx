/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import calculateDays from "../utils/calculateDays";

const ItemCard = ({ item }) => {
  return (
    <div className=" overflow-hidden">
      {/* auction card */}
      <Link to={`/listings/${item?._id}`} preventScrollReset={true}>
        <div className="h-52 lg:h-72 w-full  overflow-hidden">
          <img
            className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
            src={item?.photoURL?.at(0).url}
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

export default ItemCard;
