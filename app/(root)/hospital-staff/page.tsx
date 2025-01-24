'use client';

import React, { useState } from 'react';
import './Staff.css'
import Sidebar from '../../../components/hospital-staff/Sidebar';
import Navbar from '../../../components/hospital-staff/navbar';
import DashboardContent from '../../../components/hospital-staff/DashboardContent';
import AppointmentsContent from '../../../components/hospital-staff/AppointmentsContent'
import TotalDoctor from '../../../components/hospital-staff/TotalDoctor';
import ServiceList from '../../../components/hospital-staff/ServiceListStaff';
import FeedBack from '../../../components/hospital-staff/FeedBack'


export default function AdminDashboard() {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const renderContent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <DashboardContent />;
      case 'appointments':
        return <AppointmentsContent />;
      case 'doctor-list':
        return <TotalDoctor />;
      case 'service-list':
        return <ServiceList />;
      case 'feed-back':
        return <FeedBack />;
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
