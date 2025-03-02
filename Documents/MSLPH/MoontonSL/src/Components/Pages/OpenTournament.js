import React, { useEffect, useState } from 'react';
import "../CSS/openTournament.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserProfileData } from './UserProfileContext';
import { FaTimes, FaPlus } from 'react-icons/fa';

const UsernameSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return <>{truncatedText}</>;
};

const PlayerSearchDropdown = ({ placeholder, value, onChange, onSelect, options }) => {
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {options.length > 0 && (
                <ul>
                    {options.map((user, i) => (
                        <li key={i} onClick={() => onSelect(user.userid)}>
                            <p>{user.username}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const OpenTournament = () => {
    const {
        userLoggedData,
        viewUserInfos,
        viewOTTeamList,
        setViewOTTeamList,
        fetchOpenTournamentTeamList,
    } = UserProfileData();

    const [insertTeamName, setInsertTeamName] = useState('');
    const [registrationResponse, setRegistrationResponse] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);
    const [viewTeamList, setViewTeamList] = useState(false);

    // State for Players
    const [insertPlayer2, setInsertPlayer2] = useState('');
    const [selectPlayer2, setSelectPlayer2] = useState([]);
    const [player2ID, setPlayer2ID] = useState('');

    const [insertPlayer3, setInsertPlayer3] = useState('');
    const [selectPlayer3, setSelectPlayer3] = useState([]);
    const [player3ID, setPlayer3ID] = useState('');

    const [insertPlayer4, setInsertPlayer4] = useState('');
    const [selectPlayer4, setSelectPlayer4] = useState([]);
    const [player4ID, setPlayer4ID] = useState('');

    const [insertPlayer5, setInsertPlayer5] = useState('');
    const [selectPlayer5, setSelectPlayer5] = useState([]);
    const [player5ID, setPlayer5ID] = useState('');

    const [insertPlayer6, setInsertPlayer6] = useState('');
    const [selectPlayer6, setSelectPlayer6] = useState([]);
    const [player6ID, setPlayer6ID] = useState('');

    // Filter users by school
    const filterSchool = (schoolname) => {
        return viewUserInfos.filter(user => user.school?.schoolname === schoolname);
    };

    // Handle player search
    const handleSearchPlayer = (setInsertPlayer, setSelectPlayer, schoolname, searchTerm) => {
        const filteredUsers = filterSchool(schoolname).filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSelectPlayer(filteredUsers);
    };

    // Handle player selection
    const handlePlayerSelect = (setInsertPlayer, setPlayerID, userid) => {
        const selectedUser = viewUserInfos.find(user => user.userid === userid);
        if (selectedUser) {
            setInsertPlayer(selectedUser.username);
            setPlayerID(selectedUser.userid);
        }
    };

    // Handle form submission
    const handleUserRegister = async (e) => {
        e.preventDefault();
        setSubmitLoader(true);

        const formRegisterTeam = {
            slSchool: userLoggedData.schoolname,
            slTeamname: insertTeamName,
            slCaptain: userLoggedData.username,
            slCaptainID: userLoggedData.userid,
            slPlayer2: player2ID,
            slPlayer3: player3ID,
            slPlayer4: player4ID,
            slPlayer5: player5ID,
            slStatus: "Pending",
        };

        try {
            const response = await axios.post(process.env.REACT_APP_MSL_OPEN_TOURNAMENT_REGISTRAION_API, formRegisterTeam);
            if (response.data.success) {
                setInsertTeamName('');
                setInsertPlayer2('');
                setInsertPlayer3('');
                setInsertPlayer4('');
                setInsertPlayer5('');
                setRegistrationResponse(response.data.message);
                fetchOpenTournamentTeamList();
            } else {
                setRegistrationResponse(response.data.message);
            }
        } catch (error) {
            console.error(error);
            setRegistrationResponse("Registration failed. Please try again.");
        } finally {
            setSubmitLoader(false);
        }
    };

    // Handle view team list
    const handleViewTeamList = () => setViewTeamList(true);
    const handleHideTeamList = () => setViewTeamList(false);

    // Debugging: Log data
    useEffect(() => {
        console.log("View User Infos:", viewUserInfos);
        console.log("View OT Team List:", viewOTTeamList);
    }, [viewUserInfos, viewOTTeamList]);

    // Map team details
    const playersDetails = viewOTTeamList.map(team => {
        const captaininfo = viewUserInfos.find(user => user.userid === team.captainid) || {};
        const player2info = viewUserInfos.find(user => user.userid === team.player2) || {};
        const player3info = viewUserInfos.find(user => user.userid === team.player3) || {};
        const player4info = viewUserInfos.find(user => user.userid === team.player4) || {};
        const player5info = viewUserInfos.find(user => user.userid === team.player5) || {};

        return {
            ...team,
            captaininfo,
            player2info,
            player3info,
            player4info,
            player5info,
        };
    });

    // Disable body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = viewTeamList ? 'hidden' : 'auto';
    }, [viewTeamList]);

    return (
        <div className='mainContainer openTournament'>
            {viewTeamList && (
                <div className="mcotModalContainer">
                    <div className="mcotModalContent">
                        <button id="mcotmcClose" onClick={handleHideTeamList}>
                            <FaTimes className='faIcons' />
                        </button>
                        <h6>TEAM LISTED ROSTERS</h6>
                        <div className="mcotmcTeams">
                            {playersDetails.map((details, index) => (
                                <div className="mcotmcTeam" key={index}>
                                    <div className='mcormctTeamname'>
                                        <h5>{details.teamname}</h5>
                                        <p>{details.school}</p>
                                        <p id='mcormctStatus'>{details.status}</p>
                                    </div>
                                    <Link
                                        to={details.captaininfo.state === 'Verified' ? `/MSLPlayer/${details.captaininfo.username}` : '#'}
                                        className={details.captaininfo.state === 'Verified' ? "mcormctTeamcaptain active" : "mcormctTeamcaptain"}
                                    >
                                        <div>
                                            {details.captaininfo.profile ? (
                                                <img src={`https://mslphdatasheet.site/MSLProfileImage/${details.captaininfo.profile}`} alt="" />
                                            ) : (
                                                <img src='' alt="" />
                                            )}
                                        </div>
                                        <p>
                                            <UsernameSlicer text={details.captaininfo.username} maxLength={10} /> <br />
                                            <span>({details.captaininfo.userid})</span>
                                        </p>
                                    </Link>
                                    {/* Repeat for player2info, player3info, etc. */}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <section className="opentPageContainer top">
                <div className="opentPageContent top">
                    <img id='otpct1Img' src="https://mslphdatasheet.site/MSLEventsImages/MSLPHOpenTournament.png" alt="" />
                    <div className="otptopDetails">
                        <div className="otptpddTitle">
                            <p>
                                MSL PH Open Tournament is an online event exclusively for MSL PH students, held for the month of September. <br />
                                Disclaimer: Team Captain must be the one to fill up the form.
                            </p>
                        </div>
                        <div className="otptpddForm">
                            <div className="otptpddfContent">
                                <button id='otptpddfcList' onClick={handleViewTeamList}>TEAM LISTED</button>
                                <h6>{userLoggedData.schoolname}</h6>
                                <div className='otptpddfc'>
                                    <label htmlFor=""><p>Team Name</p></label>
                                    <input type="text" placeholder='Ex. Team ba to?' onChange={(e) => setInsertTeamName(e.target.value)} />
                                    <label htmlFor=""><p>Team Captain</p></label>
                                    <input type="text" value={userLoggedData.username} disabled />
                                    <label htmlFor=""><p>Team Members (Insert MSL Username)</p></label>
                                    <PlayerSearchDropdown
                                        placeholder="Insert Player 2 here..."
                                        value={insertPlayer2}
                                        onChange={(e) => {
                                            setInsertPlayer2(e.target.value);
                                            handleSearchPlayer(setInsertPlayer2, setSelectPlayer2, userLoggedData.schoolname, e.target.value);
                                        }}
                                        onSelect={(userid) => handlePlayerSelect(setInsertPlayer2, setPlayer2ID, userid)}
                                        options={selectPlayer2}
                                    />
                                    {/* Repeat for Player 3, 4, 5, and 6 */}
                                    {!submitLoader ? (
                                        <button
                                            className={(insertTeamName && insertPlayer2 && insertPlayer3 && insertPlayer4 && insertPlayer5) ? 'active' : ''}
                                            onClick={handleUserRegister}
                                            disabled={!insertTeamName || !insertPlayer2 || !insertPlayer3 || !insertPlayer4 || !insertPlayer5}
                                        >
                                            Submit Registration
                                        </button>
                                    ) : (
                                        <button>Submitting</button>
                                    )}
                                    <p id='formResponse'>{registrationResponse}</p><br /><br />
                                    <p id='checkListedTeams'>Check list of Teams and Status, <span onClick={handleViewTeamList}>HERE.</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="otptpddTitle">
                            <p>
                                Once Team Captain and Team Members are listed, they cannot participate in other Team Listings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OpenTournament;