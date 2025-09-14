import React from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  return (
    <Link to={`/view-trip/${trip?._id}`} className="block max-w-sm">
      <div className="w-full h-48 overflow-hidden rounded-xl">
        <img
          src={trip?.imageUrl}
          alt={trip?.location || "Trip Image"}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="mt-1">
        <h2 className="font-bold text-lg text-black/80">{trip?.location}</h2>
        <p className="text-sm text-gray-500">
          {trip?.duration} {trip?.travelers} trip with {trip?.budget} Budget
        </p>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
