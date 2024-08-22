import React from "react";

const MetricCard = ({ name, amount }) => {
  return (
    <div className="  p-3 flex-grow">
      <div className=" p-6 text-2xl lg:text-3xl">{amount}</div>
      <h4 className="text-xl  ">{name}</h4>
    </div>
  );
};

export default MetricCard;
