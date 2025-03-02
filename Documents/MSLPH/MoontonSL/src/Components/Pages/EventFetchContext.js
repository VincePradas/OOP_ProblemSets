import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EventsFetchDataContext = createContext();

export const EventsFetchDataProvider = ({ children }) => {
    const [viewHotEvents, setViewHotEvents] = useState([]);
    const [viewActiveEvents, setViewActiveEvents] = useState([]);
    const [viewRecentEvents, setViewRecentEvents] = useState([]);
    const MSLEventsDataAPI = process.env.REACT_APP_MSL_EVENTS_DATA_API;

    useEffect(() => {
        const fetchMsleventsData = () => {
        axios.get(MSLEventsDataAPI)
            .then((response) => {
                const eventsRecentData = response.data
                .filter(event => event.event_state === 'Recent')
                .sort((a, b) => b.id - a.id);

                const eventsActiveData = response.data
                .filter(event => event.event_state === 'Active')
                .sort((a, b) => b.id - a.id);

                const eventsHotData = response.data
                .filter(event => event.event_state === 'Hot')
                .sort((a, b) => b.id - a.id);


                setViewRecentEvents(eventsRecentData);
                setViewActiveEvents(eventsActiveData);
                setViewHotEvents(eventsHotData);
                
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchMsleventsData();
    }, []);

    return (
        <EventsFetchDataContext.Provider value={{ 
            viewHotEvents, 
            viewActiveEvents,
            viewRecentEvents
        }}>
            {children}
        </EventsFetchDataContext.Provider>
    );
};

export const EventsFetchData = () => useContext(EventsFetchDataContext);