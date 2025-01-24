import React, { useState, useEffect } from 'react';

// Define the doctor type
interface Doctor {
  name: string;
  specialization: string;
  contact: string;
  email: string;
  image: string;
  availableDateTime?: string; // Availability field
}

const DoctorListContent = () => {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false); // State for delete success alert
  const [editDoctor, setEditDoctor] = useState<Doctor>({
    name: '',
    specialization: '',
    contact: '',
    email: '',
    image: '',
    availableDateTime: '',
  });
  
  useEffect(() => {
    const updateDoctorsList = () => {
      const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
      setDoctorsList(storedDoctors);
    };

    // Listen for changes in localStorage to update the doctors list
    window.addEventListener('storage', updateDoctorsList);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', updateDoctorsList);
    };
  }, []);

  const handleDelete = (index: number) => {
    const updatedDoctors = doctorsList.filter((_, i) => i !== index);
    setDoctorsList(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));


    const event = new Event('storage');
    window.dispatchEvent(event);

    // Show success alert
    setDeleteSuccess(true);
    setTimeout(() => {
      setDeleteSuccess(false); // Hide the alert after 3 seconds
    }, 3000);
  };

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setEditDoctor(doctorsList[index]);
  };

  const handleSave = (index: number) => {
    const updatedDoctors = [...doctorsList];
    updatedDoctors[index] = editDoctor;
    setDoctorsList(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
    setIsEditing(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDoctor({ ...editDoctor, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditDoctor((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditDoctor({ ...editDoctor, availableDateTime: e.target.value });
  };

  const getAvailabilityStatus = (availableDateTime: string | undefined) => {
    return availableDateTime === 'Available' ? 'Available' : 'Unavailable';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Doctors List</h1>
      
      {/* Success Alert */}
      {deleteSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Doctor deleted successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsList.map((doctor, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <img
                src={doctor.image || 'https://via.placeholder.com/150'}
                alt={doctor.name}
                className="rounded-full w-24 h-24 object-cover mb-4"
              />
              {isEditing === index ? (
                <div className="w-full">
                  <input
                    type="text"
                    name="name"
                    value={editDoctor.name}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded-lg"
                    placeholder="Doctor Name"
                  />
                  <input
                    type="text"
                    name="specialization"
                    value={editDoctor.specialization}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded-lg"
                    placeholder="Specialization"
                  />
                  <input
                    type="text"
                    name="contact"
                    value={editDoctor.contact}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded-lg"
                    placeholder="Contact"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editDoctor.email}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded-lg"
                    placeholder="Email"
                  />
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="w-full mb-4 p-2 border rounded-lg"
                    accept="image/*"
                  />
                  <select
                    name="availableDateTime"
                    value={editDoctor.availableDateTime}
                    onChange={handleAvailabilityChange}
                    className="w-full mb-2 p-2 border rounded-lg"
                  >
                    <option value="Unavailable">Unavailable</option>
                    <option value="Available">Available</option>
                  </select>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600">
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p className="text-gray-600">
                    <strong>Contact:</strong> {doctor.contact}
                  </p>
                  {doctor.email && (
                    <p className="text-gray-600">
                      <strong>Email:</strong> {doctor.email}
                    </p>
                  )}
                  <p className="text-green-600">
                    <strong>Availability:</strong> {getAvailabilityStatus(doctor.availableDateTime)}
                  </p>
                </>
              )}
            </div>
            <div className="flex mt-4 space-x-4 justify-center">
              {isEditing === index ? (
                <button
                  onClick={() => handleSave(index)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorListContent;
