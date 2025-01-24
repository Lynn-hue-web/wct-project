import React, { useEffect, useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  description: string;
  image: string;
  availableDateTime?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onViewDetails: (id: number) => void;
  refreshDoctorsList?: () => void; // Optional refresh function passed from the parent
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewDetails,
  refreshDoctorsList,
}) => {
  // Determine the availability status
  const availabilityStatus =
    doctor.availableDateTime === 'Available' ? 'Available' : 'Unavailable';

  // Optionally refresh the doctors list if provided
  useEffect(() => {
    if (refreshDoctorsList) {
      refreshDoctorsList();
    }
  }, [doctor, refreshDoctorsList]);

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={() => onViewDetails(doctor.id)}
    >
      <div className="relative h-48 w-full">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold mb-1 truncate">{doctor.name}</h3>
        <p className="text-sm opacity-80 truncate">{doctor.specialization}</p>
      </div>
      <div className="absolute top-2 right-2 bg-blue-500/80 text-white px-2 py-1 rounded-full text-xs">
        View Details
      </div>
      {/* Add availability status badge */}
      <div
        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs ${
          availabilityStatus === 'Available'
            ? 'bg-green-500/80 text-white'
            : 'bg-red-500/80 text-white'
        }`}
      >
        {availabilityStatus}
      </div>
    </div>
  );
};

export default DoctorCard;
