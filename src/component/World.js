import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './Newscard';
import { Roller } from 'react-awesome-spinners';
import './World.css';
import { newsApi1 } from '../api/newsApi';
import  Tab  from './Tab';

const apiKeys = [
  'pub_2039135424e158384c1444067d2c28fe2c42e',
  'pub_201082b94372999e55b28f01eda3ea68153a3',
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}



function World({ searchQuery, selectedValue, setCountryData }) {
  const [news, setNews] = useState([]);
  const [items, setItems] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const [loading, setLoading] = useState(true)

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
      }
    }
  };

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
          <Tab/>
          <h1 className='headlines'>World News</h1>
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


