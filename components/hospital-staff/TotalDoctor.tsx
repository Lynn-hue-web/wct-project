import React, { useState, useEffect } from 'react';

interface Doctor {
  name: string;
  specialization: string;
  contact: string;
  email: string;
  image: string;
  availableDateTime?: string; // Updated to represent "Available" or "Unavailable"
}

const TotalDoctor = () => {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState<number | null>(null);
  const [availability, setAvailability] = useState<string>('');

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    setDoctorsList(storedDoctors);
  }, []);

  const handleAvailabilitySubmit = () => {
    if (selectedDoctorIndex === null || !availability) return;

    const updatedDoctors = [...doctorsList];
    updatedDoctors[selectedDoctorIndex].availableDateTime = availability;

    setDoctorsList(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

    setSelectedDoctorIndex(null);
    setAvailability('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Doctors List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsList.map((doctor, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <img
                src={doctor.image || 'https://via.placeholder.com/150'}
                alt={doctor.name}
                className="rounded-full w-24 h-24 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong> {doctor.contact}
              </p>
              <p className="mt-2 text-sm font-semibold">
                <strong>Status:</strong>{' '}
                {doctor.availableDateTime === 'Available' ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-red-500">Unavailable</span>
                )}
              </p>
            </div>
            <div className="flex mt-4 space-x-4 justify-center">
              <button
                onClick={() => setSelectedDoctorIndex(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Set Availability
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctorIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full mb-4 p-2 border rounded-lg"
            >
              <option value="">Select Availability</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedDoctorIndex(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAvailabilitySubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalDoctor;
