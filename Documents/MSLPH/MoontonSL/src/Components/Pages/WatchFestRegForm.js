import React, { useEffect, useState, useRef } from 'react';
import "../CSS/watchParty.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserProfileData } from './UserProfileContext';

const WatchFestRegForm = () => {
    const formRef = useRef(null);
    const { userLoggedData } = UserProfileData();
    const [registrationResponse, setRegistrationResponse] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);

    const [mslFullName, setMslFullname] = useState('');
    const [mslRegion, setMslRegion] = useState('');
    const [mslEmail, setMslEmail] = useState('');
    const [mslUserId, setMslUserId] = useState('');
    const [mslDateAttend, setMslDateAttend] = useState('');
    const [mslUserServer, setMslUserServer] = useState('');
    const [mslSchoolArea, setMSLSchoolArea] = useState('');
    const schoolDateMapping = {
        "ACLC College of Bukidnon": ["December 15, 2024"],
        "Ateneo De Davao University": ["December 15, 2024"],
        "Bacolod City College": ["December 15, 2024"],
        "Batangas State University - Alangilan Campus": ["December 15, 2024"],
        "Caraga State University": ["December 15, 2024"],
        "Central Mindanao University": ["December 15, 2024"],
        "City College of San Jose Del Monte": ["December 15, 2024"],
        "Colegio De Los Baños": ["December 15, 2024"],
        "Davao Del Norte State College": ["December 15, 2024"],
        "Eastern Visayas State University - Ormoc": ["December 15, 2024"],
        "Eastern Visayas State University - Tacloban": ["December 15, 2024"],
        "Eulogio Amang Rodriguez Institute of Science and Technology": ["December 15, 2024"],
        "Father Saturnino Urios University": ["December 15, 2024"],
        "Holy Cross Davao College": ["December 15, 2024"],
        "Iloilo Science and Technology University": ["December 15, 2024"],
        "J.H. Cerilles State College": ["December 15, 2024"],
        "Laguna State Polytechnic University - Los Baños Campus": ["December 15, 2024"],
        "Liceo De Cagayan University": ["December 15, 2024"],
        "Lyceum of Subic Bay Inc.": ["December 15, 2024"],
        "Mapua Malayan College Mindanao": ["December 15, 2024"],
        "Mindanao State University - Iligan Institute of Technology": ["December 15, 2024"],
        "Mindanao State University - Main Campus": ["December 15, 2024"],
        "National University - Clark": ["December 15, 2024"],
        "National University - Laguna": ["December 15, 2024"],
        "National University Manila": ["December 15, 2024"],
        "Pamantasan ng Cabuyao": ["December 15, 2024"],
        "Polytechnic University of the Philippines - San Juan City": ["December 15, 2024"],
        "Polytechnic University of the Philippines - Sta. Mesa": ["December 15, 2024"],
        "Quezon City University": ["December 15, 2024"],
        "Salay Community College": ["December 15, 2024"],
        "Southwestern University PHINMA": ["December 15, 2024"],
        "Systems Plus College Foundation": ["December 15, 2024"],
        "Tarlac State University": ["December 15, 2024"],
        "Technological University of the Philippines - Cavite Campus": ["December 15, 2024"],
        "The College of Maasin": ["December 15, 2024"],
        "University of Mindanao - Matina Campus": ["December 15, 2024"],
        "University of San Carlos": ["December 15, 2024"],
        "University of San Jose-Recoletos": ["December 15, 2024"],
        "University of Science and Technology of Southern Philippines": ["December 15, 2024"],
        "University of Southeastern Philippines": ["December 15, 2024"],
        "University of Southern Mindanao - Kabacan Campus": ["December 15, 2024"],
        "University of the Philippines - Diliman": ["December 15, 2024"],
        "Urdaneta City University": ["December 15, 2024"],
        "Visayas State University": ["December 15, 2024"],
        "West Visayas State University": ["December 15, 2024"],
        "Xavier University": ["December 15, 2024"]
        // Add the rest of the schools here with their corresponding dates
    };

    
    const regions = {
        Luzon: [
            "Batangas State University - Alangilan Campus",
            "City College of San Jose Del Monte",
            "Colegio De Los Baños",
            "Laguna State Polytechnic University - Los Baños Campus",
            "Lyceum of Subic Bay Inc.",
            "National University - Laguna",
            "Pamantasan ng Cabuyao",
            "Polytechnic University of the Philippines - San Juan City",
            "Polytechnic University of the Philippines - Sta. Mesa",
            "Quezon City University",
            "Systems Plus College Foundation",
            "Tarlac State University",
            "Technological University of the Philippines - Cavite Campus",
            "University of the Philippines - Diliman",
            "Urdaneta City University"
        ],
        Visayas: [
            "Bacolod City College",
            "Eastern Visayas State University - Ormoc",
            "Eastern Visayas State University - Tacloban",
            "Iloilo Science and Technology University",
            "Southwestern University PHINMA",
            "The College of Maasin",
            "Visayas State University",
            "West Visayas State University"
        ],
        Mindanao: [
            "ACLC College of Bukidnon",
            "Ateneo De Davao University",
            "Caraga State University",
            "Central Mindanao University",
            "Davao Del Norte State College",
            "Father Saturnino Urios University",
            "Holy Cross Davao College",
            "J.H. Cerilles State College",
            "Liceo De Cagayan University",
            "Mapua Malayan College Mindanao",
            "Mindanao State University - Iligan Institute of Technology",
            "Mindanao State University - Main Campus",
            "Salay Community College",
            "University of Mindanao - Matina Campus",
            "University of Science and Technology of Southern Philippines",
            "University of Southeastern Philippines",
            "University of Southern Mindanao - Kabacan Campus",
            "Xavier University"
        ],
        Online: [
            "Eulogio Amang Rodriguez Institute of Science and Technology",
            "National University - Clark",
            "National University Manila",
            "University of San Carlos",
            "University of San Jose-Recoletos"
        ]
    };

    const [availableDates, setAvailableDates] = useState([]);
    
    // Update available dates when the school area changes
    const handleSchoolChange = (school) => {
        setMSLSchoolArea(school);
        const dates = schoolDateMapping[school] || [];
        setAvailableDates(dates); // Update the available dates based on the selected school

    };

        const submitMSLEventRegistration = async (e) => {
            e.preventDefault();
            setSubmitLoader(true);
            console.log(mslFullName, mslSchoolArea, mslEmail, mslUserId, mslUserServer);
        
            // Proceed with form submission
            formRef.current.submit();
        
            setTimeout(() => {
                setRegistrationResponse('Registration submitted successfully!');
                setSubmitLoader(false);
        
                // Show the success prompt
                window.alert("The M6 Watch Fest event has officially ended. 🎉\nMaraming salamat sa inyong pakikiisa at suporta! 💖\nSana'y nag-enjoy kayo sa bawat moment ng ating event. Kitakits ulit sa susunod na MSL Philippines events! 🙌");
       
                // Reset form fields explicitly using the formRef
                formRef.current.reset();  // Reset the entire form
        
                // Optionally reset individual states
                setMslFullname('');
                setMslEmail('');
                setMslDateAttend('');  // This should also reset the dropdown
                setMslUserId('');
                setMslUserServer('');
                setMSLSchoolArea('');  // Reset the school area dropdown
                setMslRegion('');      // Reset the region dropdown
                setRegistrationResponse('');
            }, 1000);
     
    };

    return (
        <div className='mainContainer watchParty'>            
            <form
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSfZMIjlxi0ppd0Y3nVJoT1rnxQXmSuGPJzmjK7v9dapp87RsQ/formResponse"
                method="POST"
                target='hidden_iframe' // Change target to hidden iframe
            >
                <input type="text" name="entry.1014547219" value={mslFullName || `${userLoggedData.givenname} ${userLoggedData.surname}`}/>
                <input type="text" name="entry.204670225" value={mslRegion || `${userLoggedData.schoolarea}`}/>
                <input type="text" name="entry.134961865" value={mslSchoolArea || `${userLoggedData.schoolname}`}/>
                <input type="text" name="entry.883441790" value={userLoggedData.email || mslEmail}/>
                <input type="text" name="entry.1426657407" value={mslDateAttend}/>
                <input type="text" name="entry.1833163117" value={userLoggedData.mslid || mslUserId}/>
                <input type="text" name="entry.81295" value={userLoggedData.mslserver || mslUserServer}/>
                <button type="submit">Submit</button>
            </form>
            {/* Hidden iframe to prevent redirect */}
            <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden_iframe"></iframe> 


            <section className="wprtyPageContainer watchFestForm">
                <div className="wprtyPageContent top">
                    <div className="wprtypctHeader">
                        <img id='wprtypcthLogo' className='watchFestFormLogo' src={require('../assets/imgs/watchFest/WatchFest-Logo-BR.png')} alt="" />
                        <p>Get ready for an epic showdown at the MPL PH Season 16 Watch Fest! Schools from all over the Philippines are gathering to experience the thrill of Mobile Legends: Bang Bang M6 World Championships. Don't miss out on the action, camaraderie, and unforgettable moments with fellow MLBB fans!</p>
                    </div>
                    <div className="wprtypctForm">
                        {(userLoggedData.length >= 0) ? <>
                            <div className="wprtypctfContents">
                                <h6>REGISTRATION DETAILS</h6>
                                <div className="wprtypctfc">
                                    <input type="text" placeholder='Full Name' onChange={(e) => setMslFullname(e.target.value)} value={mslFullName} />
                                    <select name="mslRegion" onChange={(e) => setMslRegion(e.target.value)} value={mslRegion}>
                                            <option value="">Select Activation Site</option>
                                            <option value="Luzon">Luzon</option>
                                            <option value="Visayas">Visayas</option>
                                            <option value="Mindanao">Mindanao</option>
                                            <option value="Online">Online</option>
                                        </select>
                                        <select
                                                name="slSchoolArea"
                                                onChange={(e) => handleSchoolChange(e.target.value)}
                                                value={mslSchoolArea}
                                            >
                                                <option value="">Select Venue</option>
                                                {mslRegion && regions[mslRegion] ? (
                                                    regions[mslRegion].map((school, index) => (
                                                        <option key={index} value={school}>{school}</option>
                                                    ))
                                                ) : (
                                                    <option value="">Please select a region first</option>
                                                )}
                                            </select>
                                            <select
                                                name="mslDateAttend"
                                                onChange={(e) => setMslDateAttend(e.target.value)}
                                                value={mslDateAttend}
                                            >
                                                <option value="">Select Date To Attend</option>
                                                {availableDates.map((date, index) => (
                                                    <option key={index} value={date}>{date}</option>
                                                ))}
                                            </select>
                                    <input type="email" placeholder='Valid Email Address' onChange={(e) => setMslEmail(e.target.value)} value={mslEmail} />
                                    <input type="number" placeholder='MLBB ID (ie. 9923103)' onChange={(e) => setMslUserId(e.target.value)} value={mslUserId} />
                                    <input type="number" placeholder='ML Server (ie. 5932)' onChange={(e) => setMslUserServer(e.target.value)} value={mslUserServer} />
                                    {submitLoader ? 
                                        <button>Submitting...</button> : 
                                        <button 
                                            className={(mslFullName && mslSchoolArea && mslEmail && mslUserId && mslUserServer) ? 'active' : ''} 
                                            onClick={(e) => submitMSLEventRegistration(e)} // Pass the event here
                                            disabled={!mslFullName || !mslSchoolArea || !mslEmail || !mslUserId || !mslUserServer}>
                                            Submit Registration
                                        </button>
                                    }
                                    <p id='formResponse'>{registrationResponse}</p>
                                    <p>By submitting your information, you confirm that you agree to the terms and conditions of MSL Philippines and certify that the information provided is true and correct. An email will be sent to you to verify your registration.</p>
                                </div>
                            </div>
                        </>:<>
                            <div className="wprtypctfContents">
                                <h6>REGISTRATION DETAILS</h6>
                                <div className="wprtypctfc">
                                <select name="mslRegion" onChange={(e) => setMslRegion(e.target.value)} value={mslRegion}>
                                            <option value="">Select Activation Site</option>
                                            <option value="Luzon">Luzon</option>
                                            <option value="Visayas">Visayas</option>
                                            <option value="Mindanao">Mindanao</option>
                                            <option value="Online">Online</option>
                                        </select>

                                        <select
                                                name="slSchoolArea"
                                                onChange={(e) => handleSchoolChange(e.target.value)}
                                                value={mslSchoolArea}
                                            >
                                                <option value="">Select Venue</option>
                                                {mslRegion && regions[mslRegion] ? (
                                                    regions[mslRegion].map((school, index) => (
                                                        <option key={index} value={school}>{school}</option>
                                                    ))
                                                ) : (
                                                    <option value="">Please select a region first</option>
                                                )}
                                            </select>
                                            <select
                                                name="mslDateAttend"
                                                onChange={(e) => setMslDateAttend(e.target.value)}
                                                value={mslDateAttend}
                                            >
                                                <option value="">Select Date To Attend</option>
                                                {availableDates.map((date, index) => (
                                                    <option key={index} value={date}>{date}</option>
                                                ))}
                                            </select>
                                    {submitLoader ? 
                                        <button>Submitting...</button> : 
                                        <button className={mslDateAttend ? 'active' : ''} disabled={!mslDateAttend} onClick={(e) => submitMSLEventRegistration(e)}>Submit Registration</button>
                                    }
                                    <p id='formResponse'>{registrationResponse}</p>
                                    <p>By submitting your information, you confirm that you agree to the terms and conditions of MSL Philippines and certify that the information provided is true and correct. An email will be sent to you to verify your registration.</p>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WatchFestRegForm