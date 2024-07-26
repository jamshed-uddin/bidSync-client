const CardSkeleton = ({ amount }) => {
  return (
    <div
      className="grid  
   grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  mt-5"
    >
      {[1, 2, 3, 4, 5, 6].slice(0, amount).map((item, index) => (
        <div key={index} className=" rounded-sm">
          <div className="h-52 lg:h-72 w-full skeleton bg-gray-200"></div>
          <div className="h-4 skeleton mt-3 mb-1 bg-gray-200"></div>
          <div className="h-4  skeleton bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
