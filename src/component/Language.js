import React from 'react';

function Langauge({langaugevalue, handleChange, uniquelangauge}) {
console.log(uniquelangauge,'uniquelangauge');


  return (
 <>
 <select name="language" value={langaugevalue} onChange={handleChange} style={{ backgroundColor: '#f5f5f5' }}>
      <option value="">ALL Language</option>
      {uniquelangauge?.map((item, i) => (
        <option key={i} value={item}>
        {item}
      </option>
      ))}
    </select>
    </>
  );
} 

export default Langauge;        