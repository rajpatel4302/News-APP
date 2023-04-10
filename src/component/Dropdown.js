import React, { useState, useEffect } from 'react';

function Dropdown({selectedValue, handleSelectChange}) {
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      setCountriesData(data);
    };
    fetchCountriesData();
  }, []);

  return (
    <>
    <select name="country" value={selectedValue} onChange={handleSelectChange}>
      <option value="">Select a country</option>
      {countriesData.map((country) => (
        <option key={country.cca2} value={country.cca2.toLowerCase()}>
          {country.name.common}
        </option>
      ))}
    </select>
    </>
  );
}

export default Dropdown;
