import React from 'react';

function Dropdown({selectedValue, handleSelectChange, uniqueCountries}) {

  return (
    <>
  <select name="country" value={selectedValue} onChange={handleSelectChange}>
      <option value="">ALL Country</option>
      {/* {filteredData().map((country) => (
        <option key={country.cca2} value={country.cca2.toLowerCase()}>
          {country.name.common}
        </option>
      ))} */}
      {uniqueCountries?.map((item, i) => (
        <option key={i} value={item}>
        {item}
      </option>
      ))}
    </select>
    </>
  );
} 

export default Dropdown;         






