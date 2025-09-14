import React from "react";
import { Link } from "react-router-dom";

const Hotels = ({ hotels }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-4">Recommended Hotels</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotels?.length > 0 &&
          hotels.map((hotel, index) => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${hotel?.hotelName} ${hotel?.hotelAddress}`
            )}`;

            return (
              <Link
                key={index + hotel.hotelName}
                to={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-white"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={hotel?.hotelImageUrl}
                    alt={hotel?.hotelName || "Hotel"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-base text-gray-800 line-clamp-1">
                    {hotel?.hotelName}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {hotel?.hotelAddress}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    💰 {hotel?.priceRangePerNight} per night
                  </p>
                  <p className="text-sm text-gray-600">
                    🌟 {hotel?.rating} stars
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Hotels;
