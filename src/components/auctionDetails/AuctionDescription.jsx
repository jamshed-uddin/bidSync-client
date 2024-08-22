import React from "react";

const AuctionDescription = ({ auction }) => {
  return (
    <div>
      <h2 className="mt-4 font-semibold text-xl">Description</h2>
      <p className="text-lg">{auction?.description}</p>
    </div>
  );
};

export default AuctionDescription;
