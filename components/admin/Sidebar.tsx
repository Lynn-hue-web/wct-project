import React from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";

interface SidebarProps {
  onSelectOption: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectOption }) => {
  return (
    <aside className="sidebar">
      <ul>
        <li onClick={() => onSelectOption('dashboard')} className="sidebar-item">
          <i className="fa-solid fa-house-user"></i> Dashboard
        </li>
        <li onClick={() => onSelectOption('add-doctor')} className="sidebar-item">
          <i className="fa-solid fa-user-plus"></i> Add Doctor
        </li>
        <li onClick={() => onSelectOption('add-service')} className="sidebar-item">
          <i className="fa-brands fa-usps"></i> Add Service
        </li>
        <li onClick={() => onSelectOption('doctor-list')} className="sidebar-item">
          <i className="fa-solid fa-user-doctor"></i> Doctors List
        </li>
        <li onClick={() => onSelectOption('service-list')} className="sidebar-item">
          <i className="fa-brands fa-usps"></i> Service List
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
