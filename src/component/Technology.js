import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './Newscard';
import { Roller } from "react-awesome-spinners";
import './Technology.css';


const apiKeys = [
  'pub_20109fc0d54b888f04ac9694a96f67514f609',
  'pub_201082b94372999e55b28f01eda3ea68153a3',
];

function getRandomApiKey() {
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
}


function Technology() {
  const [news, setNews] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const[loading, setLoading]=useState(true)

  const fetchMoreListItems = async () => {
    const nextPageUrl = `https://newsdata.io/api/1/news?apikey=${apiKeys[0]}&category=technology&country=in&language=en&page=${nextid}`;
    await fetch(nextPageUrl)
      .then(response => response.json())
      .then((data) => {
        console.log(data, 'data');
        setNews((prevNews) => [...prevNews, ...data.results]);
        setNextid(data.nextPage);
      },
        (err) => {
          fetch(`https://newsdata.io/api/1/news?apikey=${apiKeys[1]}&category=technology&language=en&country=in&page=${nextid}`)
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
    fetch(`https://newsdata.io/api/1/news?apikey=${apiKeys[0]}&country=in&language=en&category=technology`)
      .then(response => response.json())
      .then((data) => {
        console.log(data, 'data');
        setNews(data.results);
        setNextid(data.nextPage);
        setTotalScoreLimit(data.count);
        setLoading(false);
      },
        (err) => {
          fetch(`https://newsdata.io/api/1/news?apikey=${apiKeys[1]}&country=in&language=en&category=technology`)
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
        {loading && <Roller />}
        </div>
      
        <h1 className="headlines">Technology News</h1>
        <div className="news-card-container">
          {news?.map((article, index) => (
             article.image_url && 
            <div key={index} className="news-card1">
              <Newscard article={article} index={index} />
            </div>
          ))}
        </div>
      </div>
    </InfiniteScroll>
    </>
  );
}

export default Technology;

