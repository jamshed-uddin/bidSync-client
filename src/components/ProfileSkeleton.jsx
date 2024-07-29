const ProfileSkeleton = () => {
  return (
    <div className="flex mt-10 items-center gap-4">
      <div className="w-24 h-24 rounded-full skeleton bg-gray-200 "></div>
      <div className="space-y-2">
        <div className="h-6 w-48 skeleton bg-gray-200 mt-3 mb-1 "></div>
        <div className="h-4 w-[70%] skeleton bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
