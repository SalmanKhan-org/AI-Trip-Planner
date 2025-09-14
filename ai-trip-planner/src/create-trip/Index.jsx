import React, { useState, useCallback, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { budgetOptions, travelerOptions } from "@/constants/options";
import { toast } from "sonner";
import { LoginDialog } from "@/components/custom/LoginDialog";
import { onGoogleLogin } from "@/helper/onGoogleLogin";
import { MyContext } from "@/helper/context";
import { useNavigate } from "react-router-dom";

const Index = () => {
  //   const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    location: "",
    totalDays: 0,
    budget: "",
    travelers: "",
  });
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { fetchUserData } = useContext(MyContext);
  const navigate = useNavigate();
  const suggestionsRef = useRef(); // ✅ Ref for suggestion dropdown

  // Debounce function to avoid lag
  let debounceTimer;
  const debounce = (func, delay = 500) => {
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (!value) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: value,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );
        setSuggestions(res.data);
      } catch (err) {
        toast.error("Error fetching suggestions", err);
      }
    }, 500),
    []
  );

  const handleOnChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onGenerateTrip = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLogin(true);
      return;
    }

    if (formData.totalDays > 5 || !formData.budget || !formData.travelers) {
      return toast.error("Please fill all the details");
    }

    try {
      setLoading(true);
      toast.success("Please wait! we are creating your trip");
      const response = await axios.post(
        `/api/v1/trip/generate`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setFormData({
          location: "",
          totalDays: 0,
          budget: "",
          travelers: "",
        });
        toast.success("Your trip has beep created");
        navigate(`/view-trip/${response.data?.itineraryId}`);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error in Generating trip");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]); // close suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <div>
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🏕️🌴
        </h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences
        </p>
      </div>

      <div className="mt-20 flex flex-col gap-6">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination choice?
          </h2>

          <Input
            type="text"
            value={formData.location}
            onChange={(e) => {
              handleOnChange("location", e.target.value);
              fetchSuggestions(e.target.value);
            }}
            placeholder="Search for a destination..."
          />

          {/* Suggestions (with ref) */}
          {suggestions.length > 0 && (
            <div ref={suggestionsRef}>
              <ul className="border border-gray-300 rounded mt-1 bg-white shadow-lg z-10 relative">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      handleOnChange("location", place.display_name);
                      setSuggestions([]);
                    }}
                  >
                    {place.display_name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning for the trip?
          </h2>
          <Input
            value={formData.totalDays}
            onChange={(e) => handleOnChange("totalDays", e.target.value)}
            placeholder="Ex. 3"
            type="number"
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {budgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOnChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer transition-shadow duration-300 ${
                  formData.budget === item.title
                    ? "shadow-md border-black"
                    : "hover:shadow-md"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {travelerOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOnChange("travelers", item.title)}
                className={`p-4 border rounded-lg cursor-pointer transition-shadow duration-300 ${
                  formData.travelers === item.title
                    ? "shadow-md border-black"
                    : "hover:shadow-md"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="my-5 flex justify-end">
          <button
            onClick={onGenerateTrip}
            disabled={loading}
            className={`leading-none flex items-center justify-center gap-2 px-4 py-3 bg-black text-white 
        hover:bg-black/80 rounded-sm transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 000 16v4l3.5-3.5L12 20v4a8 8 0 01-8-8z"
                ></path>
              </svg>
            )}
            {loading ? "Generating..." : "Generate Trip"}
          </button>
          <LoginDialog
            open={showLogin}
            onOpenChange={setShowLogin}
            onGoogleLogin={onGoogleLogin}
            fetchUserData={fetchUserData}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
