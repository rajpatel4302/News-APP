import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './Newscard';
import { Roller } from "react-awesome-spinners";
import './Business.css'

const apiKeys = [
  'pub_2010276638dca29869e3f6c3833e7b6011d34',
  'pub_201039c8ac66f83fcffab408107c9c697f44f'
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}



function Business() {
  const [news, setNews] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMoreListItems = async () => {
    const nextPageUrl = `https://newsdata.io/api/1/news?apikey=${apiKeys[0]}&category=business&country=in&language=en&page=${nextid}`;
    await fetch(nextPageUrl)
      .then(response => response.json())
      .then((data) => {
        console.log(data, 'data');
        setNews((prevNews) => [...prevNews, ...data.results]);
        setNextid(data.nextPage);
      },
        (err) => {
          fetch(`https://newsdata.io/api/1/news?apikey=${apiKeys[1]}&category=business&language=en&country=in&page=${nextid}`)
            .then(response => response.json())
            .then((data) => {
              setNews((prevNews) => [...prevNews, ...data.results]);
              setNextid(data.nextPage);
            },
              (err) => {
                console.log(err);
              }
            )
        });
  };

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/news?apikey=${apiKeys[0]}&country=in&language=en&category=business`)
      .then(response => response.json())
      .then((data) => {
        console.log(data, 'data');
        setNews(data.results);
        setNextid(data.nextPage);
        setTotalScoreLimit(data.count);
        setLoading(false);
      },
        (err) => {
          fetch(`https://newsdata.io/api/1/news?apikey=${apiKeys[1]}&country=in&language=en&category=business`)
            .then(response => response.json())
            .then((data) => {
              console.log(data, 'data');
              setNews(data.results);
              setNextid(data.nextPage);
              setTotalScoreLimit(data.count);
              setLoading(false);
            },
              (err) => {
                console.log(err);
              }
            )
        }
      );

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
      {loading && <Roller/>}
      </div>
          <h1 className='headlines'>Business news</h1>
          <div className="news-card-container">
            {news.map((article, index) => (
               article.image_url && 
              <div key={index} className="news-card1">
                <Newscard article={article} index={index}/>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

export default Business;
