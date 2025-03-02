import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NewsFetchDataContext = createContext();

export const NewsFetchDataProvider = ({ children }) => {
    const [viewFetchedHighlightsData, setViewFetchedHighlightsData] = useState([])
    const [viewFetchedNewsData, setViewFetchedNewsData] = useState([])
    const [loadingNewsData, setLoadingNewsData] = useState(true)
    const MSLNewsDataAPI = process.env.REACT_APP_MSL_NEWS_DATA_API;

    // Fetch data once when component mounts
    useEffect(() => {
        const fetchMslNewsData = () => {
        axios.get(MSLNewsDataAPI)
            .then((response) => {
                const highlightsData = response.data.filter(news => news.news_state == 'Highlight');
                const highlightNewsSort = highlightsData.sort((a, b) => new Date(b.news_published) - new Date(a.news_published));
                setViewFetchedHighlightsData(highlightNewsSort);

                const allNewsData = response.data.sort((a, b) => new Date(b.news_published) - new Date(a.news_published));
                setViewFetchedNewsData(allNewsData)
                setLoadingNewsData(false)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchMslNewsData();
    }, []);

    return (
        <NewsFetchDataContext.Provider value={{ 
            viewFetchedHighlightsData, 
            viewFetchedNewsData,
            loadingNewsData
        }}>
            {children}
        </NewsFetchDataContext.Provider>
    );
};

export const NewsFetchData = () => useContext(NewsFetchDataContext);