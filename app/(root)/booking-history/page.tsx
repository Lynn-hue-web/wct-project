'use client';
import React, { useState, useEffect } from 'react';

const BookingHistory = () => {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const storedBookings = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
        setBookings(storedBookings);
    }, []);

    const handleDeleteBooking = (index: number) => {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        localStorage.setItem('bookingHistory', JSON.stringify(updatedBookings));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Booking History</h1>
            {bookings.length > 0 ? (
                <ul className="space-y-4">
                    {bookings.map((booking, index) => (
                        <li
                            key={index}
                            className="border p-4 rounded-lg shadow-md flex items-start gap-4"
                        >
                            <img
                                src={booking.doctorImage || '/placeholder.png'}
                                alt={booking.doctorName || 'Doctor'}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{booking.doctorName || 'Unknown Doctor'}</h2>
                                <p className="text-gray-600">Appointment Date: {booking.date}</p>
                                <p className="text-gray-600">Appointment Time: {booking.time}</p>
                                <p className="text-gray-500 text-sm">
                                    Booked On: {new Date(booking.createdAt).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeleteBooking(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <i className="fa-solid fa-trash bg-white"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">No booking history found.</p>
            )}
        </div>
    );
};

export default BookingHistory;