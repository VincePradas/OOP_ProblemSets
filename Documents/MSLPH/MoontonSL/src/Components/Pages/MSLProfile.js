import React, { useEffect, useState } from 'react'
import "../CSS/profile.css";
import { useParams } from 'react-router-dom';
import { UserProfileData } from './UserProfileContext';
import axios from 'axios';
import HeroData from '../Json/HeroData.json';
import { 
  RiVerifiedBadgeFill,
  RiGroupFill,
  RiEdit2Fill,
  RiShieldCheckFill,
  RiFacebookBoxFill  
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
const MSLProfile = () => {
    const { userProfile } = useParams();
    const { userLoggedData, viewBasicInfos, viewUserInfos, fetchUserSchoolData } = UserProfileData();
    
    const [viewRecentTournaments, setViewRecentTournaments] = useState(true);
    const [viewBiWeeklyTournaments, setViewBiWeeklyTournaments] = useState(false);
    const [viewMCCApperance, setViewMCCApperance] = useState(false);
    const [viewFollowers, setViewFollowes] = useState(false);
    const [viewSquadmates, setViewSquadmates] = useState(false);
    const [normalizedIGN, setNormalizedIGN] = useState('');

    
    const viewMSLInfo = viewUserInfos.filter(sl => sl.username === userProfile);
    const viewMSLProfile = viewMSLInfo.map(sl => sl.profile)
    const viewMSLFacebook = viewMSLInfo.map(sl => sl.facebook)
    const viewMSLUsername = viewMSLInfo.map(sl => sl.username)
    const viewMSLBadge = viewMSLInfo.map(sl => sl.badge)
    const viewMSLGivenname = viewMSLInfo.map(sl => sl.basic.givenname)
    const viewMSLSurname = viewMSLInfo.map(sl => sl.basic.surname)
    const viewMSLSuffix = viewMSLInfo.map(sl => sl.basic.suffix)
    const viewMSLGender = viewMSLInfo.map(sl => sl.basic.gender)
    const viewMSLIGN = viewMSLInfo.map(sl => sl.mlbb.mslign)
    const viewMSLID = viewMSLInfo.map(sl => sl.mlbb.userid)
    const viewMSLServer = viewMSLInfo.map(sl => sl.mlbb.mslserver)
    const viewMSLSquad1 = viewMSLInfo.map(sl => sl.mlbb.mslsquad1)
    const viewMSLSquad2 = viewMSLInfo.map(sl => sl.mlbb.mslsquad2)
    const viewMSLRole = viewMSLInfo.map(sl => sl.mlbb.mslrole)
    const viewMSLRank = viewMSLInfo.map(sl => sl.mlbb.mslrank)
    const viewMSLHero1 = viewMSLInfo.map(sl => sl.mlbb.mslhero)
    const viewMSLHero2 = viewMSLInfo.map(sl => sl.mlbb.mslhero2)
    const viewMSLHero3 = viewMSLInfo.map(sl => sl.mlbb.mslhero3)
    const viewMSLSchoolYear = viewMSLInfo.map(sl => sl.school.schoolyear)


  
    const heroDetails = HeroData.find(hero => hero.name === `${viewMSLHero1}`);
    const heroDetails2 = HeroData.find(hero => hero.name === `${viewMSLHero2}`);
    const heroDetails3 = HeroData.find(hero => hero.name === `${viewMSLHero3}`);

    console.log(viewMSLInfo);


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



    return (
        <div className='mainContainer mslProfile'>
            <section className="profilePageContainer top1">
                <div className="profilePageContent top1">
                <div className="ppct1HeaderContent">
                    <div className="ppct1hc left">
                    {(viewMSLProfile != '') ? 
                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${viewMSLProfile}`} alt="" />:
                    <img src='' gender={viewMSLGender} alt="" />}
                    </div>
                    <div className="ppct1hc center">
                    <h1 id='ppct1hccIGN'><AutoTextNormalizer encodedText={viewMSLIGN} onNormalize={setNormalizedIGN}/></h1>
                    <h2>
                        {viewMSLUsername && <UsernameSlicer text={`${viewMSLUsername}`} maxLength={11} />}
                        {(viewMSLBadge != '') && 
                        <sup><RiVerifiedBadgeFill className={`faIcons ${viewMSLBadge}`}/></sup>
                        }
                    </h2>
                    <h3>IGN: <UsernameSlicer text={normalizedIGN} /></h3>
                    <div className="ppct1hcc">
                        <div className='ppct1hccName'>
                        <p>Name: <span>{viewMSLGivenname} {viewMSLSurname} {viewMSLSuffix}</span></p>
                        <p>Year Level: <span>{viewMSLSchoolYear}</span></p>
                        </div>
                        <div>
                        <p>ML ID: <span>{viewMSLID} ({viewMSLServer})</span></p>
                        <p>Squad: <span>{(viewMSLSquad1 != '') ? `${viewMSLSquad1} (${viewMSLSquad2})` : 'None'}</span></p>
                        </div>
                    </div>
                    <div className="ppct1hccOthers">
                        <img id='mlbbPlayerGender' src="" gender={viewMSLGender} alt="" />
                        {(viewMSLFacebook != '') && <a href={viewMSLFacebook} target='blank'><RiFacebookBoxFill className='faIcons'/></a>}
                        <img id='mlbbPlayerRole' src="" mlrole={viewMSLRole} alt="" />
                        {heroDetails && <img id='mlbbPlayerHero' className='ppct1hccoHero' src={heroDetails.key} alt="" />}
                        {heroDetails2 && <img id='mlbbPlayerHero' className='ppct1hccoHero' src={heroDetails2.key} alt="" />}
                        {heroDetails3 && <img id='mlbbPlayerHero' className='ppct1hccoHero' src={heroDetails3.key} alt="" />}
                        {(viewMSLSquad1 != '') && <div id='ppct1hccoSquadmates'onClick={!viewSquadmates ? handleViewSquadmates : handleHideSquadmates}>
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
                        <img id='mlbbPLayerRank' src="" mlbbrank={viewMSLRank} alt="" />
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
                        <img src={`https://mslphdatasheet.site/MSLHeroes/${viewMSLHero1}.png`} alt="" />
                        <span>
                            <h5>{viewMSLHero1}</h5>
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

export default MSLProfile