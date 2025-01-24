import React, { useState, useEffect } from 'react';

interface Service {
  name: string;
  description: string;
  image: string | null;
  schedule: string;
}

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editService, setEditService] = useState<Service>({
    name: '',
    description: '',
    image: null,
    schedule: ''
  });

  useEffect(() => {
    const fetchServices = () => {
      const hospitalStaffServices = JSON.parse(localStorage.getItem('services') || '[]') as Service[];
      setServices(hospitalStaffServices);
    };
    fetchServices();
    const interval = setInterval(fetchServices, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditService((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDelete = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const handleEditClick = (index: number) => {
    setIsEditing(index);
    setEditService(services[index]);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditService((prev) => ({ ...prev, [name]: value }));
  };



  const handleSave = (index: number) => {
    const updatedServices = [...services];
    updatedServices[index] = editService;
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setIsEditing(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Service List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <p className="text-gray-600 text-center col-span-full">No services available.</p>
        ) : (
          services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              {isEditing === index ? (
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={editService.name}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                    placeholder="Service Name"
                  />
                  <textarea
                    name="description"
                    value={editService.description}
                    onChange={handleEditChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                    placeholder="Service Description"
                    rows={3}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mb-2 p-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsEditing(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={service.image || 'https://via.placeholder.com/150'}
                    alt={service.name}
                    className="rounded-lg w-full h-40 object-cover mb-4"
                  />
                  <h2 className="text-lg font-semibold">{service.name}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-green-500 mb-4">Schedule: {service.schedule || 'Not set'}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceList;