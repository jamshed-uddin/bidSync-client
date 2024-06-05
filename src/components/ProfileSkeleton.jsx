const ProfileSkeleton = () => {
  return (
    <div className="flex justify-center mt-10 ">
      <div className="mb-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full skeleton bg-gray-200 "></div>
        <div className="h-6 w-48 skeleton bg-gray-200 mt-3 mb-1 "></div>
        <div className="h-4 w-[70%] skeleton bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
