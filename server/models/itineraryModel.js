const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  placeName: String,
  placeDetails: String,
  placeImageUrl: String,
  geoCoordinates: {
    latitude: Number,
    longitude: Number,
  },
  ticketPricing: String,
  timeToVisit: String,
  bestTimeToVisit: String, // should be like "09:00 - 12:00"
});

const DaySchema = new mongoose.Schema({
  dayNumber: Number, // updated from 'day'
  theme: String,
  activities: [PlaceSchema], // Embedded array of places
});

const HotelSchema = new mongoose.Schema({
  hotelName: String,
  hotelAddress: String,
  priceRangePerNight: String,
  hotelImageUrl: String,
  geoCoordinates: {
    latitude: Number,
    longitude: Number,
  },
  rating: Number,
  description: String,
});

const ItinerarySchema = new mongoose.Schema(
  {
    location: String,
    duration: String, // updated from 'duration'
    travelers: String,
    budget: String, // updated from 'budget'
    imageUrl: String,
    notes: String, // new field added
    hotels: [HotelSchema], // renamed from 'hotelOptions'
    itinerary: [DaySchema],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Itinerary = mongoose.model("Itinerary", ItinerarySchema);

module.exports = Itinerary;
