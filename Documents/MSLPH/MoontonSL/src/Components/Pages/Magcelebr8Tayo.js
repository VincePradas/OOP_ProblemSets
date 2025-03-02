import React, { useEffect, useState, useRef } from 'react';
import "../CSS/magcelebr8Tayo.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserProfileData } from './UserProfileContext';
import SLAllSchool from '../Json/MagCelebr8Activation.json';

const Magcelebr8Tayo = () => {
    const formRef = useRef(null);
    const { userLoggedData } = UserProfileData();
    const [registrationResponse, setRegistrationResponse] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);
    const anniv8RegistrationAPI = process.env.REACT_APP_MSL_MAGCELEBR8_TAYO_REGISTRAION_API;

    const [mslFullName, setMslFullname] = useState('');
    const [mslEmail, setMslEmail] = useState('');
    const [mslUserId, setMslUserId] = useState('');
    const [mslUserServer, setMslUserServer] = useState('');

    const [mslSchoolName, setMSLSchoolName] = useState('');
    const [filteredSchools, setFilteredSchools] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        const filtered = SLAllSchool
            .filter((school) =>
                school.name && school.name.toLowerCase().includes(value.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by school name
    
        setFilteredSchools(filtered);
    };

    const handleSchoolSelect = (school) => {
        setMSLSchoolName(school.name);
        setSearchTerm(school.name);
        setFilteredSchools([]);
    };

    const submitMSLEventRegistration = async (e) => {
        e.preventDefault();  // Prevent form default behavior
        setSubmitLoader(true);

        const formMagceleb8Details = {
            fullname: mslFullName || `${userLoggedData.givenname} ${userLoggedData.surname}`,
            schoolname: mslSchoolName,
            email: userLoggedData.email || mslEmail,
            mslid: userLoggedData.mslid || mslUserId,
            mslserver: userLoggedData.mslserver || mslUserServer
        };

        try {
            const submitMagcelebr8Response = await axios.post(anniv8RegistrationAPI, formMagceleb8Details);
            const responseMessage = submitMagcelebr8Response.data;

            if (responseMessage.success) {
                setRegistrationResponse(responseMessage.message);
                alert("Registration Successful!");  // Popup success message

                // Clear form fields
                setMslFullname('');
                setMslEmail('');
                setMslUserId('');
                setMslUserServer('');
                setMSLSchoolName('');
                setSearchTerm('');  // Clear the search term as well
                
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
        <div className='mainContainer magcelebr8Tayo'>
            <form
                ref={formRef}
                action="https://docs.google.com/forms/u/0/d/12oRHcjpyeRUYpv1uFpOEJUjmYU7vAQ4IOSpSPT1u_A4/formResponse"
                method="POST"
                target='hidden_iframe' // Change target to hidden iframe
            >
                <input type="text" name="entry.1285906994" value={mslFullName || `${userLoggedData.givenname} ${userLoggedData.surname}`}/>
                <input type="text" name="entry.1318272360" value={mslSchoolName}/>
                <input type="text" name="entry.1758318651" value={userLoggedData.email || mslEmail}/>
                <input type="text" name="entry.71931925" value={userLoggedData.mslid || mslUserId}/>
                <input type="text" name="entry.1048980273" value={userLoggedData.mslserver || mslUserServer}/>
                <button type="submit">Submit</button>
            </form>
            
            {/* Hidden iframe to prevent redirect */}
            <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden_iframe"></iframe> 

            <section className="mc8tPageContainer top">
                <img id='mc8tpcAkai' src={require('../assets/imgs/MLSkins/AkaiSkin.png')} alt="" />
                <img id='mc8tpcAkaiFrog' src={require('../assets/imgs/MLSkins/AkaiFrog.png')} alt="" />
                <div className="mc8tPageContent top">
                    <div className="mc8tpctHeader">
                        <img id='mc8tpcthLogo' src={require('../assets/imgs/MagCelebr8TayoLogo.png')} alt="" />
                        <p>The "MLBB 8th Year Anniversary Event" is a hybrid offline and online celebration hosted by MSL Ph, held at selected schools. Students can join in the fun with various games and activities to commemorate the milestone of Mobile Legends: Bang Bang's 8th anniversary.</p>
                    </div>
                    <div className="mc8tpctForm">
                        {(userLoggedData.length >= 0) ? <>
                            <div className="mc8tpctfContents">
                                <h6>REGISTER DETAILS</h6>
                                <div className="mc8tpctfc">
                                    <input type="text" placeholder='Full Name' onChange={(e) => setMslFullname(e.target.value)} value={mslFullName} />
                                    <div>
                                        <input className={mslSchoolName ? 'inputComplete' : ''} type="text" name="slSchoolName" value={searchTerm} onChange={handleSearchChange} placeholder="Select School to Attend" required />
                                        {filteredSchools.length > 0 && (
                                            <ul>
                                                {filteredSchools.map((school, i) => (
                                                    <li key={i} onClick={() => handleSchoolSelect(school)}>
                                                        <p>{school.name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <input type="email" placeholder='Email Address' onChange={(e) => setMslEmail(e.target.value)} value={mslEmail} />
                                    <input type="number" placeholder='MLBB ID (ie. 9923103)' onChange={(e) => setMslUserId(e.target.value)} value={mslUserId} />
                                    <input type="number" placeholder='ML Server (ie. 5932)' onChange={(e) => setMslUserServer(e.target.value)} value={mslUserServer} />
                                    {submitLoader ? 
                                        <button>Submitting...</button> : 
                                        <button 
                                            className={(mslFullName && mslSchoolName && mslEmail && mslUserId && mslUserServer) ? 'active' : ''} 
                                            onClick={(e) => submitMSLEventRegistration(e)} // Pass the event here
                                            disabled={!mslFullName || !mslSchoolName || !mslEmail || !mslUserId || !mslUserServer}>
                                            Submit Registration
                                        </button>
                                    }
                                    <p id='formResponse'>{registrationResponse}</p>
                                </div>
                            </div>
                        </> : <>
                            <div className="mc8tpctfContents">
                                <img src={require('../assets/imgs/8AnnivLogo.png')} alt="" />
                                <h6>REGISTER MSL PH ACCOUNT</h6>
                                <p>Disclaimer: MSL Ph User Data will be collected</p>
                                <div className="mc8tpctfc">
                                    <div>
                                        <input className={mslSchoolName ? 'inputComplete' : ''} type="text" name="slSchoolName" value={searchTerm} onChange={handleSearchChange} placeholder="Select School to Attend" required />
                                        {filteredSchools.length > 0 && (
                                            <ul>
                                                {filteredSchools.map((school, i) => (
                                                    <li key={i} onClick={() => handleSchoolSelect(school)}>
                                                        <p>{school.name}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {submitLoader ? 
                                        <button>Submitting...</button> : 
                                        <button className='active' onClick={(e) => submitMSLEventRegistration(e)}>Submit Registration</button>
                                    }
                                    <p id='formResponse'>{registrationResponse}</p>
                                </div>
                            </div>
                        </>}
                    </div>
                    <div className="mc8tpctActivation">
                        <img src={require('../assets/imgs/8thAnnivActivation.jpg')} alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Magcelebr8Tayo;
