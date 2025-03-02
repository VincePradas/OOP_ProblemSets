import React from 'react'
import "../CSS/events.css";
import { Link } from 'react-router-dom';
import { EventsFetchData } from './EventFetchContext';


const Events = () => {
    const {
        viewHotEvents, 
        viewActiveEvents,
        viewRecentEvents
    } = EventsFetchData();

    return (
        <div className='mainContainer events'>
            <section className="eventsPageContainer top">
                <div className="eventsPageContent top1">
                    <h4>MSL HIGHLIGHT EVENT</h4>
                    <h6>Join us for an exciting journey of unforgettable moments!</h6>
                    <div className="evntpcHighlights">
                        <div className="evntshlght right mobile">
                            <img src={require('../assets/imgs/mccMainLogo.png')} alt="" />
                        </div>
                        <div className="evntshlght left">
                            <h4>MSL Collegiate Cup (MCC)</h4>
                            <h6>What is MCC?</h6>
                            <p>
                                MSL Colligiate Cup (MCC) is a platform for collegiate players to showcase their skills in the national 
                                stage. MCC is a potential franchise that both promote the participation of the MSL Communities and 
                                accredited organizations accross the country
                            </p><br />
                            <h6>Who can Join?</h6>
                            <p>
                                Aspiring Student-Gamers from MSL Communities and MSL Accredited Organizations are allowed to join.
                            </p>
                            <div className="evntshlghtl">
                                <Link>Learn More</Link>
                            </div>
                        </div>
                        <div className="evntshlght right website">
                            <img src={require('../assets/imgs/mccMainLogo.png')} alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="eventsPageContainer mid">
                <div className="eventsPageContent mid1">
                    <h4>OTHER MSL EVENTS</h4>
                    <div className="evntpcOthers">
                        {viewHotEvents.map((event, i) => (
                            <Link className="evntpcoRecent" key={i} to={`/${event.event_canonical}`}>
                                <img src={`https://mslphdatasheet.site/MSLEventsImages/${event.event_logo}`} alt="" />
                                <h5>{event.event_title}</h5>
                                <p>{event.event_subtitle}</p>
                                <div>
                                    <p>{event.event_state}</p>
                                </div>
                            </Link>
                        ))}
                        {viewActiveEvents.map((event, i) => (
                            <Link className="evntpcoRecent" key={i} to={`/${event.event_canonical}`}>
                                <img src={`https://mslphdatasheet.site/MSLEventsImages/${event.event_logo}`} alt="" />
                                <h5>{event.event_title}</h5>
                                <p>{event.event_subtitle}</p>
                                <div>
                                    <p>{event.event_state}</p>
                                </div>
                            </Link>
                        ))}
                        {viewRecentEvents.map((event, i) => (
                            <Link className="evntpcoRecent" key={i}>
                                <img src={`https://mslphdatasheet.site/MSLEventsImages/${event.event_logo}`} alt="" />
                                <h5>{event.event_title}</h5>
                                <p>{event.event_subtitle}</p>
                                <div>
                                    <p>{event.event_state}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Events