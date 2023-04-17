


import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Roller } from 'react-awesome-spinners';
import Newscard from './Newscard';
import './Home.css';
import { newsApi1 } from '../api/newsApi';


const apiKeys = [
  'pub_20497d30f83694e65c512f122f0f0938d27b5',
  'pub_204878ab1b4c2beb1aa314fb1e243bafae80c',
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}

function Home ({ searchQuery, selectedValue }) {
  const [news, setNews] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const [loading, setLoading] = useState(true);


  const fetchMoreListItems = async () => {
    try {
      const payload = {
        apiLastKeys: apiKeys[0],
        _id: nextid,
        categorySelct: 'top',
      };
      const response = await newsApi1(payload);
      if (response.status !== 200) {
        console.log(response.errormessage);
      } else {
        setNews((prevNews) => [...prevNews, ...response?.data?.results]);
        setNextid(response?.data?.nextPage);
      }
    } catch (error) {
      const payload = {
        apiLastKeys: apiKeys[1],
        _id: nextid,
        categorySelct: 'top',
      };
      const response = await newsApi1(payload);
      if (response.status !== 200) {
        console.log(response.errormessage);
      } else {
        setNews((prevNews) => [...prevNews, ...response?.data?.results]);
        setNextid(response?.data?.nextPage);
      }
    }
  };

  const searchData = () => {
    if (searchQuery) {
      const searchAllData = news.filter((ele) => ele?.title?.toLowerCase()?.includes(searchQuery))
      return searchAllData;
    } else {
      return news;
    }
  }


 
  useEffect(() => {
    (async () => {
      try {
        const payload = {
          apiLastKeys: apiKeys[0],
          _id: nextid,
          categorySelct: 'top',
        };
        const response = await newsApi1(payload);
        if (response.status !== 200) {
          console.log(response.errormessage);
        } else {
          setNews(response?.data?.results);
          setNextid(response?.data?.nextPage);
          setTotalScoreLimit(response?.data?.count);
          setLoading(false);
        }
      } catch (error) {
        const payload = {
          apiLastKeys: apiKeys[1],
          _id: nextid,
          categorySelct: 'top',
        };
        const response = await newsApi1(payload);
        if (response.status !== 200) {
          console.log(response.errormessage);
        } else {
          setNews(response?.data?.results);
          setNextid(response?.data?.nextPage);
          setTotalScoreLimit(response?.data?.count);
          setLoading(false);
        }
      }
    })()
  }, [selectedValue]);

  return (
    <>
      <InfiniteScroll
        dataLength={news.length}
        next={() => fetchMoreListItems()}
        className="infiniteScrollOverflow"
        hasMore={nextid !== null}
      >
        <div className="home">
          <div className="roller">{loading && <Roller />}</div>
          <h1 className="headlines">Top Headlines</h1>
          <div className="news-card-container">
            {searchData().map((article, index) => 
            article.image_url && 
            (
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

export default Home;
