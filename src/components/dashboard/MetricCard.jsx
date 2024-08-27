import React from "react";

const MetricCard = ({ name, amount }) => {
  return (
    <div className="  px-3 pt-6 flex-grow bg-white rounded-xl">
      <div className="  text-2xl lg:text-3xl mb-2">{amount}</div>
      <h4 className="">{name}</h4>
    </div>
  );
};

export default MetricCard;
