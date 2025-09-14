import React from "react";

const HotelsSkeleton = ({ count = 8 }) => {
  // count: number of skeleton cards to show (default 8)

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4 bg-gray-300 rounded w-48 h-7 animate-pulse"></h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="block rounded-xl shadow-md overflow-hidden bg-white"
          >
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-300 animate-pulse"></div>

            {/* Text container */}
            <div className="p-3 space-y-2">
              {/* Hotel Name */}
              <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>

              {/* Address */}
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>

              {/* Price */}
              <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse mt-2"></div>

              {/* Rating */}
              <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsSkeleton;
