# NeuroTrip: AI Trip Planner Web App

NeuroTrip is an AI-powered trip planner web application that helps users effortlessly create personalized trips based on their preferences such as location, number of days, number of people, and budget. By leveraging the Gemini API and the Pexels API, NeuroTrip generates detailed daily itineraries, complete with recommended activities and hotels, along with beautiful images for each destination.

## ✨ Features

- **Personalized Trip Generation:**  
  Enter your desired location, number of days, group size, and budget—NeuroTrip does the rest!
- **AI-Powered Recommendations:**  
  Utilizes the Gemini API to curate the best destinations, activities, and hotels tailored to your requirements.
- **Visual Experience:**  
  Fetches high-quality images for places and hotels using the Pexels API to make your planning more engaging.
- **Day-by-Day Itinerary:**  
  Get a detailed plan for each day of your trip, including suggested activities and accommodations.
- **Budget-Friendly Options:**  
  Recommends hotels and activities that fit your budget and group size, streamlining your travel planning process.

## 🛠️ Technologies Used

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **APIs:** Gemini API (for itinerary and recommendations), Pexels API (for images)
- **Other:** RESTful architecture, responsive design

## 🚀 How It Works

1. **Input Preferences:**  
   Provide your trip preferences—location, trip duration, number of travelers, and your budget.
2. **AI Trip Generation:**  
   NeuroTrip uses the Gemini API to generate a tailored itinerary, selecting the best places, activities, and hotels.
3. **Visual Enhancement:**  
   The Pexels API enriches your trip plan with beautiful images of destinations and accommodations.
4. **Review & Enjoy:**  
   View your day-by-day plan and recommended hotels, then get ready for a stress-free vacation!


## 📝 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SalmanKhan-org/NeuroTrip-Ai-Trip-Planner.git
   cd NeuroTrip-Ai-Trip-Planner
   ```
2. **Install dependencies:**
   ```bash
   # For backend
   cd server
   npm install

   # For frontend
   cd ../ai-trip-planner
   npm install
   ```
3. **Configure Environment Variables:**
   - Create `.env` files in both backend and frontend directories.
   - Add your Gemini API key, Pexels API key, and MongoDB connection string.

4. **Run the application:**
   ```bash
   # Start backend
   cd server
   npm start

   # Start frontend (in a new terminal)
   cd ../ai-trip-planner
   npm start
   ```

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.


> NeuroTrip takes the headache out of travel planning—let AI create your perfect trip!
