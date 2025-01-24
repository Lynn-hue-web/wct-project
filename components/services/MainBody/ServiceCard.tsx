'use client'
import React, { useState, useEffect } from 'react';

interface Service {
  name: string;
  description: string;
  image: string | null;
  schedule: string;
}

const ServiceCard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = () => {
      const hospitalStaffServices = JSON.parse(localStorage.getItem('services') || '[]') as Service[];
      setServices(hospitalStaffServices);
    };
    fetchServices();
    const interval = setInterval(fetchServices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceCard;