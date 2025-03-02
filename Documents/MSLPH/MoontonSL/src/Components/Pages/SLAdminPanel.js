import React, { useEffect, useState } from 'react'
import "../CSS/studentApproval.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserProfileData } from './UserProfileContext';
import { 
    FaTimes,
    FaPlus
} from 'react-icons/fa';
import { 
    MdOutlineFiberNew 
} from "react-icons/md";
import { 
    RiSearchLine,
    RiFilterLine,
    RiShieldUserFill,
    RiUserForbidFill,
    RiPassExpiredLine,
    RiZoomInLine,
    RiZoomOutLine,
    RiFacebookBoxFill,
    RiSortAlphabetAsc     
} from "react-icons/ri";
import { TbSortAscendingLetters } from "react-icons/tb";


const UsernameSlicer = ({ text = '', maxLength }) => {
    const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  
    return (
      <>{truncatedText}</>
    );
};
const formatNumberToK = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
      return '';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
};
const NumberFormatter = ({ number }) => {
    return <>{formatNumberToK(number)}</>;
};
const AutoTextNormalizer = ({ encodedText, onNormalize }) => {
    const [decodedText, setDecodedText] = useState('');
    const [normalizedText, setNormalizedText] = useState('');
  
    useEffect(() => {
      const decodeText = (text) => {
        // Decode the URL-encoded text
        const decoded = decodeURIComponent(text);
  
        // Additional normalization if necessary (e.g., replacing special characters)
        const normalized = decoded
          .normalize('NFD') // Normalize to NFD form (decomposed form)
          .replace(/[\u0300-\u036f]/g, ''); // Remove combining diacritical marks
  
        return { decoded, normalized };
      };
  
      const { decoded, normalized } = decodeText(encodedText);
      setDecodedText(decoded);
      setNormalizedText(normalized);
      onNormalize(normalized);
    }, [encodedText, onNormalize]);
  
    return (
      <>{normalizedText}</>
    );
};

