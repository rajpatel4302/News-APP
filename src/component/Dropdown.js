import React,{useState} from 'react';

const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Australia', label: 'Australia' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Japan', label: 'Japan' },
  { value: 'India', label: 'India' },
];

function Dropdown() {
    const [selectedValue, setSelectedValue] = useState('');

  function handleSelectChange(event) {
    setSelectedValue(event.target.value);
  }

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
