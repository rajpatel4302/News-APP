import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './Newscard';
import { Roller } from 'react-awesome-spinners';
import './World.css';
import { newsApi1 } from '../api/newsApi';
import Option from './Option';

const apiKeys = [
  'pub_204522fb018c826f457099522c3f81c78196c',
  'pub_201082b94372999e55b28f01eda3ea68153a3',
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}



function World({ searchQuery, selectedValue, setCountryData  }) {
  const [news, setNews] = useState([]);
  const [items, setItems] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const [loading, setLoading] = useState(true)
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const[categoryData, setCategoryData]=useState([]);
  const [selectcategory, setSelectCategory]=useState('')


  function handleSelectChange(event) {
    setSelectCategory(event.target.value);
  }


  const fetchMoreListItems = async () => {
    try {
      const payload = {
        apiLastKeys: apiKeys[0],
        _id: nextid,
        // countrySelect: selectedValue,
        // categorySelct: 'world',
      };
      const response = await newsApi1(payload);
      if (response.status !== 200) {
        console.log(response.errormessage);
      } else {
        setNews((prevNews) => [...prevNews, ...response?.data?.results]);
        setNextid(response?.data?.nextPage);
        response?.data?.results?.map((item) => setCountryData((prev) => ([...prev, ...item?.country])))
        response?.data?.results?.map((item) => setCategoryData((prev) => ([...prev, ...item?.category])))
      }
    } catch (error) {
      const payload = {
        apiLastKeys: apiKeys[1],
        _id: nextid,
        categorySelct: 'world',
      };
      const response = await newsApi1(payload);
      if (response.status !== 200) {
        console.log(response.errormessage);
      } else {
        setNews((prevNews) => [...prevNews, ...response?.data?.results]);
        setNextid(response?.data?.nextPage);
        response?.data?.results?.map((item) => setCountryData((prev) => ([...prev, ...item?.country])))
        response?.data?.results?.map((item) => setCategoryData((prev) => ([...prev, ...item?.category])))
      }
    }
  };

  useEffect(() => {
    const newArray = categoryData?.filter((value, index, self) => {
      return self.indexOf(value) == index;
    })
    setUniqueCategory(newArray)
  }, [categoryData])

  const FilteringData = () => {
    const filterCountry = [];
    if (selectedValue) {
      news?.filter((data) => {
        if (data?.country == selectedValue) {
          filterCountry.push(data)
          setItems(filterCountry)
        }
      })
    } else {
      setItems(news)
    }
  }

  const searchData = () => {
    if (searchQuery) {
      const searchAllData = items.filter((ele) => ele?.title?.toLowerCase()?.includes(searchQuery))
      return searchAllData;
    } else {
      return items;
    }
  }


  useEffect(() => {
    setItems(news);
  }, [news]);

  useEffect(() => {
    FilteringData();
  }, [selectedValue])

  useEffect(() => {
    (async () => {
      try {
        const payload = {
          apiLastKeys: apiKeys[0],
          _id: nextid,
          categorySelct: 'world',
        };
        const response = await newsApi1(payload);
        if (response.status !== 200) {
          console.log(response.errormessage);
        } else {
          setNews(response?.data?.results);
          setNextid(response?.data?.nextPage);
          setTotalScoreLimit(response?.data?.count);
          setLoading(false);
          response?.data?.results?.map((item) => setCountryData((prev) => ([...prev, ...item?.country])))
          response?.data?.results?.map((item) => setCategoryData((prev) => ([...prev, ...item?.category])))
        }
      } catch (error) {
        const payload = {
          apiLastKeys: apiKeys[1],
          _id: nextid,
          categorySelct: 'world',
        };
        const response = await newsApi1(payload);
        if (response.status !== 200) {
          console.log(response.errormessage);
        } else {
          setNews(response?.data?.results);
          setNextid(response?.data?.nextPage);
          setTotalScoreLimit(response?.data?.count);
          setLoading(false);
          response?.data?.results?.map((item) => setCountryData((prev) => ([...prev, ...item?.country])))
          response?.data?.results?.map((item) => setCategoryData((prev) => ([...prev, ...item?.category])))
        }
      }
    })()
  }, []);


  return (
    <>

      <InfiniteScroll
        dataLength={news.length}
        next={() => fetchMoreListItems()}
        className="infiniteScrollOverflow"
        hasMore={nextid !== null}
      >
        <div className="home">
          <div className='roller'>
            {loading && <Roller />}
          </div>
          <h1 className='headlines'>World News</h1>
          <Option
            uniqueCategory={uniqueCategory}
            selectcategory={selectcategory}
            handleSelectChange={handleSelectChange}
        />
          <div className="news-card-container">
            {searchData()?.map((article, index) => (
              // article.image_url && 
              <div key={index} className="news-card">
                <Newscard article={article} index={index} />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

export default World;


