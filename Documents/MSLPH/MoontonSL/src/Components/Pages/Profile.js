import React, { useEffect, useState } from 'react'
import "../CSS/profile.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroData from '../Json/HeroData.json';
import { UserProfileData } from './UserProfileContext';
import { 
  RiVerifiedBadgeFill,
  RiGroupFill,
  RiEdit2Fill,
  RiShieldCheckFill  
} from "react-icons/ri";
import { 
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle  
} from "react-icons/io";
import { 
  TbSquareRoundedPlus,
  TbUserEdit,
  TbUserShield,
  TbShieldCog,
  TbShieldCheckFilled,
  TbPhotoEdit     
} from "react-icons/tb";
import { FaTimes } from 'react-icons/fa';
import SLAllCourses from '../Json/SLAllCourses.json'

const getApiUrl = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.REACT_APP_API_URL_DEV;
    case 'test':
      return process.env.REACT_APP_API_URL_TEST;
    case 'production':
      return process.env.REACT_APP_API_URL_PROD;
    default:
      return process.env.REACT_APP_API_URL_DEV;
  }
};
const UsernameSlicer = ({ text = '', maxLength }) => {
  const truncatedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <>{truncatedText}</>
  );
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


const Profile = () => {
  const { userLoggedData, viewEditProfile, setViewEditProfile } = UserProfileData();
  const LoginUserIGN = localStorage.getItem('mslUserIGN');
  
  const MSLUserUpdateDataAPI = process.env.REACT_APP_MSL_USER_UPDATE_PROFILE_API;
  const MSLUserCustomDPAPI = process.env.REACT_APP_MSL_USER_ADD_DP_API;
  const [viewRecentTournaments, setViewRecentTournaments] = useState(true);
  const [viewBiWeeklyTournaments, setViewBiWeeklyTournaments] = useState(false);
  const [viewMCCApperance, setViewMCCApperance] = useState(false);
  const [viewFollowers, setViewFollowes] = useState(false);
  const [viewSquadmates, setViewSquadmates] = useState(false);
  const [mslUserCourse, setMSLUserCourse] = useState('');
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [viewEditUsername, setViewEditUsername] = useState(false);
  const [viewEditEmail, setViewEditEmail] = useState(false);
  const [viewEditFacebook, setViewEditFacebook] = useState(false);
  const [viewEditCourse, setViewEditCourse] = useState(false);
  const [viewEditSquad, setViewEditSquad] = useState(false);
  const [normalizedIGN, setNormalizedIGN] = useState('');

  const heroDetails = HeroData.find(hero => hero.name === userLoggedData.mslhero);
  const heroDetails2 = HeroData.find(hero => hero.name === userLoggedData.mslhero2);
  const heroDetails3 = HeroData.find(hero => hero.name === userLoggedData.mslhero3);

  const handleViewRecentTournament = () => {
    setViewRecentTournaments(true);
    setViewBiWeeklyTournaments(false);
    setViewMCCApperance(false);
    setViewFollowes(false);
  }
  const handleViewBiWeeklyTournament = () => {
    setViewRecentTournaments(false);
    setViewBiWeeklyTournaments(true);
    setViewMCCApperance(false);
    setViewFollowes(false);
  }
  const handleViewMCCApperance = () => {
    setViewRecentTournaments(false);
    setViewBiWeeklyTournaments(false);
    setViewMCCApperance(true);
    setViewFollowes(false);
  }
  const handleViewFollowers = () => {
    setViewRecentTournaments(false);
    setViewBiWeeklyTournaments(false);
    setViewMCCApperance(false);
    setViewFollowes(true);
  }
  const handleViewSquadmates = () => {
    setViewSquadmates(true);
    const timeout = setTimeout(() => {
      setViewSquadmates(false)
    }, 5000); // 5 seconds
    return () => {clearTimeout(timeout);};
  }
  const handleHideSquadmates = () => {
    setViewSquadmates(false)
  }
  const handleEditProfile = () => {
    setViewEditProfile(true)
  }
  const handleCloseEitProfile = () => {
    setViewEditProfile(false)
  }
  const handleEditCourse = () => {
    setViewEditCourse(true)
  }
  const handleHideEditCourse = () => {
    setViewEditCourse(false);
    setMSLUserCourse('');
    setCourseSearchTerm('');
  }
  const handleEditUsername = () => {
    setViewEditUsername(true)
  }
  const handleHideEditUsername = () => {
    setViewEditUsername(false)
  }
  const handleEditEmail = () => {
    setViewEditEmail(true)
  }
  const handleHideEditEmail = () => {
    setViewEditEmail(false)
  }
  const handleEditFacebook = () => {
    setViewEditFacebook(true)
  }
  const handleHideEditFacebook = () => {
    setViewEditFacebook(false)
  }
  const handleEditSquad = () => {
    setViewEditSquad(true)
  }
  const handleHideEditSquad = () => {
    setViewEditSquad(false)
  }

  const handleCourseSearchChange = (e) => {
    const value = e.target.value;
    setCourseSearchTerm(value);

    const filtered = SLAllCourses
      .filter((course) =>
        course.program && course.program.toLowerCase().includes(value.toLowerCase())
      )
      .sort((a, b) => a.program.localeCompare(b.program)); // Sort alphabetically by course name

    setFilteredCourses(filtered);
  };
  const handleCourseSelect = (course) => {
    setMSLUserCourse(course.program);
    setCourseSearchTerm(course.program);
    setFilteredCourses([]);
  };

  const [imageDP, setImageDP] = useState(null);
  const [imageDPName, setImageDPName] = useState('');
  const handleUploadUserDP = (event) => {
      const file = event.target.files[0];
      if (file) {
        setImageDP(file);
        setImageDPName(file.name);
      }
  };
  const renderProfileUser = () => {
    if (imageDPName == ''){
      return (
        `${userLoggedData.profile}`
      );
    } else {
      return (
        `${userLoggedData.username}_${userLoggedData.mslid}_${imageDPName}`
      );
    }
  };

  const [mslUsername, setMSLUsername] = useState('');
  const [mslEmail, setMSLEmail] = useState('');
  const [mslFacebook, setMSLFacebook] = useState('');
  const [mslSchoolYear, setMSLSchoolYear] = useState('');
  const [mslUserSquad1, setMSLUserSquad1] = useState('');
  const [mslUserSquad2, setMSLUserSquad2] = useState('');
  const [mslUserRank, setMSLUserRank] = useState('');
  const [mslUserRole, setMSLUserRole] = useState('');
  const [mslUserHero, setMSLUserHero] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setMSLEmail(email);

    if (!validateEmail(email)) {
      // setErrorEmailResponse(true);
      // setMessageResponse('Please enter a valid email address');
    }else{
      // setErrorEmailResponse(false);
    }
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();

    const formUpdateUser = {
      slUserID: userLoggedData.mslid,
      slUserDP: renderProfileUser(),
      slUsername: mslUsername || userLoggedData.username,
      slEmail: mslEmail || userLoggedData.email,
      slFacebook: mslFacebook || userLoggedData.facebook,
      slSchoolYr: mslSchoolYear || userLoggedData.schoolyear,
      slSchoolCourse: mslUserCourse || userLoggedData.schoolcourse,
      slSquad1: mslUserSquad1 || userLoggedData.mslsquad1,
      slSquad2: mslUserSquad2 || userLoggedData.mslsquad2,
      slRole: mslUserRole || userLoggedData.mslrole,
      slRank: mslUserRank || userLoggedData.mslrank
    };

    const formUserUpdateDPData = new FormData();
    formUserUpdateDPData.append('profileuser', userLoggedData.username);
    formUserUpdateDPData.append('profileimg', imageDP);
    formUserUpdateDPData.append('profileimgid', userLoggedData.mslid);

    try {
        if (userLoggedData) {
          const [responseUserUpdate, responseCustomDP] = await Promise.all([
              axios.post(MSLUserUpdateDataAPI, JSON.stringify(formUpdateUser), {
                  headers: {
                      'Content-Type': 'application/json',
                  }
              }),
              axios.post(MSLUserCustomDPAPI, formUserUpdateDPData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              })
          ]);

          const resMessageUserUpdate = responseUserUpdate.data;
          const resMessageCustomDP = responseCustomDP.data;
          
          if (resMessageUserUpdate.success) {
            console.log(resMessageUserUpdate.message);
            window.location.reload();
          } else {
            console.log(resMessageUserUpdate.message);
          }

          if (!resMessageCustomDP.success) {
            console.log(resMessageCustomDP.message);

          }

        } else {
          alert('Enable to Update Data');
        }
    } catch (error) {
      // setMessageResponse(error.message);
    } 
  };



  if(viewEditProfile == true){
    window.document.body.style.overflow = 'hidden';
  } else{
    window.document.body.style.overflow = 'auto';
  }



  return (
    <div className='mainContainer profile'>
      {viewEditProfile && <div className="mcpModalContainer">
        <div className="mcpmcContent editProfile">
          <button type='button' className='closeEditProfile' onClick={handleCloseEitProfile}><FaTimes className='faIcons'/></button>
          <h5>MY PROFILE DETAILS</h5>
          <form className="mcpmccepEditables" onSubmit={handleUserUpdate}>
            <div className="mcpmccepe left">
              <div className="mcpmccepelImage">
                {!imageDP ? <>{userLoggedData.profile ? 
                <img src={`https://mslphdatasheet.site/MSLProfileImage/${userLoggedData.profile}`} alt="" />:
                <img src='' gender={userLoggedData.gender} alt="" />}</>:<>
                <img id='ncmfrlSilhoutte' src={URL.createObjectURL(imageDP)} alt="No image Selected" /></>}
                <div>
                  <input type="file" onChange={handleUploadUserDP}/>
                  <h5><TbPhotoEdit className='faIcons'/></h5>
                </div>
              </div>
              <div className='mcpmccepel username'>
                <label htmlFor=""><p>Username</p></label>
                <span>
                  {/* {viewEditUsername ?<>
                    <input type="text" placeholder={`${userLoggedData.username}`} name='slUsername' onChange={(e) => setMSLUsername(e.target.value)}/>
                    <h5 onClick={handleHideEditUsername}><FaTimes className='faIcons'/></h5>
                  </>:<> */}
                    <h6><UsernameSlicer text={userLoggedData.username} maxLength={10} /></h6>
                    {/* <h5 onClick={handleEditUsername}><RiEdit2Fill className='faIcons'/></h5>
                  </>} */}
                </span>
              </div>
              <div className='mcpmccepel email'>
                <label htmlFor=""><p>Email</p></label>
                <span>
                  {viewEditEmail ? <>
                    <input type="email" placeholder={`${userLoggedData.email}`} name='slEmail' onChange={handleChangeEmail}/>
                    <h5 onClick={handleHideEditEmail}><FaTimes className='faIcons'/></h5>
                  </>:<>
                    <h6><UsernameSlicer text={userLoggedData.email} maxLength={17} /></h6>
                    <h5 onClick={handleEditEmail}><RiEdit2Fill className='faIcons'/></h5>
                  </>}
                </span>
              </div>
              <div className='mcpmccepel facebook'>
                <label htmlFor=""><p>Facebook Link</p></label>
                <span>
                  {viewEditFacebook ? <>
                    <input type="text" placeholder={`${userLoggedData.facebook}` ? `${userLoggedData.facebook}` : "Insert FB Link"} name='slFacebook' onChange={(e) => setMSLFacebook(e.target.value)}/>
                    <h5 onClick={handleHideEditFacebook}><FaTimes className='faIcons'/></h5>
                  </>:<>
                    <h6><UsernameSlicer text={userLoggedData.facebook || "Insert FB Link"} maxLength={17} /></h6>
                    <h5 onClick={handleEditFacebook}><RiEdit2Fill className='faIcons'/></h5>
                  </>}
                </span>
              </div>
            </div>
            <div className="mcpmccepe right">
              <div className="mcpmcceperDetails">
                <div className='mcpmcceperdName'>
                  <p>Full Name:</p>
                  <h6>{userLoggedData.givenname} {userLoggedData.surname}</h6>
                </div>
                <div className='mcpmcceperdSchool'>
                  <p>School:</p>
                  <h6><UsernameSlicer text={userLoggedData.schoolname} maxLength={40} /></h6>
                </div>
                <div className='mcpmcceperdDept'>
                  <p>MSL Role:</p>
                  <h6>{userLoggedData.administrator}</h6>
                </div>
                <div className='mcpmcceperdStuID'>
                  <p>School ID:</p>
                  <h6><UsernameSlicer text={userLoggedData.schoolid} maxLength={10} /></h6>
                </div>
                <div className='mcpmcceperdYrLvl'>
                  <p>Year Level:</p>
                  <select id="" name="slSchoolYear" onChange={(e) => setMSLSchoolYear(e.target.value)}>
                    <option value={`${userLoggedData.schoolyear}`}>{userLoggedData.schoolyear}</option>
                    <option value="Grade 11">Grade 11 SHS</option>
                    <option value="Grade 12">Grade 12 SHS</option>
                    <option value="Freshmen">Freshmen (1st Yr)</option>
                    <option value="Sophomore">Sophomore (2nd Yr)</option>
                    <option value="Junior">Junior (3rd Yr)</option>
                    <option value="Senior">Senior (4th Yr Up)</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Masters">Masters</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>
                <div className='mcpmcceperdCourses'>
                  <p>Current Course/Program:</p>
                  <span>
                    {viewEditCourse ? <>
                      <input className={mslUserCourse ? 'inputComplete' : ''} type="text" name='' value={courseSearchTerm} onChange={handleCourseSearchChange} placeholder='Search your Course/Program' required/>
                      {filteredCourses.length > 0 && (
                        <ul>
                          {filteredCourses.map((course, i) => (
                            <li key={i} onClick={() => handleCourseSelect(course)}>
                              <p>{course.program}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                      <h5 onClick={handleHideEditCourse}><FaTimes className='faIcons'/></h5>
                    </>:<>
                      <h6>{userLoggedData.schoolcourse}</h6>
                      <h5 onClick={handleEditCourse}><RiEdit2Fill className='faIcons'/></h5>
                    </>}
                  </span>
                </div>
                <div className="mcpmcceperdSquad2">
                  <p>Symbol:</p>
                  <span>
                    {viewEditSquad ? <>
                      <input type="text" placeholder={`${userLoggedData.mslsquad2}`} name='slUserSquad2' onChange={(e) => setMSLUserSquad2(e.target.value)}/>
                      <h5>-</h5>
                    </>:<>
                      <h6>{userLoggedData.mslsquad2 ? userLoggedData.mslsquad2 : ''}</h6>
                      <h5>-</h5>
                    </>}
                  </span>
                </div>
                <div className="mcpmcceperdSquad1">
                  <p>Squad Name:</p>
                  <span>
                    {viewEditSquad ? <>
                      <input type="text" placeholder={`${userLoggedData.mslsquad1}`}  name='slUserSquad1' onChange={(e) => setMSLUserSquad1(e.target.value)}/>
                      <h5 onClick={handleHideEditSquad}><FaTimes className='faIcons'/></h5>
                    </>:<>
                      <h6><UsernameSlicer text={userLoggedData.mslsquad1 ? userLoggedData.mslsquad1 : 'None'} maxLength={12} /></h6>
                      <h5 onClick={handleEditSquad}><RiEdit2Fill className='faIcons'/></h5>
                    </>}
                  </span>
                </div>
                <div className="mcpmcceperdRole">
                  <p>Role:</p>
                  <select id='' name="slUserRole" onChange={(e) => setMSLUserRole(e.target.value)}>
                    <option value={`${userLoggedData.mslrole}`}>{userLoggedData.mslrole}</option>
                    <option value="Mid Laner">Mid Laner</option>
                    <option value="Exp Laner">Exp Laner</option>
                    <option value="Gold Laner">Gold Laner</option>
                    <option value="Roamer">Roamer</option>
                    <option value="Jungler">Jungler</option>
                  </select>
                </div>
                <div className="mcpmcceperdRank">
                  <p>Rank:</p>
                  <select id='' name="slUserRank" onChange={(e) => setMSLUserRank(e.target.value)}>
                    <option value={`${userLoggedData.mslrank}`}>{userLoggedData.mslrank}</option>
                    <option value="Mythical Immortal">Mythical Immortal</option>
                    <option value="Mythical Glory">Mythical Glory</option>
                    <option value="Mythical Honor">Mythical Honor</option>
                    <option value="Mythic">Mythic</option>
                    <option value="Legend">Legend</option>
                    <option value="Epic">Epic</option>
                    <option value="Grand Master">Grand Master</option>
                    <option value="Master">Master</option>
                    <option value="Elite">Elite</option>
                    <option value="Warrior">Warrior</option>
                  </select>
                </div>
                <div className="mcpmcceperdUpdate">
                  <button type='submit'>UPDATE PROFILE</button>
                </div>
              </div>
            </div>
          </form>
          <h6 className='mcpmccepeVerified'><TbShieldCheckFilled className='faIcons'/> Your Account was Verified by {userLoggedData.verifiedby}</h6>
        </div>
      </div>}




      <section className="profilePageContainer top1">
        <div className="profilePageContent top1">
          <div className="ppct1HeaderContent">
            <div className="ppct1hc left" onClick={handleEditProfile}>
              {userLoggedData.profile ? 
              <img src={`https://mslphdatasheet.site/MSLProfileImage/${userLoggedData.profile}`} alt="" />:
              <img src='' gender={userLoggedData.gender} alt="" />}
            </div>
            <div className="ppct1hc center">
              <h1 id='ppct1hccIGN'><AutoTextNormalizer encodedText={userLoggedData.mslign ? userLoggedData.mslign : LoginUserIGN} onNormalize={setNormalizedIGN}/></h1>
              <h2>
                {userLoggedData.username && <UsernameSlicer text={userLoggedData.username} maxLength={10} />}
                {userLoggedData.badge && 
                  <sup><RiVerifiedBadgeFill className={`faIcons ${userLoggedData.badge}`}/></sup>
                }
              </h2>
              <h3>IGN: <UsernameSlicer text={normalizedIGN} /></h3>
              <div className="ppct1hcc">
                <div className='ppct1hccName'>
                  <p>Name: <span>{userLoggedData.givenname} {userLoggedData.surname} {userLoggedData.suffix}</span></p>
                  <p>Year Level: <span>{userLoggedData.schoolyear}</span></p>
                </div>
                <div>
                  <p>ML ID: <span>{userLoggedData.mslid} ({userLoggedData.mslserver})</span></p>
                  <p>Squad: <span>{userLoggedData.mslsquad1 ? `${userLoggedData.mslsquad1} (${userLoggedData.mslsquad2})` : 'None'}</span></p>
                </div>
              </div>
              <div className="ppct1hccOthers">
                <img id='mlbbPlayerGender' src="" gender={userLoggedData.gender} alt="" />
                <img id='mlbbPlayerRole' src="" mlrole={userLoggedData.mslrole} alt="" />
                {heroDetails && <img id='mlbbPlayerHero' src={heroDetails.key} alt="" />}
                {!heroDetails2 ?
                <><button className='ppct1hccoAdd'><TbSquareRoundedPlus className='faIcons'/></button></>:
                <>{heroDetails2 && <img id='mlbbPlayerHero' className='ppct1hccoHero' src={heroDetails2.key} alt="" />}</>}
                {!heroDetails3 ?
                <><button className='ppct1hccoAdd'><TbSquareRoundedPlus className='faIcons'/></button></>:
                <>{heroDetails3 && <img id='mlbbPlayerHero' className='ppct1hccoHero' src={heroDetails3.key} alt="" />}</>}
                <button type='button' className='ppct1hccoEdit' onClick={handleEditProfile}><TbUserShield className='faIcons'/></button>
                {userLoggedData.mslsquad1 && <div id='ppct1hccoSquadmates'onClick={!viewSquadmates ? handleViewSquadmates : handleHideSquadmates}>
                  <button>
                    {viewSquadmates ? <IoIosArrowDropupCircle className='faIcons'/> :
                    <IoIosArrowDropdownCircle className='faIcons'/>} SQUADMATES
                  </button>
                  {viewSquadmates && 
                    <span id='ppct1hccosIGN'>
                      <p>No Squadmates Listed</p>
                    </span>
                  }
                </div>}
              </div>
            </div>
            <div className="ppct1hc right">
              <div className="ppct1hcRank">
                <img id='mlbbPLayerRank' src="" mlbbrank={userLoggedData.mslrank} alt="" />
              </div>
              <div className="ppct1hcWinrate">
                <div>
                  <h6>Montly Tournaments</h6>
                  <h5>0%</h5>
                  <p>Winrate</p>
                </div>
                <div>
                  <h6>MCC Tournament</h6>
                  <h5>0%</h5>
                  <p>Winrate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profilePageContent mid1">
          <div className="ppcm1BodyContent">
            <div className="ppcm1bc left">
              <div className="ppcm1bclNav">
                <button className={viewRecentTournaments ? 'active' : ''} onClick={handleViewRecentTournament}><p>Recent MSL Tournaments</p></button>
                <button className={viewBiWeeklyTournaments ? 'active' : ''} onClick={handleViewBiWeeklyTournament}><p>Monthly Tournaments</p></button>
                <button className={viewMCCApperance ? 'active' : ''} onClick={handleViewMCCApperance}><p>MCC Apperance</p></button>
                <button className={viewFollowers ? 'active' : ''} onClick={handleViewFollowers}><p>0 Followers</p></button>
              </div>
              {viewRecentTournaments && <div className="ppcm1bclContents rmt">
                <h6>No Recent MSL Tournaments Joined</h6>
              </div>}
              {viewBiWeeklyTournaments &&<div className="ppcm1bclContents bwt">
                <h6>No MSL Monthly Tournaments Played</h6>
              </div>}
              {viewMCCApperance && <div className="ppcm1bclContents mcca">
                <h6>No MCC Apperance</h6>
              </div>}
              {viewFollowers && <div className="ppcm1bclContents followers">
                <h6>No Followers</h6>
              </div>}
            </div>
            <div className="ppcm1bc right">
                <div className="ppcm1bcrTData">
                  <p>MSL Hero Highlights</p>
                </div>
                <div className="ppcm1bcrHero">
                  <img src={`https://mslphdatasheet.site/MSLHeroes/${userLoggedData.mslhero}.png`} alt="" />
                  <span>
                    <h5>{userLoggedData.mslhero}</h5>
                    <p>Main</p>
                  </span>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile