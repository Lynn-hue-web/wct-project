'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

interface Appointment {
  id: number;
  doctorName: string;
  doctorImage: string;
  bookingTime: string;
  userName: string;
  userEmail: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

const AppointmentsContent: React.FC = () => {
  const { user } = useUser(); // Fetch authenticated user data
  const userEmail = user?.primaryEmailAddress?.emailAddress || 'Unknown Email';
  const userName = user?.firstName || 'Anonymous User';

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Function to fetch bookings from localStorage
  const fetchAppointments = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]') as Appointment[];
    const transformedAppointments = storedBookings.map((booking: Appointment, index: number) => ({
      id: index + 1,
      doctorName: booking.doctorName,
      doctorImage: booking.doctorImage,
      bookingTime: `${booking.bookingTime}`,
      userName,
      userEmail,
      status: booking.status || 'Pending', // Correctly read status from stored booking
    }));
    console.log(transformedAppointments); // Debug log to ensure correct data
    setAppointments(transformedAppointments);
  };
  

  // Load appointments on mount
  useEffect(() => {
    fetchAppointments();

    // Listen for booking updates
    const handleBookingUpdate = () => fetchAppointments();
    window.addEventListener('bookingUpdated', handleBookingUpdate);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('bookingUpdated', handleBookingUpdate);
    };
  }, [userName, userEmail]);

  const handleAccept = (id: number) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: 'Accepted' } : appointment
      )
    );

    // Update local storage with new booking status
    const storedBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    storedBookings[id - 1].status = 'Accepted';
    localStorage.setItem('bookingHistory', JSON.stringify(storedBookings));

    // Trigger event to update dashboard
    const event = new Event('bookingUpdated');
    window.dispatchEvent(event);
  };

  const handleReject = (id: number) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: 'Rejected' } : appointment
      )
    );

    // Update local storage with new booking status
    const storedBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    storedBookings[id - 1].status = 'Rejected';
    localStorage.setItem('bookingHistory', JSON.stringify(storedBookings));

    // Trigger event to update dashboard
    const event = new Event('bookingUpdated');
    window.dispatchEvent(event);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointment History</h1>
      <div className="space-y-6">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white"
            >
              {/* Doctor Image */}
              <img
                src={appointment.doctorImage}
                alt={appointment.doctorName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-lg font-semibold">Doctor: {appointment.doctorName}</p>
                <p className="text-gray-600">User: {appointment.userName}</p>
                <p className="text-gray-600">Email: {appointment.userEmail}</p>
                <p className="text-gray-600">Booking Time: {appointment.bookingTime}</p>
                <p
                  className={`text-sm mt-2 font-medium ${
                    appointment.status === 'Pending'
                      ? 'text-yellow-500'
                      : appointment.status === 'Accepted'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  Status: {appointment.status}
                </p>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(appointment.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(appointment.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsContent;
