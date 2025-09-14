import Footer from '@/components/custom/Footer';
import Hotels from '@/components/custom/Hotels';
import HotelsSkeleton from '@/components/custom/HotelsSkeleton';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import TripInfo from '@/components/custom/TripInfo';
import TripInfoSkeleton from '@/components/custom/TripInfoSkeleton';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';

const ViewTrip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState();
    const [loading, setLoading] = useState(false);

    const getTrip = async () => {
        try {
            setLoading(true);
            const response = await  axios(`/api/v1/trip/${tripId}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('token')}`
                // }
            });
            if (response.data.success) {
                setTrip(response.data.trip);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Trip not found");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchTrip = async () => {
            await getTrip();
        }
        fetchTrip();
    },[])
  return (
    <div className="py-5 px-5 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}
      {loading ? <TripInfoSkeleton /> : <TripInfo trip={trip} />}
      {/* Recommended hotels */}
      {loading ? <HotelsSkeleton count={4} /> : <Hotels hotels={trip?.hotels} />}
      {/* Daily plan */}
      <PlacesToVisit places={trip?.itinerary} />
      {/* footer */}
    </div>
  );
}

export default ViewTrip
