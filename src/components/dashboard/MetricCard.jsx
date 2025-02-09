const MetricCard = ({ name, amount }) => {
  return (
    <div className="  px-3 pt-6 flex-grow bg-white border border-gray-300 rounded-xl transition-shadow hover:shadow-md duration-300">
      <div className="  text-2xl lg:text-3xl mb-2">{amount}</div>
      <h4 className="">{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
    </div>
  );
};

export default MetricCard;
