'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  description: string;
  contact: string;
  email: string;
  image: string;
  appointmentFee?: number;
  yearsExperience?: number;
  availableDateTime?: string;
}

interface DoctorDetailModalProps {
  doctor: Doctor;
  onClose: () => void;
  onBook: (doctorId: number, bookingDetails?: {
    date: string;
    time: string;
  }) => void;
}

const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({ doctor, onClose, onBook }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push({
        date: date,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        dayNumber: date.getDate()
      });
    }
    return dates;
  };

  const timeSlots = [
    "10:00 am", "10:30 am", "11:00 am", "11:30 am",
    "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm", "02:00 pm", "02:30 pm"
  ];

  const dates = getDates();

  const handleBookingSubmit = () => {
    if (!selectedDate || !selectedTime) return;
  
    // Retrieve existing booking history or initialize empty array
    const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
  
    const newBooking = {
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      bookedAt: new Date().toISOString(),
      doctorName: doctor?.name
    };
  
    // Add new booking to history
    bookingHistory.push(newBooking);
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));
  
    // Dispatch event to update notifications
    window.dispatchEvent(new Event('bookingUpdated'));
  
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      onClose();
    }, 2000);
  };

  const handleBookingFormToggle = () => {
    if (doctor.availableDateTime === 'Available') {
      setShowBookingForm(true);
    } else {
      alert('This doctor is currently unavailable for booking.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        {bookingSuccess && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 z-50">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7 16l-4-4m0 0l8 8m-8-8l8-8"
            />
          </svg>
          <span>Appointment booked successfully!</span>
        </div>
        )}

        {!showBookingForm ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{doctor.name}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-4">
                <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
                <p><span className="font-semibold">Contact:</span> {doctor.contact}</p>
                <p><span className="font-semibold">Fee:</span> ${doctor.appointmentFee || 60}</p>
              </div>
              <div>
                <p><span className="font-semibold">Description:</span></p>
                <p className="mt-2">{doctor.description}</p>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Close
              </button>
              <button
                onClick={handleBookingFormToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Book
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-end">
              <button onClick={() => setShowBookingForm(false)} className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Back</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-start gap-6 mb-8">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-blue-100 flex-shrink-0">
                <Image src={doctor?.image || 'https://via.placeholder.com/150'} alt={`Photo of ${doctor?.name}`} layout="fill" objectFit="cover" className="rounded-lg" />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  {doctor.name}
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </h2>
                <p className="text-gray-600 mb-2">{doctor.specialization} • {doctor.yearsExperience || 3} Years</p>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 px-3 py-1 rounded-full">
                    <span className="text-blue-600 font-medium">${doctor.appointmentFee || 60}</span>
                  </div>
                  <div className="text-gray-500">Available Today</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Date</h3>
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {dates.map((date) => (
                  <button
                    key={date.date.toISOString()}
                    onClick={() => setSelectedDate(date.date)}
                    className={`flex flex-col items-center min-w-[80px] p-3 rounded-2xl transition-colors ${selectedDate?.toDateString() === date.date.toDateString() ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className="text-sm">{date.dayName}</span>
                    <span className="text-xl font-semibold">{date.dayNumber}</span>
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4">Select Time</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-full text-center transition-colors ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowBookingForm(false)} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Back
              </button>
              <button
                onClick={handleBookingSubmit}
                disabled={!selectedDate || !selectedTime}
                className={`px-6 py-2 rounded-lg text-white ${(!selectedDate || !selectedTime) ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailModal;