import React from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../ui/button";
import { toast } from "sonner";

const TripInfo = ({ trip }) => {
    const handleShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: `Trip to ${trip?.location}`,
            text: `Check out this trip to ${trip?.location}!`,
            url: window.location.href, // current page URL
          })
          .then(() => toast.success("Trip shared successfully"))
          .catch((error) => toast.error("Error sharing:", error));
      } else {
        // fallback for unsupported browsers: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
          toast.success("Trip URL copied to clipboard!");
        });
      }
    };
  return (
    <div className="w-full">
      {/* Main Image */}
      <img
        src={trip?.imageUrl}
        alt="Famous Place"
        className="w-full h-[240px] sm:h-[300px] md:h-[340px] object-cover rounded-xl"
      />

      {/* Trip Header */}
      <div className="flex  justify-between items-start  mt-4 gap-3">
        {/* Left: Title & Tags */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-black">{trip?.location}</h2>

          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-gray-200 text-sm rounded-full font-medium text-gray-600">
              📅 {trip?.duration}
            </span>
            <span className="px-3 py-1 bg-gray-200 text-sm rounded-full font-medium text-gray-600">
              💰 {trip?.budget}
            </span>
            <span className="px-3 py-1 bg-gray-200 text-sm rounded-full font-medium text-gray-600">
              👬 Travelers: {trip?.travelers}
            </span>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="self-start sm:self-auto">
          <Button className="gap-1" onClick={handleShare}>
            <IoIosSend className="text-lg" />
            Share
          </Button>
        </div>
      </div>

      {/* Notes */}
      {trip?.notes && (
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          {trip.notes}
        </p>
      )}
    </div>
  );
};

export default TripInfo;
