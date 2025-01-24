import React, { useState } from 'react';

interface Service {
  name: string;
  description: string;
  image: string | null;
}

const AddService: React.FC = () => {
  const [service, setService] = useState<Service>({
    name: '',
    description: '',
    image: null,
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setService((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get existing services from localStorage
    const existingServices = JSON.parse(localStorage.getItem('services') || '[]') as Service[];

    // Add the new service
    const updatedServices = [...existingServices, service];
    localStorage.setItem('services', JSON.stringify(updatedServices));

    // Show notification
    setNotification('Service added successfully!');

    // Reset the form
    setService({ name: '', description: '', image: null });

    // Clear the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Service</h1>

      {/* Notification */}
      {notification && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 border border-green-400 rounded-md text-center">
          {notification}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={service.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter service name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={service.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter service description"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            accept="image/*"
          />
          {service.image && (
            <img
              src={service.image}
              alt="Service Preview"
              className="mt-4 w-full h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
