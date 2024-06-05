const CardSkeleton = ({ amount }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10  mt-5">
      {[1, 2, 3, 4, 5, 6].slice(0, amount).map((item, index) => (
        <div key={index} className="h-80 rounded-sm">
          <div className="h-[90%] skeleton bg-gray-200"></div>
          <div className="h-4 skeleton mt-3 mb-1 bg-gray-200"></div>
          <div className="h-4 w-[70%] skeleton bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
