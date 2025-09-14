require("dotenv").config({path:".env"});
const axios = require("axios");

const PEXELS_API_KEY = process.env.PIXELS_API_KEY;
const PEXELS_API_URL = "https://api.pexels.com/v1/search";

const headers = {
  Authorization: PEXELS_API_KEY,
};

// Fallback images
const FALLBACKS = {
  location:
    "https://foundtheworld.com/wp-content/uploads/2014/04/Taj-Mahal-1-1.jpg",
  hotel:
    "https://tse1.mm.bing.net/th/id/OIP.2RJq1z8CwKjmvrA3ZG7cDAHaDo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  place:
    "https://tse1.mm.bing.net/th/id/OIP.vniPJnp2FZSkVoUZn7uGNAHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
};

// Helper: Get image from Pexels
async function fetchPexelsImage(query) {
  try {
    const response = await axios.get(PEXELS_API_URL, {
      headers,
      params: {
        query,
        per_page: 1,
      },
    });

    const photo = response.data.photos[0];
    return photo ? photo.src.large : null;
  } catch (error) {
    return null;
  }
}

// Main function: Enhance image URLs with fallbacks
async function enhanceItineraryImages(itinerary) {
  const updated = { ...itinerary };

  // 1. Main location image
  const locationImage = await fetchPexelsImage(updated.location);
  updated.imageUrl = locationImage || FALLBACKS.location;

  // 2. Hotels
  if (Array.isArray(updated.hotels)) {
    for (let hotel of updated.hotels) {
      const query = `${hotel.hotelName} ${updated.location}`;
      const image = await fetchPexelsImage(query);
      hotel.hotelImageUrl = image || FALLBACKS.hotel;
    }
  }

  // 3. Activities (per day)
  if (Array.isArray(updated.itinerary)) {
    for (let day of updated.itinerary) {
      if (Array.isArray(day.activities)) {
        for (let activity of day.activities) {
          const query = `${activity.placeName} ${updated.location}`;
          const image = await fetchPexelsImage(query);
          activity.placeImageUrl = image || FALLBACKS.place;
        }
      }
    }
  }

  return updated;
}

module.exports = { enhanceItineraryImages };
