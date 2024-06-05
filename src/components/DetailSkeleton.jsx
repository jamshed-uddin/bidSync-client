const DetailSkeleton = () => {
  return (
    <div className="h-screen lg:flex gap-5 space-y-8 lg:space-y-0">
      <div className="skeleton h-[60%] lg:h-[80%] lg:w-1/2 shrink-0 bg-gray-200"></div>
      <div className="lg:w-1/2 shrink-0 ">
        <div className="w-full skeleton bg-gray-200 h-10 rounded-2xl mb-4"></div>
        <div className="w-full skeleton bg-gray-200 h-6 rounded-2xl mb-3"></div>
        <div className="w-full skeleton bg-gray-200 h-6 rounded-2xl mb-3"></div>
        <div className="w-full skeleton bg-gray-200 h-6 rounded-2xl mb-3"></div>
      </div>
    </div>
  );
};

export default DetailSkeleton;
