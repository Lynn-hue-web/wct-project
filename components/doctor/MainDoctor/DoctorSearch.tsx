import React, { useState } from 'react';
import './main.css'

interface DoctorSearchProps {
  onSearch: (query: string) => void;
}

const DoctorSearch: React.FC<DoctorSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="doctor-list">
      <div className="doctor-search">
        <input
          type="text"
          placeholder="Search doctor by name"
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default DoctorSearch;
