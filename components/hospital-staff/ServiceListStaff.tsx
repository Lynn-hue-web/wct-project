import React, { useState, useEffect } from 'react';

interface Service {
  name: string;
  description: string;
  image: string | null;
  schedule: string;
}

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [newSchedule, setNewSchedule] = useState('');
  const [showScheduleForm, setShowScheduleForm] = useState<number | null>(null);

  useEffect(() => {
    const fetchServices = () => {
      const hospitalStaffServices = JSON.parse(localStorage.getItem('services') || '[]') as Service[];
      setServices(hospitalStaffServices);
    };
    fetchServices();
    const interval = setInterval(fetchServices, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSchedule(e.target.value);
  };

  const handleScheduleSubmit = (index: number) => {
    const updatedServices = [...services];
    updatedServices[index].schedule = newSchedule;
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setShowScheduleForm(null);
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
              <img
                src={service.image || 'https://via.placeholder.com/150'}
                alt={service.name}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{service.name}</h2>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-green-500 mb-4">Schedule: {service.schedule || 'Not set'}</p>
              {showScheduleForm === index ? (
                <div className="mb-4">
                  <input
                    type="text"
                    value={newSchedule}
                    onChange={handleScheduleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Enter new schedule"
                  />
                  <button
                    onClick={() => handleScheduleSubmit(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-2"
                  >
                    Save Schedule
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowScheduleForm(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Modify Schedule
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceList;