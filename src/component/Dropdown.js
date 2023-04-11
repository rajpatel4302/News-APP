import React, { useState, useEffect } from 'react';

function Dropdown({selectedValue, handleSelectChange}) {
  const [countries, setCountriesData] = useState([]);

  // useEffect(() => {
  //   const fetchCountriesData = async () => {
  //     const response = await fetch('https://restcountries.com/v3.1/all');
  //     const data = await response.json();
  //     setCountriesData(data);
  //   };
  //   fetchCountriesData();
  // }, []);

  // const filteredData = countries.filter((country) => {
  //   const data = Object.keys(country).some((key) => {
  //     const res = country[key].toLowerCase().includes.toLowerCase();
  //     return res;
  //   });
  //   return data;
  // });

  const filteredData = () => {

  }

console.log(countries,'countries');
  
  return (
    <>
    <select name="country" value={selectedValue} onChange={handleSelectChange}>
      <option value="">Select a country</option>
      {/* {filteredData().map((country) => (
        <option key={country.cca2} value={country.cca2.toLowerCase()}>
          {country.name.common}
        </option>
      ))} */}
    </select>
    </>
  );
} 

export default Dropdown;         



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Dropdown({ selectedValue, handleSelectChange }) {
//   const [countriesData, setCountriesData] = useState([]);

//   useEffect(() => {
//     const fetchCountriesData = async () => {
//       const newsResults = await axios.get('https://newsdata.io/api/1/news?apikey=<your-api-key>&category=<your-category>&page=<your-page-number>');
//       const countries = newsResults.data.articles.map((article) => article.location); 
//       const uniqueCountries = [...new Set(countries)];
//       setCountriesData(uniqueCountries);
//     };
//     fetchCountriesData();
//   }, []);
//  console.log(countriesData,'coountry');

//   return (
//     <>
//       <select name="country" value={selectedValue} onChange={handleSelectChange}>
//         <option value="">Select a country</option>
//         {countriesData.map((country) => (
//           <option key={country} value={country.toLowerCase()}>
//             {country}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// }

// export default Dropdown;


