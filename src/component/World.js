import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Newscard from './Newscard';
import { Roller } from 'react-awesome-spinners';
import './World.css';
import { newsApi1 } from '../api/newsApi';
import Option from './Option';

const apiKeys = [
  'pub_207763b675a0e35aa6522c2e87d715d3e7c87',
  'pub_207770bea17156c0b48e8c9e00d0092d27b2f',
];




function World({ searchQuery, selectedValue, setCountryData, setLangauge, langaugevalue }) {
  const [news, setNews] = useState([]);
  const [items, setItems] = useState([]);
  const [nextid, setNextid] = useState('');
  const [totalScoreLimit, setTotalScoreLimit] = useState(0);
  const [loading, setLoading] = useState(true)
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectcategory, setSelectCategory] = useState('')
  // const [isLoading, setIsLoading] = useState(false);

  function handleSelectChange(event) {
    setSelectCategory(event);
  }

const fetchMoreListItems = async () => 
{
  if (!selectcategory) {
    try {
      const payload = {
        apiLastKeys: apiKeys[0],
        _id: nextid,
      };
        console.log(payload, 'payload');
        const response = await newsApi1(payload);
        if (response.status !== 200) 
      {
          console.log(response.errormessage);
        } else
      {
          setNews((prevNews) => [...prevNews, ...response?.data?.results]);
          setNextid(response?.data?.nextPage);
          response?.data?.results?.map((item) => setCountryData((prev) => ([...prev, ...item?.country])))
          response?.data?.results?.map((item) => setCategoryData((prev) => ([...prev, ...item?.category])))
          response?.data?.results?.map((item) => setLangauge((prev) => ([...prev, item?.language])))
        }
      } catch (error) {
        const payload = {
          apiLastKeys: apiKeys[1],
          _id: nextid,
        };
        const response = await newsApi1(payload);
        if (response.status !== 200) {
          console.log(response.errormessage);
        } 
      {
          setNews((prevNews) => [...prevNews, ...response?.data?.results]);
          setNextid(response?.data?.nextPage);
          response?.data?.results?.map((item) => setCountryData((prev) => ([...prev, ...item?.country])))
          response?.data?.results?.map((item) => setCategoryData((prev) => ([...prev, ...item?.category])))
          response?.data?.results?.map((item) => setLangauge((prev) => ([...prev, item?.language])))
      }
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
    console.log(filterCountry, 'filterCountry');
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


  const FilteringCatagoriesData = () => {
    const filteredData = [];
    if (selectcategory) {
      news?.filter((data) => {
        if (data?.category == selectcategory) {
          filteredData.push(data);
        }
      });
      setItems(filteredData);
    } else {
      setItems(news);
    }
  };



  const FilteringlanguageData = () => {
    const filteredData = [];
    console.log(filteredData, 'filteredData');
    if (langaugevalue) {
      news?.filter((data) => {
        if (data?.language == langaugevalue) {
          filteredData.push(data);
        }
      });         
      return filteredData;
    } else {
      return news;
    }
  };



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
    FilteringCatagoriesData()
  }, [selectcategory])



  useEffect(() => {
    const filteredData = FilteringlanguageData();
    setItems(filteredData);
  },[langaugevalue]);




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
          response?.data?.results?.map((item) => setLangauge((prev) => ([...prev, item?.language])))
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
          response?.data?.results?.map((item) => setLangauge((prev) => ([...prev, item?.language])))
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