const SLAdminPanel = () => {
    const { 
        userLoggedData, 
        viewBasicInfos, 
        viewUserInfos, 
        fetchUserSchoolData 
    } = UserProfileData();
    const LoginUserIGN = localStorage.getItem('mslUserIGN');
    const LoginUsername = localStorage.getItem('mslUserUsername');
    const LoginUserID = localStorage.getItem('mslUserID');
    const userAdministrator = userLoggedData.administrator
    const MSLUserUpdateState = process.env.REACT_APP_MSL_USER_VERIFY_PROFILE_API;
    

    // Fetching and Details Sorting

    const allVerified = viewUserInfos.filter(user => user.state === "Verified");
    const allNew = viewUserInfos.filter(user => user.state === "New");
    const allBlocked = viewUserInfos.filter(user => user.state === "Blocked");

    // Ensure user.school exists before trying to access user.school.schoolname
    const filterSLApproval = viewUserInfos.filter(user => 
        user.school && user.school.schoolname === userLoggedData.schoolname
    );
    
    
    const filterSLStudentApproval = filterSLApproval.filter(user => user.administrator === "")
    const slVerified = filterSLApproval.filter(verified => verified.state === "Verified")
    const slNew = filterSLApproval.filter(verified => verified.state === "New")
    const slBlocked = filterSLApproval.filter(verified => verified.state === "Blocked")


    const mslAdministrator = viewBasicInfos.filter(admin => admin.administrator !== "")

    // View Selected User Details
    
    const [normalizedIGN, setNormalizedIGN] = useState('');
    const [viewUserDetails, setViewUserDetails] = useState(false)
    const [viewSLApproval, setViewSLApproval] = useState(true);
    const [viewCreateBWT, setViewCreateBWT] = useState(false);
    const [viewCreateBracket, setViewCreateBracket] = useState(false);
    const [viewUserSpecifics, setViewUserSpecifics] = useState(null);
    const [viewUserVerifier, setViewUserVerifier] = useState(null);

    const handleViewUserDetails = (userID) => {
        setViewUserDetails(true);
        const user = viewUserInfos.find(userData => userData.userid === userID);
        const userVerifier = mslAdministrator.find(verifier => verifier.userid === user.verifiedby);
        setViewUserVerifier(userVerifier ? userVerifier : null)
        setViewUserSpecifics(user);
    }
    const handleHideUserDetails = () =>{
        setViewUserDetails(false)
    }
    const handleViewSLApproval = () => {
        setViewSLApproval(true)
        setViewCreateBWT(false)
        setViewCreateBracket(false)
    }
    const handleViewCreateBWT = () => {
        setViewSLApproval(false)
        setViewCreateBWT(true)
        setViewCreateBracket(false)
    }
    const handleViewCreateBracket = () => {
        setViewSLApproval(false)
        setViewCreateBWT(false)
        setViewCreateBracket(true)
    }


    // Show COE/COR Function

    const [viewCOEAttachment, setViewCOEAttachment] = useState(false);
    const handleViewCOE = () => {
        setViewCOEAttachment(true)
    }
    const handleHideCOE = () => {
        setViewCOEAttachment(false)
    }

    // Verify, Unverify, Block, Unblock Functions

    const [viewVerifiedBy, setViewVerifiedBy] = useState(false)
    const [viewVerifyModal, setViewVerifyModal] = useState(false)
    const [viewUnverifyModal, setViewUnerifyModal] = useState(false)
    const [viewRenewModal, setViewRenewModal] = useState(false)
    const [viewBlockingModal, setViewBlockingModal] = useState(false)
    const [blockingStatement, setBlockingStatement] = useState('')

    const handleViewVerifiedBy = () => {
        setViewVerifiedBy(true)
        const timeout = setTimeout(() => {
            setViewVerifiedBy(false)
        }, 5000);
        return () => {clearTimeout(timeout);};
    }
    const handleVerifyUser = async (userID) => {
        const formVerifyUser ={
          slUserID: userID,
          slState: "Verified",
          slAdmin: LoginUserID,
          slStatement: "",
          slVerifyDate: new Date(),
        }
        try {
            const jsonUserVerifyUser = JSON.stringify(formVerifyUser);
            const response = await axios.post(MSLUserUpdateState, jsonUserVerifyUser);
            const resMessage = response.data;
            if (resMessage.success === false) {
                console.log("Verifying Error, Check Database Error");
            }
            if (resMessage.success === true) {
                console.log("MSL Verified Successfully");
                handleHideVerifyModal();
                setViewUserDetails(false);
                fetchUserSchoolData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUnverifyUser = async (userID) => {
        const formVerifyUser ={
          slUserID: userID,
          slState: "Renew",
          slAdmin: LoginUserID,
          slStatement: "",
        }
        try {
            const jsonUserVerifyUser = JSON.stringify(formVerifyUser);
            const response = await axios.post(MSLUserUpdateState, jsonUserVerifyUser);
            const resMessage = response.data;
            if (resMessage.success === false) {
                console.log("Unverifying Error, Check Database Error");
            }
            if (resMessage.success === true) {
                console.log("MSL Unverified Successfully");
                setViewUnerifyModal(false);
                setViewUserDetails(false);
                fetchUserSchoolData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleBlockUser = async (userID) => {
        const formVerifyUser ={
          slUserID: userID,
          slState: "Blocked",
          slAdmin: LoginUserID,
          slStatement: blockingStatement,
          slBlockDate: new Date(),
        }
        try {
            const jsonUserVerifyUser = JSON.stringify(formVerifyUser);
            const response = await axios.post(MSLUserUpdateState, jsonUserVerifyUser);
            const resMessage = response.data;
            if (resMessage.success === false) {
                console.log("Blocking Error, Check Database Error");
            }
            if (resMessage.success === true) {
                console.log("User Blocked Successfully");
                setViewUserDetails(false);
                setViewBlockingModal(false)
                setBlockingStatement('')
                fetchUserSchoolData();
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleViewVerifyModal = async (userID) => {
        setViewVerifyModal(true)
        const user = viewUserInfos.find(userData => userData.userid === userID);
        setViewUserSpecifics(user);
    }
    const handleViewUnverifyModal = async (userID) => {
        setViewUnerifyModal(true)
        const user = viewUserInfos.find(userData => userData.userid === userID);
        setViewUserSpecifics(user);
    }
    const handleViewRenewModal = async (userID) => {
        setViewRenewModal(true)
        const user = viewUserInfos.find(userData => userData.userid === userID);
        setViewUserSpecifics(user);
    }
    const handleHideVerifyModal = () => {
        setViewVerifyModal(false)
        setViewUnerifyModal(false)
        setViewRenewModal(false)
    }
    const handleViewBlockModal = async (userID) => {
        setViewBlockingModal(true)
        const user = viewUserInfos.find(userData => userData.userid === userID);
        setViewUserSpecifics(user);
    }
    const handleHideBlockModal = () => {
        setViewBlockingModal(false)
        setBlockingStatement('')
    }


    // Search Username Function
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedSort, setSelectedSort] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortChange = (event) => {
        setSelectedSort(event.target.value);
    };

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const sortData = (data) => {
        return data.sort((a, b) => {
            let valueA, valueB;

            switch (selectedSort) {
                case 'Name':
                    valueA = a.basic.givenname.toLowerCase();
                    valueB = b.basic.givenname.toLowerCase();
                    break;
                case 'Username':
                    valueA = a.basic.username.toLowerCase();
                    valueB = b.basic.username.toLowerCase();
                    break;
                case 'IGN':
                    valueA = a.mlbb.ign ? a.mlbb.ign.toLowerCase() : '';
                    valueB = b.mlbb.ign ? b.mlbb.ign.toLowerCase() : '';
                    break;
                case 'School':
                    valueA = a.school.schoolname ? a.school.schoolname.toLowerCase() : '';
                    valueB = b.school.schoolname ? b.school.schoolname.toLowerCase() : '';
                    break;
                case 'Blacklisted':
                    valueA = a.state.toLowerCase() === 'blacklisted' ? a.basic.username.toLowerCase() : '';
                    valueB = b.state.toLowerCase() === 'blacklisted' ? b.basic.username.toLowerCase() : '';
                    break;
                default:
                    return 0;
            }

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
    };

    const filterData = (data) => {
        return data.filter(details => {
            if (selectedFilter && selectedFilter !== details.state) return false;
            return details.username.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    const filteredAndSortedDataAll = sortData(filterData(viewUserInfos));
    const filteredAndSortedDataLimited = sortData(filterData(filterSLStudentApproval));





    // Zoom and Pan COE/COR
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [origin, setOrigin] = useState({ x: 0, y: 0 });

    const handleZoomIn = () => {
        setScale(prevScale => Math.min(prevScale + 0.1, 3)); // Max zoom level
    };
    const handleZoomOut = () => {
        setScale(prevScale => Math.max(prevScale - 0.1, 1)); // Min zoom level
    };
    const handleMouseDown = (e) => {
        if (e.button !== 0) return; // Only respond to left mouse button

        setDragging(true);
        setOrigin({ x: e.clientX, y: e.clientY });
    };
    const handleMouseMove = (e) => {
        if (!dragging) return;

        const deltaX = e.clientX - origin.x;
        const deltaY = e.clientY - origin.y;
        setOrigin({ x: e.clientX, y: e.clientY });
        setPosition(prevPos => ({
        x: prevPos.x + deltaX,
        y: prevPos.y + deltaY,
        }));
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    const isImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/i);
    };

    return (
        <div className='mainContainer studentApproval'>
            {viewUserDetails && <div className="slPanelContainerModal">
                <div className="slPanelContentModal">
                    <button className='slpcButtonClose' onClick={handleHideUserDetails}><FaTimes className='faIcons'/></button>
                    <div className="slpcmContents left">
                        {(viewUserSpecifics.state === 'Verified') &&<div className="slpcmclVerified" onClick={handleViewVerifiedBy}>
                            <h4><RiShieldUserFill className="faIcons"/></h4>
                        </div>}
                        {(viewUserSpecifics.state === 'Verified' && viewVerifiedBy) &&<div className="slpcmclVerifiedBy">
                            <p>{(viewUserSpecifics.state === "Verified") ? `Verified by ${viewUserVerifier.username}` : ''}</p>
                        </div>}
                        {(viewUserSpecifics.state === 'New') &&<div className="slpcmclNewUser">
                            <h4><MdOutlineFiberNew className="faIcons"/></h4>
                        </div>}
                        {(viewUserSpecifics.state === 'Renew') &&<div className="slpcmclNewUser">
                            <h4><RiPassExpiredLine  className="faIcons"/></h4>
                        </div>}
                        {(viewUserSpecifics.state === 'Blocked') &&<div className="slpcmclBlockedUser">
                            <h4><RiUserForbidFill  className="faIcons"/></h4>
                        </div>}
                        <div className="slpcmclImage">
                            {viewUserSpecifics.profile ? 
                            <img src={`https://mslphdatasheet.site/MSLProfileImage/${viewUserSpecifics.profile}`} alt="" />:
                            <img src='' gender={viewUserSpecifics.basic.gender} alt="" />}
                        </div>
                        {(viewUserSpecifics.state === 'Blocked') && <div className="slpcmclBlockStatement">
                            <h6>{viewUserSpecifics.basic.username} was Blocked:</h6>
                            <p id='slpcmclbs'>{viewUserSpecifics.blockingstatement}</p>
                            <p id='slpcmclbsAuthor'>Blocked By. {viewUserVerifier.username}</p>
                        </div>}
                        <h1 id='slpcmclIGN'><AutoTextNormalizer encodedText={viewUserSpecifics.mlbb.mslign ? viewUserSpecifics.mlbb.mslign : LoginUserIGN} onNormalize={setNormalizedIGN}/></h1>
                        <div className="slpcmclBasics">
                            <span>
                            <p>Full Name:</p>
                            <h6>{viewUserSpecifics.basic.givenname} {viewUserSpecifics.basic.surname} {viewUserSpecifics.basic.suffix}</h6>
                            </span>
                                <p>School Name:</p>
                                <h6>{viewUserSpecifics.school.schoolname}</h6>
                            <span>
                                <p>Year Level:</p>
                                <h6>{viewUserSpecifics.school.schoolyear}</h6>
                            </span>
                        </div>
                    </div>
                    <div className="slpcmContents right">
                        <div className="slpcmcrDetails">
                            <div className="slpcmcrFullname">
                                <p>Account Username:</p>
                                <h6>{viewUserSpecifics.basic.username && <UsernameSlicer text={viewUserSpecifics.basic.username} maxLength={22} />}</h6>
                            </div>
                            <div className="slpcmcrContact">
                                <p>MLBB ID (Server)</p>
                                <h6>{viewUserSpecifics.mlbb.mslid} ({viewUserSpecifics.mlbb.mslserver})</h6>
                            </div>
                            <div className="slpcmcrBirthday">
                                <p>In-Game Name (IGN)</p>
                                <h6>{viewUserSpecifics.mlbb.mslign && <UsernameSlicer text={normalizedIGN} maxLength={22} />}</h6>
                            </div>
                            <div className="slpcmcrGender">
                                <p>Gender</p>
                                <h6>{viewUserSpecifics.basic.gender}</h6>
                            </div>
                            <div className="slpcmcrAge">
                                <p>Age</p>
                                <h6>{viewUserSpecifics.basic.age}</h6>
                            </div>
                            <div className="slpcmcrBirthday">
                                <p>Birthday</p>
                                <h6>{viewUserSpecifics.basic.birthday}</h6>
                            </div>
                            <div className="slpcmcrContact">
                                <p>Contact No.</p>
                                <h6>{viewUserSpecifics.basic.contact}</h6>
                            </div>
                            <div className="slpcmcrEmail">
                                <p>Email</p>
                                <h6><UsernameSlicer text={viewUserSpecifics.basic.email} maxLength={25} /></h6>
                            </div>
                            <div className="slpcmcrFacebook">
                                <p>Facebook Link</p>
                                <h6><UsernameSlicer text={viewUserSpecifics.facebook} maxLength={25} /></h6>
                            </div>
                            <div className="slpcmcrArea">
                                <p>School Area:</p>
                                <h6>{viewUserSpecifics.school.schoolarea}</h6>
                            </div>
                            <div className="slpcmcrRegion">
                                <p>School Region:</p>
                                <h6>{viewUserSpecifics.school.schoolregion}</h6>
                            </div>
                            <div className="slpcmcrStudentID">
                                <p>Student ID:</p>
                                <h6>{viewUserSpecifics.school.schoolid}</h6>
                            </div>
                            <div className="slpcmcrCourse">
                                <p>Course</p>
                                <h6>{viewUserSpecifics.school.schoolcourse}</h6>
                            </div>
                        </div>
                        <div className="slpcmcrCertificate">
                            <p>COE/COR</p>
                            <div>
                                <button onClick={handleViewCOE}>Attactment</button>
                                <button onClick={() => handleViewRenewModal(viewUserSpecifics.userid)}>Renew</button>
                            </div>
                        </div>
                        <div className="slpcmcrCommand">
                            {(userAdministrator === "Super Admin" || userAdministrator === "Admin") && <>
                                {(viewUserSpecifics.state === "Verified") ? 
                                <button id='slpcmcrcUnverify' onClick={() => handleViewUnverifyModal(viewUserSpecifics.userid)}>Unverify</button>:
                                <button id={(viewUserSpecifics.state === "Blocked") ? 'disabled' : 'slpcmcrcVerify'} disabled={viewUserSpecifics.state === "Blocked"} onClick={() => handleViewVerifyModal(viewUserSpecifics.userid)}>Verify</button>}
                                {(viewUserSpecifics.state === "Blocked") ? 
                                <button id='slpcmcrcBlock' onClick={() => handleUnverifyUser(viewUserSpecifics.userid)}>Unblock</button>:
                                <button id='slpcmcrcBlock' onClick={() => handleViewBlockModal(viewUserSpecifics.userid)}>Block</button>}
                                <button id='slpcmcrcDelete'>Delete</button>
                            </>}
                            {(userAdministrator === "SL") &&<>
                                {(viewUserSpecifics.state === "Verified") ? 
                                <button id='slpcmcrcUnverify' onClick={() => handleViewUnverifyModal(viewUserSpecifics.userid)}>Unverify</button>:
                                <button id={(viewUserSpecifics.state === "Blocked") ? 'disabled' : 'slpcmcrcVerify'} disabled={viewUserSpecifics.state === "Blocked"} onClick={() => handleViewVerifyModal(viewUserSpecifics.userid)}>Verify</button>}
                                {(viewUserSpecifics.state === "Blocked") ? 
                                <button id='slpcmcrcBlock' onClick={() => handleUnverifyUser(viewUserSpecifics.userid)}>Unblock</button>:
                                <button id='slpcmcrcBlock' onClick={() => handleViewBlockModal(viewUserSpecifics.userid)}>Block</button>}
                            </>}
                        </div>
                        {viewCOEAttachment && <div className="slpcmcrShow"onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                            {isImage(`https://mslphdatasheet.site/MSLUserEnrollmentCert/${viewUserSpecifics.school.enrollmentcert}`) ?<>
                            <img src={`https://mslphdatasheet.site/MSLUserEnrollmentCert/${viewUserSpecifics.school.enrollmentcert}`} alt="" 
                            style={{
                                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                                cursor: dragging ? 'grabbing' : 'grab',
                            }} className="zoom-pan-image" onMouseDown={handleMouseDown}/>
                            </>:<>
                            <iframe src={`https://mslphdatasheet.site/MSLUserEnrollmentCert/${viewUserSpecifics.school.enrollmentcert}`} title="PDF Viewer"/></>}
                            <div>
                                {isImage(`https://mslphdatasheet.site/MSLUserEnrollmentCert/${viewUserSpecifics.school.enrollmentcert}`) ?<>
                                <button className='zoomInCOE' onClick={handleZoomIn}><RiZoomInLine className="faIcons"/></button>
                                <button className='zoomInCOE' onClick={handleZoomOut}><RiZoomOutLine className="faIcons"/></button>
                                </>:<></>}
                                <button onClick={handleHideCOE}>Close Attachment</button>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>}

            {viewVerifyModal && <div className="slPanelVContainerModal">
                <div className="slPanelVerifyModal">
                    <button className='slpvButtonClose' onClick={handleHideVerifyModal}><FaTimes className='faIcons'/></button>
                    <h3>🤨</h3>
                    <h6>Sure kana ba mhie na i-verify si <br /> {viewUserSpecifics.basic.username} ?</h6>
                    <div>
                        <button onClick={() => handleVerifyUser(viewUserSpecifics.userid)}>Gorabels</button>
                        <button onClick={handleHideVerifyModal}>Naurrr</button>
                    </div>
                </div>
            </div>}
            {viewUnverifyModal && <div className="slPanelVContainerModal">
                <div className="slPanelVerifyModal">
                    <button className='slpvButtonClose' onClick={handleHideVerifyModal}><FaTimes className='faIcons'/></button>
                    <h3>🤨</h3>
                    <h6>Sure kana ba mhie na i-unverify si <br /> {viewUserSpecifics.basic.username} ?</h6>
                    <div>
                        <button onClick={() => handleUnverifyUser(viewUserSpecifics.userid)}>Gorabels</button>
                        <button onClick={handleHideVerifyModal}>Naurrr</button>
                    </div>
                </div>
            </div>}
            {viewRenewModal && <div className="slPanelVContainerModal">
                <div className="slPanelVerifyModal">
                    <button className='slpvButtonClose' onClick={handleHideVerifyModal}><FaTimes className='faIcons'/></button>
                    <h3>😩</h3>
                    <h6>Mali ba ang ipinasang COE/COR ni <br /> {viewUserSpecifics.basic.username} ?</h6>
                    <div>
                        <button onClick={() => handleUnverifyUser(viewUserSpecifics.userid)}>Oum</button>
                        <button onClick={handleHideVerifyModal}>Eme</button>
                    </div>
                </div>
            </div>}
            {viewBlockingModal && <div className="slPanelBContainerModal">
                <div className="slPanelBlockModal">
                    <button className='slpbButtonClose' onClick={handleHideBlockModal}><FaTimes className='faIcons'/></button>
                    <h3>🥺</h3>
                    <h6>Why naman ibo-block si {(viewUserSpecifics.basic.gender === "Male") ? "kuya mo" : "ate mo girl"} <br /> {viewUserSpecifics.basic.username} ?</h6>
                    <textarea name="" id="" placeholder='Spill the tea here...' onChange={(e) => setBlockingStatement(e.target.value)}></textarea>
                    <div>
                        <button className={!blockingStatement ? 'disabled' : ''} disabled={!blockingStatement}  onClick={() => handleBlockUser(viewUserSpecifics.userid)} >Dasurv</button>
                        <button onClick={handleHideBlockModal}>It's a No</button>
                    </div>
                </div>
            </div>}




            <section className="sApPageContainer top">
                <div className="sApPageContentr top">
                    <div className="sapctContent left">
                        {/* <h3>Welcome {userLoggedData.administrator} - {userLoggedData.username},</h3>
                        <p>
                            Welcome to the SL Admin Panel. Here, admins can manage student registrations, create 
                            Tournament Registrations, schedule events, and organize Battle Bracketing. 
                            Please verify student credentials to confirm membership in MSL and enrollment status. <br /><br /> 
                            - Verifier actions are logged for transparency. Thank you for your attention.
                        </p> */}
                        <div className="sapctclProfile left">
                            {userLoggedData.profile ? 
                            <img src={`https://mslphdatasheet.site/MSLProfileImage/${userLoggedData.profile}`} alt="" />:
                            <img src='' gender={userLoggedData.gender} alt="" />}
                        </div>
                        <div className="sapctclProfile right">
                            <h4>{userLoggedData.username}</h4>
                            <p>{userLoggedData.givenname} {userLoggedData.surname} {userLoggedData.suffix}</p>
                            <div>
                                <span className='sapctclpr'>
                                    <p>Role</p>
                                    <h6>{userLoggedData.administrator}</h6>
                                </span>
                                <span>
                                    <p>Year Level</p>
                                    <h6>{userLoggedData.schoolyear}</h6>
                                </span>
                                <span className='sapctclpr'>
                                    <p>Area</p>
                                    <h6>{userLoggedData.schoolarea}</h6>
                                </span>
                                <span>
                                    <p>Region</p>
                                    <h6>{userLoggedData.schoolregion}</h6>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="sapctContent right">
                        <div className='sapctcrSchool'>
                            <p>Your School/Institution</p>
                            <h6><UsernameSlicer text={userLoggedData.schoolname} maxLength={30} /></h6>
                        </div>
                        <div className='sapctcrVerified'>
                            <p>MSL Verified</p>
                            <h5>
                                {(
                                    userAdministrator === "Super Admin" || 
                                    userAdministrator === "National Admin" 
                                ) && allVerified.length}
                                {(userAdministrator === "SL") && slVerified.length}
                            </h5>
                        </div>
                        <div className='sapctcrVerified'>
                            <p>Newly Registered</p>
                            <h5>
                                <NumberFormatter number={(
                                    userAdministrator === "Super Admin" || 
                                    userAdministrator === "National Admin" 
                                    ) && allNew.length} />
                                <NumberFormatter number={(userAdministrator === "SL") && slNew.length} />
                            </h5>
                        </div>
                        <div className='sapctcrVerified'>
                            <p>Blocked</p>
                            <h5>
                                <NumberFormatter number={(
                                    userAdministrator === "Super Admin" || 
                                    userAdministrator === "National Admin" 
                                    ) && allBlocked.length} />
                                <NumberFormatter number={(userAdministrator === "SL") && slBlocked.length} />
                            </h5>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sApPageContainer mid">
                <div className="sApPageContainermNav">
                    <div className='sapcmnLeft'>
                        <button className={viewSLApproval ? 'active' : ''} onClick={handleViewSLApproval}>Student Approval</button>
                        <button className={viewCreateBWT ? 'active' : ''} onClick={handleViewCreateBWT}>Create Tournament</button>
                        <button className={viewCreateBracket ? 'active' : ''} onClick={handleViewCreateBracket}>Tournament Bracket</button>
                    </div>
                    <div className="sapcmnRight">
                        <input type="text" placeholder='Search MSL Username' value={searchQuery} onChange={handleSearchChange} />
                        <div>
                            <h6><TbSortAscendingLetters className='faIcons' /></h6>
                            <select name="" id="" onChange={handleSortChange} value={selectedSort}>
                                <option value="">Arrange By</option>
                                <option value="Name">Name</option>
                                <option value="Username">Username</option>
                                <option value="IGN">IGN</option>
                                <option value="School">School</option>
                            </select>
                        </div>
                        <div>
                            <h6><RiFilterLine className='faIcons' /></h6>
                            <select name="" id="" onChange={handleFilterChange} value={selectedFilter}>
                                <option value="">Filter By</option>
                                <option value="New">New</option>
                                <option value="Renew">Renew</option>
                                <option value="Verified">Verified</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                </div>
                {viewSLApproval && <div className="sApPageContent mid">
                    <table>
                        <thead>
                            <tr>
                                <th width="25%"><p>MSL Account</p></th>
                                <th width="20%"><p>Fullname</p></th>
                                <th width="20%"><p>{(userAdministrator === "Super Admin" || userAdministrator === "National Admin") ? 'School / Institution' : 'Course'}</p></th>
                                <th width="12%"><p>Year Level</p></th>
                                <th width="13%"><p>Status</p></th>
                                <th width="10%"><p>Details</p></th>
                                {/* <th width="20%"><p>Commands</p></th> */}
                            </tr>
                        </thead>
                    </table>
                    <div className="sappcmTableContents">
                        <table id='sappcmTable'>
                            <tbody>
                                {(userAdministrator === "Super Admin" || userAdministrator === "National Admin") && <>
                                    {filteredAndSortedDataAll.length === 0 ? 
                                    <>
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                                <p>MSL User does not exist or listed</p>
                                            </td>
                                        </tr>
                                    </>:<>
                                        {filteredAndSortedDataAll.map((details, index) => (
                                            <tr key={index}>
                                                <td width="25%" id='sappcmtDetails'>
                                                    <div className="sappcmtdImg">
                                                        {details.profile ? 
                                                        <img src={`https://mslphdatasheet.site/MSLProfileImage/${details.profile}`} alt="" />:
                                                        <img src='' gender={details.basic && details.basic.gender} alt="" />}
                                                    </div>
                                                    <div className="sappcmtdFacebook">
                                                        {details.facebook ? 
                                                        <a href={details.facebook} target='blank'><RiFacebookBoxFill className='faIcons'/></a>:
                                                        <h4><RiFacebookBoxFill className='faIcons'/></h4>}
                                                    </div>
                                                    <div className="sappcmtdDet">
                                                        <h6><UsernameSlicer text={details.username} maxLength={14} /></h6>
                                                        <p>{details.mlbb && details.mlbb.mslid} ({details.mlbb && details.mlbb.mslserver})</p>
                                                    </div>
                                                </td>
                                                <td width="20%" id='sappcmtFullname'><p>{details.basic && details.basic.givenname} { details.basic && details.basic.surname} {details.basic && details.basic.suffix}</p></td>
                                                <td width="20%"><p>{details.school && details.school.schoolname}</p></td>
                                                <td width="12%" id='sappcmtYear'><p>{details.school && details.school.schoolyear}</p></td>
                                                <td width="13%" id='sappcmtState'><p>{details.state}</p></td>
                                                <td width="10%" id='sappcmtCOR'><button onClick={() => handleViewUserDetails(details.userid)}>View Profile</button></td>
                                            </tr>
                                        ))}
                                    </>}
                                </>}
                                {(userAdministrator === "SL") && <>
                                    {filteredAndSortedDataLimited.length === 0 ?
                                    <>
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                                <p>MSL User does not exist or listed on your school</p>
                                            </td>
                                        </tr>
                                    </>:<>
                                        {filteredAndSortedDataLimited.map((details, index) => (
                                            <tr key={index}>
                                                <td width="25%" id='sappcmtDetails'>
                                                    <div className="sappcmtdImg">
                                                        {details.profile ? 
                                                        <img src={`https://mslphdatasheet.site/MSLProfileImage/${details.profile}`} alt="" />:
                                                        <img src='' gender={details.basic.gender} alt="" />}
                                                    </div>
                                                    <div className="sappcmtdFacebook">
                                                        {details.facebook ? 
                                                        <a href={details.facebook} target='blank'><RiFacebookBoxFill className='faIcons'/></a>:
                                                        <h4><RiFacebookBoxFill className='faIcons'/></h4>}
                                                    </div>
                                                    <div className="sappcmtdDet">
                                                        <h6><UsernameSlicer text={details.basic.username} maxLength={14} /></h6>
                                                        <p>{details.mlbb.mslid} ({details.mlbb.mslserver})</p>
                                                    </div>
                                                </td>
                                                <td width="20%" id='sappcmtFullname'><p>{details.basic.givenname} {details.basic.surname} {details.basic.suffix}</p></td>
                                                <td width="20%"><p>{details.school.schoolcourse}</p></td>
                                                <td width="12%" id='sappcmtYear'><p>{details.school.schoolyear}</p></td>
                                                <td width="13%" id='sappcmtState'><p>{details.state}</p></td>
                                                <td width="10%" id='sappcmtCOR'><button onClick={() => handleViewUserDetails(details.userid)}>View Profile</button></td>
                                            </tr>
                                        ))}
                                    </>}
                                </>}
                            </tbody>
                        </table>
                    </div>
                </div>}
            </section>
            <section className="sApPageContainer bottom">
                <div className="sApPageContent bottom1">

                </div>
            </section>
        </div>
    )
}

export default SLAdminPanel