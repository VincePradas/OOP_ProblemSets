import React, { useEffect, useState, useRef } from 'react';
import "../CSS/watchParty.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserProfileData } from './UserProfileContext';

const WatchParty = () => {
    const formRef = useRef(null);
    const { userLoggedData } = UserProfileData();
    const [registrationResponse, setRegistrationResponse] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);
    const watchPartyRegistrationAPI = process.env.REACT_APP_MSL_WATCH_PARTY_REGISTRAION_API;

    const [mslFullName, setMslFullname] = useState('');
    const [mslEmail, setMslEmail] = useState('');
    const [mslUserId, setMslUserId] = useState('');
    const [mslDateAttend, setMslDateAttend] = useState('');
    const [mslUserServer, setMslUserServer] = useState('');
    const [mslSchoolArea, setMSLSchoolArea] = useState('');


    const submitMSLEventRegistration = async (e) => {
        e.preventDefault();  // Prevent form default behavior
        setSubmitLoader(true);

        const formWatchPartyDetails = {
            watchParty: 'MPL Season 14',
            fullname: mslFullName || `${userLoggedData.givenname} ${userLoggedData.surname}`,
            schoolarea: mslSchoolArea || `${userLoggedData.schoolarea}`,
            email: userLoggedData.email || mslEmail,
            dateToAttend: mslDateAttend,
            mslid: userLoggedData.mslid || mslUserId,
            mslserver: userLoggedData.mslserver || mslUserServer
        };

        try {
            const submitWatchPartyResponse = await axios.post(watchPartyRegistrationAPI, formWatchPartyDetails);
            const responseMessage = submitWatchPartyResponse.data;

            if (responseMessage.success) {
                setRegistrationResponse(responseMessage.message);
                alert("Registration Successful!");  // Popup success message

                // Clear form fields
                setMslFullname('');
                setMslEmail('');
                setMslDateAttend('');
                setMslUserId('');
                setMslUserServer('');
                setMSLSchoolArea('');
                setSubmitLoader(false);
            } else {
                setRegistrationResponse(responseMessage.message);
                setSubmitLoader(false);
            }

            // Submit the form to Google Forms
            formRef.current.submit(); // Submit form here

        } catch (error) {
            console.error(error);
            setSubmitLoader(false);
        }
    };

    return (
        <div className='mainContainer watchParty'>            
            <form
                ref={formRef}
                action="https://docs.google.com/forms/u/0/d/1R1C9U0-zOD32ApsCahprr1WVJg77DcmoLuAJTUS315A/formResponse"
                method="POST"
                target='hidden_iframe' // Change target to hidden iframe
            >
                <input type="text" name="entry.506563884" value={mslFullName || `${userLoggedData.givenname} ${userLoggedData.surname}`}/>
                <input type="text" name="entry.1153965671" value={mslSchoolArea || `${userLoggedData.schoolarea}`}/>
                <input type="text" name="entry.1295974694" value={userLoggedData.email || mslEmail}/>
                <input type="text" name="entry.1007825303" value={mslDateAttend}/>
                <input type="text" name="entry.1710727264" value={userLoggedData.mslid || mslUserId}/>
                <input type="text" name="entry.1541084886" value={userLoggedData.mslserver || mslUserServer}/>
                <button type="submit">Submit</button>
            </form>
            {/* Hidden iframe to prevent redirect */}
            <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden_iframe"></iframe> 


            <section className="wprtyPageContainer top">
                <div className="wprtyPageContent top">
                    <div className="wprtypctHeader">
                        <img id='wprtypcthLogo' src={require('../assets/imgs/MPLS14LOGOWF.png')} alt="" />
                        <p>Get ready for an epic showdown at the MPL PH Season 14 Watch Fest! Schools from all over the Philippines are gathering to experience the thrill of Mobile Legends: Bang Bang tournaments. Don't miss out on the action, camaraderie, and unforgettable moments with fellow MLBB fans!</p>
                    </div>
                    <div className="wprtypctForm">
                        {(userLoggedData.length >= 0) ? <>
                            <div className="wprtypctfContents">
                                <h6>REGISTER DETAILS</h6>
                                <div className="wprtypctfc">
                                    <input type="text" placeholder='Full Name' onChange={(e) => setMslFullname(e.target.value)} value={mslFullName} />
                                    <select name="slSchoolArea" onChange={(e) => setMSLSchoolArea(e.target.value)}>
                                        <option value="">Select Venue</option>
                                        <option value="UP Town Center">Luzon (UP Town Center)</option>
                                        <option value="Festive Walk Iloilo">Visayas (Festive Walk Iloilo)</option>
                                        <option value="MMCM Plaza">Mindanao (MMCM Plaza)</option>
                                    </select>
                                    <select name="slSchoolArea" onChange={(e) => setMslDateAttend(e.target.value)}>
                                        <option value="">Select Date To Attend</option>
                                        <option value="Luzon - Oct 19, 2024">Luzon - Oct 19, 2024</option>
                                        <option value="Luzon - Oct 20, 2024">Luzon - Oct 20, 2024</option>
                                        <option value="Visayas - Oct 17, 2024">Visayas - Oct 17, 2024</option>
                                        <option value="Visayas - Oct 18, 2024">Visayas - Oct 18, 2024</option>
                                        <option value="Visayas - Oct 19, 2024">Visayas - Oct 19, 2024</option>
                                        <option value="Visayas - Oct 20, 2024">Visayas - Oct 20, 2024</option>
                                        <option value="Mindanao - Oct 19, 2024">Mindanao - Oct 19, 2024</option>
                                        <option value="Mindanao - Oct 20, 2024">Mindanao - Oct 20, 2024</option>
                                    </select>
                                    <input type="email" placeholder='Email Address' onChange={(e) => setMslEmail(e.target.value)} value={mslEmail} />
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
                                </div>
                            </div>
                        </>:<>
                            <div className="wprtypctfContents">
                                <img src={require('../assets/imgs/MPLS14LOGOONLY.png')} alt="" />
                                <h6>REGISTER MSL PH ACCOUNT</h6>
                                <p>Disclaimer: MSL Ph User Data will be collected</p>
                                <div className="wprtypctfc">
                                    <select name="slSchoolArea" onChange={(e) => setMslDateAttend(e.target.value)}>
                                        <option value="">Select Date To Attend</option>
                                        <option value="Luzon - Oct 19, 2024">Luzon - Oct 19, 2024</option>
                                        <option value="Luzon - Oct 20, 2024">Luzon - Oct 20, 2024</option>
                                        <option value="Visayas - Oct 17, 2024">Visayas - Oct 17, 2024</option>
                                        <option value="Visayas - Oct 18, 2024">Visayas - Oct 18, 2024</option>
                                        <option value="Visayas - Oct 19, 2024">Visayas - Oct 19, 2024</option>
                                        <option value="Visayas - Oct 20, 2024">Visayas - Oct 20, 2024</option>
                                        <option value="Mindanao - Oct 19, 2024">Mindanao - Oct 19, 2024</option>
                                        <option value="Mindanao - Oct 20, 2024">Mindanao - Oct 20, 2024</option>
                                    </select>
                                    {submitLoader ? 
                                        <button>Submitting...</button> : 
                                        <button className={mslDateAttend ? 'active' : ''} disabled={!mslDateAttend} onClick={(e) => submitMSLEventRegistration(e)}>Submit Registration</button>
                                    }
                                    <p id='formResponse'>{registrationResponse}</p>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default WatchParty