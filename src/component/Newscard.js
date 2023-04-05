import React from 'react';
import { useNavigate } from 'react-router';
import './Newscard.css';
import newsImage from '../assets/news app.jpg'


function Newscard({ article, index }) {
  const {
    title,
    description,
    image_url,
    link,
    pubDate,
    source_id,
    content
  } = article;


  const date = new Date(pubDate);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const Navigate = useNavigate()

  const handleClick = (i) => {
    Navigate(`/newsshow/?id=${i}`, {
      state: { Data: article },
    });
    console.log(i);
  };


  return (
    <div className="newscard">
      <div className="news-image">
        <span><img src={image_url || newsImage} alt={'Image'} /></span>
      </div>
      <div className="news-content">
        <div className="Contentpadding">
          <h2 >{title}</h2>
          <p style={{ whiteSpace: "normal", whiteSpace: 'nowrap', width: '374px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</p>
          <div className="news-meta">
            <h3>{source_id}</h3>
            <h3>{formattedDate}</h3>
          </div>
        </div>
      </div>
      <button className="linkDesign" href={link} target="_blank" rel="noopener noreferrer" onClick={() => handleClick(index)}>
          Read more
        </button>
    </div>
  );
}

export default Newscard;




