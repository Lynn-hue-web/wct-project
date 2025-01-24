import React, { useState, useEffect } from 'react';
import '../admin/style/DoctorList.css'; // Import a CSS file for styles

// Define a type for the doctor object
interface Doctor {
  name: string;
  specialization: string;
  contact: string;
  image?: string; // Base64-encoded string for image
}

const AddDoctorContent = () => {
  const [doctor, setDoctor] = useState<Doctor>({
    name: '',
    specialization: '',
    contact: '',
    image: '',
  });
  const [showSuccess, setShowSuccess] = useState(false); // State for success notification

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDoctor((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    const updatedDoctors = [...storedDoctors, doctor];
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

    setDoctor({ name: '', specialization: '', contact: '', image: '' });
    setShowSuccess(true); // Show success notification

    // Hide the notification after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="form-container">
      <h1>Add Doctor</h1>
      {showSuccess && (
        <div className="notification-top">
          Doctor added successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="doctor-form">
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={doctor.contact}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

const DoctorListContent = () => {
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]') as Doctor[];
    setDoctorsList(storedDoctors);
  }, []); // Fetch doctors from localStorage on initial load

  const handleDelete = (index: number) => {
    const updatedDoctors = doctorsList.filter((_, i) => i !== index);
    setDoctorsList(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
  };

  return (
    <div className="list-container">
      <h1>Doctors List</h1>
      <div className="doctor-cards">
        {doctorsList.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img
              src={doctor.image || 'https://via.placeholder.com/150'}
              alt={doctor.name}
              className="doctor-image"
            />
            <div className="doctor-details">
              <h2>{doctor.name}</h2>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Contact:</strong> {doctor.contact}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export both components
export { AddDoctorContent, DoctorListContent };