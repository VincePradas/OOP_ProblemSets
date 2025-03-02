import React, { useEffect, useState, useRef } from 'react';
import "../CSS/watchParty.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserProfileData } from './UserProfileContext';

const WatchFestChallenge = () => {
    const formRef = useRef(null);
    const { userLoggedData } = UserProfileData();
    const [registrationResponse, setRegistrationResponse] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);

    const [urlLink, setUrlLink] = useState('');
    const [mslFullName, setMslFullname] = useState('');
    const [contact, setContact] = useState('');
    const [mslEmail, setMslEmail] = useState('');
    const [school, setSchool] = useState('');
    const [fbLink, setFbLink] = useState('');

    const [mslUserId, setMslUserId] = useState('');
    const [mslDateAttend, setMslDateAttend] = useState('');
    const [mslUserServer, setMslUserServer] = useState('');
    const [mslSchoolArea, setMSLSchoolArea] = useState('');

    const submitMSLEventRegistration = (e) => {
        e.preventDefault(); // Prevent default form submission
        setSubmitLoader(true);

        // Submit the form and handle response
        formRef.current.submit();
        setTimeout(() => {
            setRegistrationResponse('Registration submitted successfully!');
            setSubmitLoader(false);

            // Clear form fields after submission
            setUrlLink('');
            setMslFullname('');
            setContact('');
            setMslEmail('');
            setSchool('');
            setFbLink('');
            setMslDateAttend('');
            setMslUserId('');
            setMslUserServer('');
            setMSLSchoolArea('');
        }, 1000);
    };

    return (
        <div className='mainContainer watchParty'>
            <form
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSdCd_CV_R7sfKnFnQcTdnsw47Krfg0dBBAFYiEbzWS7nNoE_g/formResponse"
                method="POST"
                target="hidden_iframe"
            >
                <input type="text" name="entry.2135063380" value={urlLink} readOnly />
                <input type="text" name="entry.857987900" value={mslFullName} readOnly />
                <input type="text" name="entry.1459185710" value={contact} readOnly />
                <input type="text" name="entry.990397221" value={mslEmail} readOnly />
                <input type="text" name="entry.2128883412" value={school} readOnly />
                <input type="text" name="entry.1273536070" value={fbLink} readOnly />
                <button type="submit" style={{ display: 'none' }}>Submit</button>
            </form>
            <iframe
                name="hidden_iframe"
                style={{ display: "none" }}
                title="hidden_iframe"
            ></iframe>

            <section className="wprtyPageContainer watchFestForm">
                <div className="wprtyPageContent top">
                    <div className="wprtypctHeader">
                        <img
                            id='wprtypcthLogo'
                            className='watchFestFormLogo'
                            src={require('../assets/imgs/watchFest/WatchFest-Logo-BR.png')}
                            alt="WatchFest Logo"
                        />
                        <p>
                            The M6 hype is real! Show your support to our country's representative by creating a video and posting it online! Thousands of diamonds await our participants with the most likes!
                        </p>
                    </div>
                    <div className="wprtypctForm">
                        {(userLoggedData.length >= 0) ? (
                            <div className="wprtypctfContents">
                                <h6>VIDEO SUPPORT SUBMISSION FORM</h6>
                                <p>Upload your video on Facebook as a reel and submit your entry. Make sure that your post is visible and set to PUBLIC.</p>
                                <div className="wprtypctfc">
                                    <input
                                        type="text"
                                        placeholder='Facebook Reel URL or Link'
                                        onChange={(e) => setUrlLink(e.target.value)}
                                        value={urlLink}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Full Name'
                                        onChange={(e) => setMslFullname(e.target.value)}
                                        value={mslFullName}
                                    />
                                    <input
                                        type="text"
                                        placeholder='School or Area'
                                        onChange={(e) => setSchool(e.target.value)}
                                        value={school}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Your Personal Facebook Link'
                                        onChange={(e) => setFbLink(e.target.value)}
                                        value={fbLink}
                                    />
                                    <input
                                        type="email"
                                        placeholder='Valid Email Address'
                                        onChange={(e) => setMslEmail(e.target.value)}
                                        value={mslEmail}
                                    />
                                    <input
                                        type="number"
                                        placeholder='Contact Number'
                                        onChange={(e) => setContact(e.target.value)}
                                        value={contact}
                                    />
                                    {submitLoader ? (
                                        <button disabled>Submitting...</button>
                                    ) : (
                                        <button
                                            className={(urlLink && mslFullName && school && fbLink && mslEmail && contact) ? 'active' : ''}
                                            onClick={(e) => submitMSLEventRegistration(e)}
                                            disabled={!urlLink || !mslFullName || !school || !fbLink || !mslEmail || !contact}
                                        >
                                            Submit Registration
                                        </button>
                                    )}
                                    <p id='formResponse'>{registrationResponse}</p>
                                    <p>
                                        By submitting your information, you confirm that you agree to the terms and conditions of MSL Philippines and certify that the information provided is true and correct. An email will be sent to you to verify your entry.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="wprtypctfContents">
                                <h6>VIDEO SUPPORT SUBMISSION FORM</h6>
                                <p>Upload your video on Facebook as a reel and submit your entry. Make sure that your post is visible and set to PUBLIC.</p>
                                <div className="wprtypctfc">
                                    <input
                                        type="text"
                                        placeholder='Facebook Reel URL or Link'
                                        onChange={(e) => setUrlLink(e.target.value)}
                                        value={urlLink}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Full Name'
                                        onChange={(e) => setMslFullname(e.target.value)}
                                        value={mslFullName}
                                    />
                                    <input
                                        type="text"
                                        placeholder='School or Area'
                                        onChange={(e) => setSchool(e.target.value)}
                                        value={school}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Your Personal Facebook Link'
                                        onChange={(e) => setFbLink(e.target.value)}
                                        value={fbLink}
                                    />
                                    <input
                                        type="email"
                                        placeholder='Valid Email Address'
                                        onChange={(e) => setMslEmail(e.target.value)}
                                        value={mslEmail}
                                    />
                                    <input
                                        type="number"
                                        placeholder='Contact Number'
                                        onChange={(e) => setContact(e.target.value)}
                                        value={contact}
                                    />
                                        {submitLoader ? (
                                            <button disabled>Submitting...</button>
                                        ) : (
                                            <button
                                                className={(urlLink && mslFullName && school && fbLink && mslEmail && contact) ? 'active' : ''}
                                                onClick={(e) => submitMSLEventRegistration(e)}
                                                disabled={!(urlLink && mslFullName && school && fbLink && mslEmail && contact)}
                                            >
                                                Submit Registration
                                            </button>
                                        )}
                                    <p id='formResponse'>{registrationResponse}</p>
                                    <p>
                                        By submitting your information, you confirm that you agree to the terms and conditions of MSL Philippines and certify that the information provided is true and correct. An email will be sent to you to verify your entry.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WatchFestChallenge;
