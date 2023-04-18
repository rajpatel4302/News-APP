import React from 'react';

function Dropdown({selectedValue, handleSelectChange, uniqueCountries}) {
  return (
    <>
  <select name="country" value={selectedValue} onChange={handleSelectChange}>
      <option value="">ALL Country</option>
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