'use client';

import React, { useState } from 'react';
import './dashboard.css';
import Sidebar from '../../../components/admin/Sidebar';
import Navbar from '../../../components/admin/navbar';
import DashboardContent from '../../../components/admin/DashboardContent';
import { AddDoctorContent } from '../../../components/admin/AddDoctorContent';
import DoctorListContent from '../../../components/admin/DoctorListContent';
import AddService from '../../../components/admin/AddService'
import ServiceList from '../../../components/admin/ServiceListAdmin'


export default function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <DashboardContent />;
      
      case 'add-doctor':
        return <AddDoctorContent />;
      case 'doctor-list':
        return <DoctorListContent />;
      case 'add-service':
        return <AddService />;
      case 'service-list':
        return <ServiceList />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar onSelectOption={setSelectedOption} />

        {/* Content */}
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
}
