import React from "react";

const TripCardSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="h-48 bg-gray-300 rounded-xl mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default TripCardSkeleton;
