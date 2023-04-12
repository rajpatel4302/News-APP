import { useState, useEffect } from 'react';
import axios from 'axios';

function Tab() {
  const [categories, setCategories] = useState([]);


//   useEffect(() => {
//     axios.get('https://newsdata.io/api/1/categories', {
//       headers: {
//         Authorization: 'Bearer pub_2039135424e158384c1444067d2c28fe2c42e'
//       }
//     })
//       .then((response) => setCategories(response.data.categories))
//       .catch((error) => console.log(error));

//   }, []);


// useEffect(() => {
//     if (selectedCategory) {
//       axios
//         .get(
//           `https://newsdata.io/api/1/news?apikey=pub_2039135424e158384c1444067d2c28fe2c42e&category=${selectedCategory}`
//         )
//         .then((response) => setNewsArticles(response.data.articles))
//         .catch((error) => console.log(error));
//     }
//   }, [selectedCategory]);

  useEffect(() => {
    axios.get('https://newsdata.io/api/1/categories', {
      headers: {
        Authorization: 'Bearer pub_2039135424e158384c1444067d2c28fe2c42e'
      },
      referrerPolicy: 'no-referrer-when-downgrade'
    })
    .then((response) => setCategories(response.data.categories))
    .catch((error) => console.log(error));
  }, []);
  
//   console.log(categories ,'categories');

  return (
    <div className="tab-bar">
      {categories.map((category) => (
        <div
          key={category.id}>
          {category.name}
        </div> 
      ))}
    </div>
  );
}

export default Tab;





