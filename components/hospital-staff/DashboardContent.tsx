"use client";

import { useEffect, useState } from 'react';
import { Calendar, Briefcase, Layers } from 'lucide-react';

interface Booking {
  status: string;
}


export default function DashboardContent() {
  const [totalDoctors, setTotalDoctors] = useState<number>(0);
  const [totalServices, setTotalServices] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [totalRejected, setTotalRejected] = useState<number>(0);

  useEffect(() => {
    const calculateBookingStats = () => {
      const storedBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]') as Booking[];
      const acceptedBookings = storedBookings.filter((booking: Booking) => booking.status === 'Accepted');
      const rejectedBookings = storedBookings.filter((booking: Booking) => booking.status === 'Rejected'); // Count rejected bookings
      setTotalBookings(acceptedBookings.length);
      setTotalRejected(rejectedBookings.length); // Set the total rejected bookings
    };    

    const updateDoctorsCount = () => {
      const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
      setTotalDoctors(storedDoctors.length);
    };

    const updateServicesCount = () => {
      const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
      setTotalServices(storedServices.length);
    };

    updateDoctorsCount();
    updateServicesCount();
    calculateBookingStats();

    // Listen for booking updates
    const handleBookingUpdate = () => calculateBookingStats();
    window.addEventListener('bookingUpdated', handleBookingUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener('bookingUpdated', handleBookingUpdate);
    };
  }, []);

  return (
    <div className="p-6 space-y-4">

      {/* Total Doctors Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Briefcase className="w-8 h-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Doctors</h3>
            <p className="text-2xl font-bold text-gray-900">{totalDoctors}</p>
          </div>
        </div>
      </div>

      {/* Total Services Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Layers className="w-8 h-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
            <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
          </div>
        </div>
      </div>

      {/* Total Bookings Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-8 h-8 text-orange-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
            <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
          </div>
        </div>
      </div>

      {/* Total Rejected Bookings Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <Calendar className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Rejected Bookings</h3>
            <p className="text-2xl font-bold text-gray-900">{totalRejected}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
