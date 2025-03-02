import React, { useEffect, useState, useRef } from 'react';
import styles from '../CSS/WatchFest.module.css';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { UserProfileData } from './UserProfileContext';

const WatchFestGame = () => {
    const { userLoggedData } = UserProfileData();
    const formRef = useRef(null);
    const [mlbbId, setMlbbId] = useState("");
    const [mlbbServer, setMlbbServer] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [school, setSchool] = useState("");
    const [mlbbPredict, setmlbbPredict] = useState("");
    const [registrationResponse, setRegistrationResponse] = useState('');

    const [selectedTeams, setSelectedTeams] = useState([
        {1:{id: null, name: null, img: null}},
        {2:{id: null, name: null, img: null}},
        {3:{id: null, name: null, img: null}},
        {4:{id: null, name: null, img: null}},
        {5:{id: null, name: null, img: null}},
        {6:{id: null, name: null, img: null}},
        {7:{id: null, name: null, img: null}},
        {8:{id: null, name: null, img: null}},
       
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUid, setIsModalUid] = useState(false);
    const [seletedSlot, setSeletedSlot] = useState("");
    const [isSubmitTerms, setIsSubmitTerms] = useState(true);
    const teams = [
        {
            id: 1,
            name: "BloodThirstyKings", 
            img: require('../assets/imgs/watchFest/team/1BloodThirstyKings.png')
        },
        {
            id: 2,
            name: "CFU Gaming", 
            img: require('../assets/imgs/watchFest/team/1CFU Gaming.png')
        },
        {
            id: 3,
            name: "Falcon Esports", 
            img: require('../assets/imgs/watchFest/team/1Falcon Esports.png')
        },
        {
            id: 4,
            name: "Fnatic ONIC PH", 
            img: require('../assets/imgs/watchFest/team/1Fnatic ONIC PH.png')
        },
        {
            id: 5,
            name: "RRQ Hoshi", 
            img: require('../assets/imgs/watchFest/team/1RRQ Hoshi.png')
        },
        {
            id: 6,
            name: "Selangor Red Giants", 
            img: require('../assets/imgs/watchFest/team/1Selangor Red Giants.png')
        },
        {
            id: 7,
            name: "Team Spirit", 
            img: require('../assets/imgs/watchFest/team/1Team Spirit.png')
        },
        {
            id: 8,
            name: "NIP Flash", 
            img: require('../assets/imgs/watchFest/team/1NIP Flash.png')
        },

    ]
    const handleModalOpen = (slot) => {
        setIsModalOpen(true);
        console.log(slot);
        setSeletedSlot(slot);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    }
    const handleModalUidClose = () => {
        setIsModalUid(false);
    }
    const handleModalUid = () => {
        setIsModalUid(true);
    }
    const handleTeamClick = (team , slotIndex) => {
        setSelectedTeams((prevState) => {
            const updatedTeams = [...prevState]; 
            updatedTeams[seletedSlot - 1] = { [seletedSlot]: { id: team.id, name: team.name, img: team.img } }; 
            handleModalClose();
            setTimeout(() => {
                console.log(updatedTeams);
            }, 1000);
            return updatedTeams; 
            
        });
        handleModalClose();
    };
    const handleSubmitTerms = () => {
        setIsSubmitTerms(false)
    }
    const submitMSLEventRegistration = async (e) => {
        e.preventDefault();  // Prevent form default behavior
        let teamPredict = "";
        selectedTeams.map((slot, index) => {
            const slotKey = Object.keys(slot)[0]; // Get the slot key (e.g., slot1, slot2)
            const team = slot[slotKey]; // Get the team object for the slot
            console.log(slotKey);
            teamPredict += "[Rank " + slotKey + " :" +team.name + "], ";
        })
        setmlbbPredict(teamPredict);
        setTimeout(() => {
            formRef.current.submit();
            setRegistrationResponse('Entry submitted successfully!');
                setTimeout(() => {
                    setMlbbId("");
                    setMlbbServer("");
                    setFullName("");
                    setEmail("");
                    setSchool("");
                    setmlbbPredict("");
                }, 1000);
        }, 1000);
     
    };
    return (
        <div className={styles.watchFestGame}>
            {isSubmitTerms && <div className={styles.watchFestGamePop}>
                    <div className={styles.watchFestGamePopContainer}>
                        <div >
                            <p>Terms and Conditions</p>
                            <div>
                                <div className={styles.watchFestGamePopContainer2}>
                                    <ul>
                                        <li>1. Event Duration: This event will run from November 28 to December 5, 2024 only. Any entries submitted outside this period will be disqualified.</li>
                                        <li>2. Prize Pool: The total prize pool is 20,000 diamonds, which will be divided among the top participants with the highest prediction rates.</li>
                                        <li>3. Prize Distribution: Prizes will be awarded to the top 3-5% of participants with the highest prediction accuracy. The exact number of winners will depend on the total number of participants.</li>
                                        <li>4. Data Accuracy: All information provided by participants through the portal is final and cannot be edited or changed after submission. Ensure all details are correct before finalizing your entry.</li>
                                        <li>5. Eligibility: Participation is open to all players, but entrants must be registered and verified in accordance with the event rules. Any fraudulent or misleading information will result in disqualification.</li>
                                        <li>6. Prizes and Send-Out: Prize distribution will occur in January 2025. Winners will be notified via email. Prizes are non-transferable and cannot be exchanged for cash.</li>
                                        <li>7. Changes to Terms: Moonton Student Leaders reserves the right to amend or update the event's terms and conditions at any time.</li>
                                        <li>8. Event Integrity: Any attempt to manipulate or cheat the event, including but not limited to using unauthorized third-party tools or methods to alter predictions, will result in immediate disqualification.</li>
                                        <li>9. Data Privacy: All personal data provided will be handled in accordance with Moonton’s privacy policy. By participating, you consent to the collection and use of your data for the purpose of this event.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.watchFestGamePopContainerButton}>
                                <button className={styles.watchFestPredictionButton} onClick={handleSubmitTerms}>Agree and Submit</button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            }
            
            {isModalOpen&& <div className={styles.watchFestGameModal}>
                <div className={styles.watchFestGameModalBoxContainer}>
                    <div className={styles.watchFestGameModalBoxClose} onClick={handleModalClose}>
                        <FaTimes className='faIcons'/>
                    </div>
            
                    <div className={styles.watchFestGameModalBoxCon}>
                        {teams.map(team => (
                            <div  key={team.id} className={styles.watchFestGameModalBox} onClick={() => handleTeamClick(team, team.id)}>
                                <img src={team.img} alt={team.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
            
            <div className={`${styles.watchFestPrediction} ${styles.watchFestPredictionTop}`}>
                
                <img src={require('../assets/imgs/watchFest/M6_LOGO_2D_BLACK.png')} alt="WatchFest Logo" />
                <div className={styles.watchFestPredictionTitle}>
                    <h3>M6 RANKING PREDICTION</h3>
                    <p>Test Your Luck and Predict Your M6 Teams!</p>
                    <p>Player with highest prediction rate will have a chance to win </p>
                    <p>a portion of 20,000 diamonds! Submission ends on December 5, 2024.</p>
                </div>
            </div>
            <div className={styles.watchFestPrediction}>
                <div className={styles.watchFestPredictionPerTeam}>
                    {selectedTeams.map((slot, index) => {
                        const slotKey = Object.keys(slot)[0]; // Get the slot key (e.g., slot1, slot2)
                        const team = slot[slotKey]; // Get the team object for the slot
                        return (
                            <div key={index} className={styles.watchFestPredictionTeam} onClick={() => handleModalOpen(slotKey)}>
                                <div className={styles.watchFestPredictionTeamBox}>{index +1}</div>
                                <div className={styles.watchFestPredictionTeamBoxContent}>
                                    {team.id ? (
                                        <>
                                            <div>
                                                <img src={team.img} alt={team.name} />
                                            </div>
                                            <div>{team.name}</div>
                                        </>
                                    ) : (
                                        <div>No Team Selected</div>
                                    )}
                                    
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
            </div>
           
            <div className={`${styles.watchFestPrediction} ${styles.watchFestPredictionBottom}`}>
                <div className={styles.watchFestPredictionTitle}>
                    <p>By submitting your entry, you will no longer be able to edit it.
                    Submitting also means you agree to the terms and conditions
                    set for this event.</p>
                    {isModalUid ? 
                    <>
                    <div className={styles.watchFestPredictionFormContainer}>
                        <div className={styles.watchFestPredictionForm}>
                            <div>
                                <p>MLBB ID</p>
                                <input type="text"  className={styles.watchFestPredictionInput} onChange={(e) => setMlbbId(e.target.value)} placeholder='Enter your MLBB ID' value={mlbbId}/>
                            </div>
                            <div>
                                <p>MLBB Server</p>
                                <input type="text"  className={styles.watchFestPredictionInput} onChange={(e) => setMlbbServer(e.target.value)} placeholder='Enter your MLBB Server' value={mlbbServer}/>
                            </div>
                            <div>
                                <p>Full Name</p>
                                <input type="text"  className={styles.watchFestPredictionInput} onChange={(e) => setFullName(e.target.value)} placeholder='Enter your Full Name' value={fullName}/>
                            </div>
                            <div>
                                <p>Email Address</p>
                                <input type="text"  className={styles.watchFestPredictionInput} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email Address' value={email}/>
                            </div>
                            <div>
                                <p>School Name</p>
                                <input type="text"  className={styles.watchFestPredictionInput} onChange={(e) => setSchool(e.target.value)} placeholder='Enter your School Name' value={school}/>
                            </div>
                            <button className={styles.watchFestPredictionButton} onClick={(e) => submitMSLEventRegistration(e)}>Submit</button>
                            
                            {registrationResponse && <div className={styles.watchFestPredictionResponse}>
                                {registrationResponse}
                            </div>}
                            
                        </div> 
                    </div>
                    </>
                    : 
                    <button className={styles.watchFestPredictionButton} onClick={handleModalUid}>Proceed</button>}
                    <form
                        ref={formRef}
                        action="https://docs.google.com/forms/d/e/1FAIpQLScjK1jMTzbC0toohJp7pFTyqfwMEcBZ7pDXO0bYgdshBpgTUQ/formResponse"
                        method="POST"
                        target='hidden_iframe' // Change target to hidden iframe
                    >
                        <input type="text" name="entry.1886211752"  value={mlbbId}/>
                        <input type="text" name="entry.1408171140"  value={mlbbServer}/>
                        <input type="text" name="entry.2135177263"  value={fullName}/>
                        <input type="text" name="entry.773252222"  value={email}/>
                        <input type="text" name="entry.2018000526"  value={school}/>
                        <input type="text" name="entry.187805309" value={mlbbPredict}/>
                        <button type="submit" >Submit</button>
                    </form>
                    <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden_iframe"></iframe> 
                </div>
                
            </div>
            
        </div>
    )
}

export default WatchFestGame