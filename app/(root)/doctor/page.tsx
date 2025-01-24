'use client'

import React, { useState, useEffect } from 'react';
import DoctorNavbar from '../../../components/doctor/navbar/page';
import DoctorCard from '../../../components/doctor/MainDoctor/DoctorCard';
import DoctorDetailModal from '../../../components/doctor/MainDoctor/DoctorDetailModal';
import DoctorSearch from '../../../components/doctor/MainDoctor/DoctorSearch';
import DoctorFooter from '../../../components/doctor/footer/page';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  description: string;
  contact: string;
  email: string;
  image: string;
  availableDateTime?: string;
  availability?: boolean;
}

const specializations = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist"
];

const DoctorPage: React.FC = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);  // Initialize as an empty array
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');

  useEffect(() => {
    // Fetch doctors from localStorage and handle the case where there's no data
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    if (Array.isArray(storedDoctors)) {
      setFilteredDoctors(storedDoctors);
    } else {
      setFilteredDoctors([]); // Set to empty array if data is malformed
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDoctors(query, selectedSpecialization);
  };

  const handleSpecializationClick = (specialization: string) => {
    const newSpecialization = selectedSpecialization === specialization ? "" : specialization;
    setSelectedSpecialization(newSpecialization);
    filterDoctors(searchQuery, newSpecialization);
  };

  const filterDoctors = (query: string, specialization: string) => {
    let filtered = [...filteredDoctors];  // Use spread to avoid mutating state directly

    if (query) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (specialization) {
      filtered = filtered.filter(doctor =>
        doctor.specialization.toLowerCase() === specialization.toLowerCase()
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleViewDetails = (id: number) => {
    const doctor = filteredDoctors.find((doc) => doc.id === id); // Correctly find the clicked doctor
    if (doctor) {
      setSelectedDoctor(doctor); // Update state with the selected doctor
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="w-64 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Doctors Specialist</h2>
            <div className="space-y-2">
              {specializations.map((specialization) => (
                <button
                  key={specialization}  // Ensure key is unique for each item in the list
                  onClick={() => handleSpecializationClick(specialization)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedSpecialization === specialization ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  {specialization}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <DoctorSearch onSearch={handleSearch} />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDoctors.length === 0 ? (
                <p>No doctors found.</p>
              ) : (
                filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id || doctor.name}
                    doctor={{
                      id: doctor.id,
                      name: doctor.name,
                      specialization: doctor.specialization,
                      description: doctor.description,
                      image: doctor.image,
                      availableDateTime: doctor.availableDateTime,
                    }}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </div>




          </div>
        </div>

        {selectedDoctor && (
          <DoctorDetailModal
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)}
            onBook={(doctorId) => {
              console.log(`Booking doctor with ID: ${doctorId}`);
              setSelectedDoctor(null);
            }}
          />

        )}
      </div>
      <DoctorFooter />
    </div>
  );
};

export default DoctorPage;
