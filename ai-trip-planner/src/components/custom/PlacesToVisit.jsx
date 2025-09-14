import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ places }) => {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl mb-4">📍 Places to Visit</h2>

      {places && places.length > 0 ? (
        places.map((itinerary, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Day {index + 1}: {itinerary?.theme}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {itinerary?.activities?.map((activity, idx) => (
                <div key={idx}>
                  <p className="text-sm text-orange-500 mb-1">
                    🕒 {activity?.timeToVisit}
                  </p>
                  <PlaceCardItem place={activity} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No places found in this itinerary.</p>
      )}
    </div>
  );
};

export default PlacesToVisit;
