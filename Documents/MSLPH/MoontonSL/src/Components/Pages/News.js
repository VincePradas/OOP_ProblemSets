import React, { useEffect, useState } from 'react'
import "../CSS/news.css";
import { Link } from 'react-router-dom';
import { NewsFetchData } from './NewsFetchContext';



const formatDateToWordedDate = (numberedDate) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(numberedDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}
const News = () => {
    const {
        viewFetchedHighlightsData, 
        viewFetchedNewsData,
        loadingNewsData
    } = NewsFetchData();

    return (
        <div className='mainContainer news'>
            <section className="newsPageContainer top">
                <div className="newsPageContent top1">
                    <h4>MSL Highlights</h4>
                    <div className="nwspcHighlights">
                        {loadingNewsData ?
                        <><div className="nwspchPostLoader">
                            <div className="newsLoading"></div>
                        </div>
                        <div className="nwspchPostLoader">
                            <div className="newsLoading"></div>
                        </div>
                        <div className="nwspchPostLoader">
                            <div className="newsLoading"></div>
                        </div>
                        <div className="nwspchPostLoader mobile">
                            <div className="newsLoading"></div>
                        </div></>:
                        <>{viewFetchedHighlightsData.map((news, i) => (
                            <Link className="nwspchPost" key={i} to={`/News/${news.news_canonical}`}>
                                <div className="nwspchpImage">
                                    <img id='nwspchpiBack' src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                                    <img id='nwspchpiFront' src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                                </div>
                                <div className="nwspchpContent">
                                    <h6>{news.news_title}</h6>
                                </div>
                                <div className="nwspchpPublished">
                                    <p>By. {news.news_writer}</p>
                                    <p>{formatDateToWordedDate(news.news_published)}</p>
                                </div>
                            </Link>
                        ))}</>}
                    </div>
                </div>
            </section>
            <section className="newsPageContainer mid">
                <div className="newsPageContent mid1">
                    <h4>News and Articles</h4>
                    <div className="nwspcHighlights">
                        <div className="nwspcHighlights">
                            {loadingNewsData ?
                            <><div className="nwspchPostLoader">
                                <div className="newsLoading"></div>
                            </div>
                            <div className="nwspchPostLoader">
                                <div className="newsLoading"></div>
                            </div>
                            <div className="nwspchPostLoader">
                                <div className="newsLoading"></div>
                            </div>
                            <div className="nwspchPostLoader mobile">
                                <div className="newsLoading"></div>
                            </div></>:
                            <>{viewFetchedNewsData.map((news, i) => (
                                <Link className="nwspchPost" key={i} to={`/News/${news.news_canonical}`}>
                                    <div className="nwspchpImage">
                                        <img id='nwspchpiBack' src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                                        <img id='nwspchpiFront' src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                                    </div>
                                    <div className="nwspchpContent">
                                        <h6>{news.news_title}</h6>
                                    </div>
                                    <div className="nwspchpPublished">
                                        <p>By. {news.news_writer ? news.news_writer : 'MSL Writer'}</p>
                                        <p>{formatDateToWordedDate(news.news_published)}</p>
                                    </div>
                                </Link>
                            ))}</>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default News