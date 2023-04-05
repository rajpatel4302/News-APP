import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './Newscard';
import { Roller } from "react-awesome-spinners";
import './World.css';

function World() {
  const [news, setNews] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const[loading, setLoading]=useState(true)

  const fetchMoreListItems = async () => {
    const nextPageUrl = `https://newsdata.io/api/1/news?apikey=pub_19960053e87236e53f91359b6fefc2f25f0c6&q=top-headline&country=us&language=en&page=${nextid}`;
    await fetch(nextPageUrl)
      .then(response => response.json())
      .then((data) => {
        setNews((prevNews) => [...prevNews, ...data.results]);
        setNextid(data.nextPage);
      });
  };

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/news?apikey=pub_19960053e87236e53f91359b6fefc2f25f0c6&q=top-headline&country=us&language=en`)
      .then(response => response.json())
      .then((data) => {
        setNews(data.results);
        setNextid(data.nextPage);
        setTotalScoreLimit(data.count);
        setLoading(false)
      });
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
        <div className="news-card-container">
          {news?.map((article, index) => (
            article.image_url && 
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


  