import React, { useEffect, useState } from 'react'
import "../CSS/newsPage.css";
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { NewsFetchData } from './NewsFetchContext';


const formatDateToWordedDate = (numberedDate) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(numberedDate);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

const NewsPage = () => {
    const navigate = useNavigate ();
    const { newsCanonical } = useParams();
    const {
        viewFetchedHighlightsData, 
        viewFetchedNewsData,
        loadingNewsData
    } = NewsFetchData();
    const newsData = viewFetchedNewsData.filter(news => news.news_canonical === newsCanonical);
    const viewNewsImg = newsData.map(news => news.news_img1);
    const viewNewsTitle = newsData.map(news => news.news_title);
    const viewNewsSubtitle = newsData.map(news => news.news_subtitle);
    const viewNewsWriter = newsData.map(news => news.news_writer);
    const viewNewsPublished = newsData.map(news => news.news_published);
    const viewNewsContent = newsData.map(news => news.news_content);

    const handleNewsPage = () => {
        localStorage.setItem('news', 'active');
        localStorage.removeItem('dashboard');
    }

    return (
        <div className='mainContainer newsPage'>
            <section className="newspPageContainer top">
                <div className="nwsppcContentTop left">
                    <div>
                        <img id='nwsppchpiBack' src={`https://mslphdatasheet.site/MSLNewsAssets/${viewNewsImg}`} alt="" />
                        <img id='nwsppchpiFront' src={`https://mslphdatasheet.site/MSLNewsAssets/${viewNewsImg}`} alt="" />
                    </div>
                    <h4>{viewNewsTitle}</h4>
                    <p>{viewNewsSubtitle}</p>
                </div>
                <div className="nwsppcContentTop right">
                    <h5>LATEST ARTICLES</h5>
                    {viewFetchedHighlightsData.slice(0, 3).map((news, i) => (
                        <Link className='nwsppcctRight' key={i} to={`/News/${news.news_canonical}`} onClick={handleNewsPage}>
                            <div className='nwsppcctRightImg'>
                                <img id='nwsppcctrBack' src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                                <img id='nwsppcctrFront' src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                            </div>
                            <div className="nwsppcctRightTitle">
                                <h6>{news.news_title}</h6>
                                <span>
                                    <p>{formatDateToWordedDate(news.news_published)}</p>
                                </span>
                            </div>
                        </Link>
                    ))}
                    <br />
                    <div className="nwsppcctrMore">
                        <Link to='/News' onClick={handleNewsPage}>View More Articles</Link>
                    </div>
                </div>
            </section>
            <section className="newspPageContainer mid">
                <div className="nwsppcContentMid">
                    <h6>By. {viewNewsWriter ? viewNewsWriter : 'MSL Writer'} - {formatDateToWordedDate(viewNewsPublished)}</h6>
                    <p>{viewNewsContent}</p>
                </div>
                <div className="nwsppcContentMidOthers">
                    <h5>LATEST ARTICLES</h5>
                    <div className="nwsppccmOthers">
                        <div className='nwsppccmoNews'></div>
                            {viewFetchedHighlightsData.map((news, i) => (
                                <Link className='nwsppccmoNews' key={i} to={`/News/${news.news_canonical}`} onClick={handleNewsPage}>
                                    <img src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
                                    <div></div>
                                    <span>
                                        <p>{news.news_title}</p>
                                    </span>
                                </Link>
                            ))}
                        <div className='nwsppccmoNews'></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NewsPage