import React, { useEffect, useState } from 'react'
import "../CSS/m6wflocation.css";
import axios from 'axios';
import {  RiFilterLine, RiCalendarLine, RiGlobeFill } from "react-icons/ri";

const M6WFLocations = () => {
    
    const [viewData, setViewData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // adjust pagination dito

    const getUniqueTypes = () => {
        const types = viewData.map(item => item.type);
        return [...new Set(types)].filter(Boolean).sort();
    };

    const getUniqueRegions = () => {
        const regions = viewData.map(item => item.region);
        return [...new Set(regions)].filter(Boolean).sort();
    };
    const getUniqueCity = () => {
        const city = viewData.map(item => item.city_province);
        return [...new Set(city)].filter(Boolean).sort();
    };
    const monthAbbrFull = {
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
        'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
        'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
    };
    const reverseMonthAbbrFull = Object.fromEntries(
        Object.entries(monthAbbrFull).map(([full, abbr]) => [abbr, full])
    );
    const getUniqueDate = () => {
        const monthMappings = {
            'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
            'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
            'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
        };

        const dates = viewData.flatMap(item => {
            return item.date.split(',').map(date => {
                date = date.trim();
                const months = [...Object.keys(monthMappings), ...Object.values(monthMappings)];
                const hasMonth = months.some(month => date.includes(month));

                // Convert full month names to abbreviated form
                Object.entries(monthMappings).forEach(([full, abbr]) => {
                    date = date.replace(full, abbr);
                });

                if (!hasMonth && date.match(/^\d+$/)) {
                    const previousDate = item.date.split(',')[0].trim();
                    const monthPattern = Object.keys(monthMappings).join('|') + '|' + Object.values(monthMappings).join('|');
                    const monthMatch = previousDate.match(new RegExp(`(${monthPattern})`));
                    if (monthMatch) {
                        const month = monthMappings[monthMatch[1]] || monthMatch[1];
                        date = `${month} ${date}`;
                    }
                }
                return date;
            });
        });
    
        return [...new Set(dates)]
            .filter(Boolean)
            .sort((a, b) => {
                const months = {
                    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
                    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
                };
                
                const [monthA, dayA] = a.split(' ');
                const [monthB, dayB] = b.split(' ');
                
                if (months[monthA] !== months[monthB]) 
                {
                    return months[monthA] - months[monthB];
                }
                
                return parseInt(dayA) - parseInt(dayB);
            });
    };
    const mainData = async () => {
        try {
            const response = await axios.get("https://mslphdatasheet.site/mslLocation.php");
            const resMessage = response.data;
            if (resMessage) {
                setViewData(resMessage);
            }
            else{
                console.log("Error Fetching Data");
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        mainData();
    }, [viewData]);


    // Search Date event Function
    const [searchVenueDate, setSearchVenueDate] = useState('');
    //Search
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedTypes, setSelectedTypes] = useState('');
    const handleSearchChange = (event) => {
        setSearchVenueDate(event.target.value);
    };
    const handleRegionChange = (event) => {
        setSelectedSort(event.target.value);
    };
    const handleTypesChange = (event) => {
        setSelectedTypes(event.target.value);
    };
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };



    const filterData = (data) => {
        // Filter the data
        const filteredData = data.filter(details => {
            // Check for types filter
            if (selectedFilter === 'Types' && selectedTypes && selectedTypes !== details.type) {
                return false;
            }
            // Check for region filter
            if (selectedFilter === 'Region' && selectedSort && selectedSort !== details.region) {
                return false;
            }
            // Check for city filter
            if (selectedFilter === 'City' && selectedCity && selectedCity !== details.city_province) {
                return false;
            }
            // Check for date filter
            if (selectedFilter === 'Date' && searchVenueDate) {
                const dates = details.date.split(',').map(date => {
                    date = date.trim();
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const hasMonth = months.some(month => date.includes(month));
                    
                    if (!hasMonth && date.match(/^\d+$/)) {
                        const previousDate = details.date.split(',')[0].trim();
                        const monthMatch = previousDate.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/);
                        if (monthMatch) {
                            date = `${monthMatch[1]} ${date}`;
                        }
                    }
                    return date;
                });
                return dates.includes(searchVenueDate);
            }
            return true;
        });
        return filteredData.sort((a, b) => {
            const getFirstDate = (dateStr) => {
                const dates = dateStr.split(',')[0].trim();
                const [month, day] = dates.split(' ');
                const months = {
                    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
                    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
                };
                return new Date(2024, months[month] - 1, parseInt(day));
            };

            const dateA = getFirstDate(a.date);
            const dateB = getFirstDate(b.date);
            
            return dateA - dateB;
        });
    };

    const eventDataAll = filterData(viewData);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = eventDataAll.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(eventDataAll.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='mainContainer m6-locations'>

            <section className="PageDetails">
                <div className='LogoM6WatchFest'>
                    <div>
                        <img className='logoM6Img' src={require('../assets/imgs/watchFest/WatchFest-Logo-BR.png')} alt="Logo" />
                    </div>
                </div>
                <h2>LOCATIONS</h2>
                <p>Get ready to experience the thrill of M6 at the Watch Fest! Find the nearest venue and join us for an unforgettable celebration with the Mobile Legends: Bang Bang community. Enjoy exciting activities, connect with fellow fans, and cheer for your favorite teams as we bring the action to life. Don&apos;t miss out—see you onsite!</p>
            </section>
            <section className="PageDetailsTable">
                <div className="PageDetailsTableFilterNav">
                    <div className="PageDetailsTableFilterNavContents">
                        <h6>{selectedFilter === 'Region' ? <RiGlobeFill className='faIcons' /> : selectedFilter === 'City' ? <RiGlobeFill className='faIcons' /> : selectedFilter === 'Date' ? <RiCalendarLine className='faIcons' /> : <RiFilterLine className='faIcons' />}</h6>
                        <select name="" id="" onChange={handleFilterChange} value={selectedFilter}>
                                <option value="">Filter By:</option>
                                <option value="Types">Types</option>
                                <option value="Region">Region</option>
                                <option value="City">City</option>
                                <option value="Date">Date</option>
                        </select>
                        {selectedFilter === '' && (
                            <input className='PageDetailsTableFilterNavContentsInput' type="text" placeholder='ALL' readOnly/>
                        )}
                        {selectedFilter === 'Types' && (
                            <select name="" id="" onChange={handleTypesChange} value={selectedTypes}>
                                <option value="">ALL</option>
                                {getUniqueTypes().map((types, index) => (
                                    <option key={index} value={types}>{types}</option>
                                ))}
                            </select>
                        )}
                        {selectedFilter === 'Region' && (
                            <select name="" id="" onChange={handleRegionChange} value={selectedSort}>
                                <option value="">ALL</option>
                                {getUniqueRegions().map((region, index) => (
                                    <option key={index} value={region}>{region}</option>
                                ))}
                            </select>
                        )}
                        {selectedFilter === 'City' && (
                            <select name="" id="" onChange={handleCityChange} value={selectedCity}>
                                <option value="">ALL</option>
                                {getUniqueCity().map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
                            </select>
                        )}
                        {selectedFilter === 'Date' && (
                            <select name="" id="" onChange={handleSearchChange} value={searchVenueDate}>
                                <option value="">ALL</option>
                                {getUniqueDate().map((date, index) => {
                                    const [month, day] = date.split(' ');
                                    const fullMonth = reverseMonthAbbrFull[month] || month;
                                    return (
                                        <option key={index} value={date}>{`${fullMonth} ${day}`}</option>
                                    );
                                })}
                            </select>
                        )}
                    </div>
                </div>
                <div className="pageTable">
                    <table>
                        <thead>
                            <tr>
                                <th width="22%"><p>Name of Location</p></th>
                                <th width="13.5%"><p>Type</p></th>
                                <th width="13%"><p>Dates</p></th>
                                <th width="14%"><p>Region</p></th>
                                <th width="13%"><p>City</p></th>
                                <th width="28%"><p>Address</p></th>
                            </tr>
                        </thead>
                    </table>
                    <div className="M6WFLocationsTableContents">
                        <table id='tableData'>
                            <tbody>
                                {eventDataAll.length === 0 ? 
                                <>
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                            <p>No locations found</p>
                                        </td>
                                    </tr>
                                </>:<>
                                    {currentItems.map((details, index) => (
                                        
                                        <tr key={index}>
                                            <td width="25%" id='venueName'> 
                                                {details.venue_name ? 
                                                <p>{details.venue_name}</p>:
                                                <p>No Venue name</p>}
                                            </td>
                                            <td width="15%" id='eventsDates'>
                                                <p>{details.type}</p>
                                            </td>
                                            <td width="15%" id='eventsDates'>
                                                <p>{details.date}</p>
                                            </td>
                                            <td width="15%" id='eventsRegion'>
                                                <p>{details.region}</p>
                                            </td>
                                            <td width="15%" id='eventsCity'>
                                                <p>{details.city_province}</p>
                                            </td>
                                            <td width="28%" id='eventsAddress'>
                                                <p>{details.address}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </>}
                                
                            </tbody>
                        </table>
                        
                        {/* Pagination Controls */}
                        {/* {eventDataAll.length > 0 && (
                            <div className="pagination">
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        )} */}
                    </div>
                </div>
                {eventDataAll.length > 0 && (
                    <div className="pagination">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                                id='paginationPrevNext'
                            >
                                {index + 1}
                            </button>
                        ))}
                        
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default M6WFLocations