import React from "react";

const TripInfoSkeleton = () => {
  return (
    <div className="w-full animate-pulse space-y-4">
      {/* Image Placeholder */}
      <div className="w-full h-[240px] sm:h-[300px] md:h-[340px] bg-gray-300 rounded-xl"></div>

      {/* Header Placeholder */}
      <div className="flex justify-between items-start mt-4 gap-3">
        {/* Left side: Title & Tags */}
        <div className="flex flex-col gap-2 flex-1">
          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-3/5"></div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
            <div className="h-6 bg-gray-300 rounded-full w-16"></div>
            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
          </div>
        </div>

        {/* Right side: Button */}
        <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
      </div>

      {/* Notes Placeholder */}
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default TripInfoSkeleton;
