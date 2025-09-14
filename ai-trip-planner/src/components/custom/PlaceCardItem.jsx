import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";

const PlaceCardItem = ({ place }) => {
  return (
    <div className="border rounded-lg p-3 flex flex-col sm:flex-row gap-3 hover:scale-[1.02] transition-all duration-300">
      <div className="w-full sm:w-[130px] h-[180px] sm:h-[130px] overflow-hidden rounded-lg">
        <img
          src={place?.placeImageUrl}
          alt={place?.placeName}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="font-bold text-lg line-clamp-1">{place?.placeName}</h2>
          <p className="line-clamp-3 text-sm text-gray-600 mt-1">
            {place?.placeDetails}
          </p>
        </div>
        <Link
          to={
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(place?.placeName)
          }
          target="_blank"
          rel="noopener noreferrer"
              >
          <Button size="sm" className="mt-2 w-fit">
            <FaMapLocationDot className="mr-2" />
            View on Map
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlaceCardItem;
