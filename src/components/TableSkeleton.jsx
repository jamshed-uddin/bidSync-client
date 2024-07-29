import React from "react";

const TableSkeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full skeleton bg-gray-200 h-12 rounded-lg mb-4"></div>
      <div className="w-full skeleton bg-gray-200 h-10 rounded-lg mb-3"></div>
      <div className="w-full skeleton bg-gray-200 h-10 rounded-lg mb-3"></div>
      <div className="w-full skeleton bg-gray-200 h-10 rounded-lg mb-3"></div>
    </div>
  );
};

export default TableSkeleton;
