// main.jsx
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyContext } from "./helper/context";
import axios from "axios";
import ViewTrip from "./view-trip";
import Layout from "./components/custom/Layout";
import MyTrips from "./view-trip/MyTrips";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Index from "./create-trip/Index";
import { toast } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, // <-- shared layout
    children: [
      { index: true, element: <App /> },
      { path: "create-trip", element: <Index/>},
      { path: "view-trip/:tripId", element: <ViewTrip /> },
      {path:'my-trips',element:<MyTrips/>}
    ],
  },
]);


export function RootProvider() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserData(null);
      return;
    }

    try {
      const response = await axios.get(
        `/api/v1/user/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data?.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch user");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <MyContext.Provider value={{ userData, setUserData, fetchUserData }}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}


createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <RootProvider />
  </ErrorBoundary>
);
