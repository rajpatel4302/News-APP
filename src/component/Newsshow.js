import React from 'react';
import { useLocation } from 'react-router-dom';
import './Newsshow.css'


function Newsshow() {
  const location = useLocation(); 
  const { Data } = location.state;
  
  console.log(Data);

  return (
    <div>
      {Data && (
        <div className="news1">
          <img src={Data.image_url} alt={'Image'} className="news-image1" />
          <h3 className="news-link">{Data.link}</h3>
          <p className="news-content-show">{Data.content}</p>
          <h2 className="news-title">{Data.title}</h2>
          <p className="news-description">{Data.description}</p>
          <h2 className="news-source"> Source :{Data.source_id}</h2>
        </div>
      )}
    </div>
  );
}

export default Newsshow;

