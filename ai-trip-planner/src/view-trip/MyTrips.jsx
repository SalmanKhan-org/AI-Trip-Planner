import TripCardSkeleton from '@/components/custom/TripCardSkeleton';
import UserTripCardItem from '@/components/custom/UserTripCardItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const MyTrips = () => {
    const [allTrips, setAllTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const fetchAllTrips = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/v1/trip/get/all`, {
                headers: {
                    'Authorization':`Bearer ${token}`
                }
            });
            if (response.data.success) {
                setAllTrips(response.data.alltrips);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchAllTrips();
    }, []);
    return (
      <div className="py-5 px-10 md:px-20 lg:px-44 xl:px-56">
        <h2 className="font-bold text-2xl ">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <TripCardSkeleton key={i} />
              ))
            : allTrips?.map((trip, index) => (
                <div
                  key={trip._id + index}
                  className="hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <UserTripCardItem trip={trip} />
                </div>
              ))
          }
        </div>
      </div>
    );
}

export default MyTrips
