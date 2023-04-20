import React from 'react';

function Langauge({langaugevalue, handleChange, uniquelangauge}) {
  return (
 <>
 <select name="language" value={langaugevalue} onChange={handleChange}>
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
 

