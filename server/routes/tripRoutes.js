const express = require("express");
const { getAiResponse } = require("../utils/getAiResponse");
const Itinerary = require("../models/itineraryModel");
const { authenticateUser } = require("../middleware/authToken");
const { default: axios } = require("axios");
const { enhanceItineraryImages } = require("../utils/enhanceImages");
const router = express.Router();

router.post("/generate",authenticateUser, async (req, res) => {
  const { location, totalDays, travelers, budget } = req.body;

const finalPrompt = `
Generate a travel itinerary for:
- location: ${location}
- duration: ${totalDays}
-travelers: ${travelers}
- budget: ${budget}

Return STRICT JSON in this exact structure:

{
  "location": "City, State, Country",
  "duration": "X Days",
  "travelers": "Couple | Solo | Family | Friends",
  "budget": "cheap | Moderate | Luxury",
  - imageUrl: "A relevant image URL of the location
  "notes": "Important notes about pricing, seasons, etc.",
  "hotels": [
    {
      "hotelName": "...",
      "hotelAddress": "...",
      "priceRangePerNight": "...",
      "hotelImageUrl": "...",
      "geoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": 0,
      "description": "..."
    }
  ],
  "itinerary": [
    {
      "dayNumber": 1,
      "theme": "Day Theme",
      "activities": [
        {
          "placeName": "...",
          "placeDetails": "...",
          "placeImageUrl": "...",
          "geoCoordinates": {
            "latitude": 0.0,
            "longitude": 0.0
          },
          "ticketPricing": "...",
          "timeToVisit": "09:00 - 12:00",
          "bestTimeToVisit": "09:00 - 12:00"
        }
      ]
    }
  ]
}

Rules:
- Do NOT wrap the result in any outer key like "lasVegasTravelPlan".
- Field names must exactly match this structure.
- All image URLs must be real (use Unsplash or Wikimedia).
- Times must be in format "HH:mm PM - HH:mm AM 12-hour"
- Output ONLY the JSON. No explanation, no markdown.
- price format should  be as per country like $1200 - $1400 for USA
- hotels should be greater than 3 to 4 
`;



try {
  // 1. Call AI to get JSON response
  const rawAiResponse = await getAiResponse(finalPrompt);

  // 2. Clean and parse JSON
  const cleanJson = rawAiResponse
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const itineraryJson = JSON.parse(cleanJson);

  // 3. Replace placeholder image URLs using Pexels
  const enhancedItinerary = await enhanceItineraryImages(itineraryJson);

  // 4. Save to MongoDB
    const savedItinerary = new Itinerary(enhancedItinerary);
    savedItinerary.userId = req.user._id;
  await savedItinerary.save();

  // 5. Return response
  res.status(200).json({
    success: true,
    message: "Itinerary generated and saved successfully.",
    itineraryId: savedItinerary._id,
    itinerary: savedItinerary,
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Failed to generate itinerary.",
    error: error.message,
  });
}
});




router.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const trip = await Itinerary.findById(id);
        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found"
            });
        }

        res.status(200).json({
            success: true,
            trip
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in getting Trip",
            error:error.message
        })
    }
})

router.get('/get/all',authenticateUser, async (req, res) => {
    try {
        const userId = req.user._id;
        const alltrips = await Itinerary.find({userId});
        if (alltrips.length == 0) {
            return res.status(404).json({
                success: false,
                message:"You do not have Trips Yet"
            })
        }

        res.status(200).json({
            success: true,
            alltrips
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
})




module.exports = router;