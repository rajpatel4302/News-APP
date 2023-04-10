import React from 'react';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
];

function Dropdown({ selectedValue, handleSelectChange }) {

  return (
    <>
    <select name="country" value={selectedValue} onChange={handleSelectChange}>
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </select>
    </>
  );
}

export default Dropdown;
