import React, { useEffect, useState } from 'react'
import "../CSS/searchMSLUser.css";
import { 
  RiVerifiedBadgeFill,
  RiImageAddLine,
  RiSearchLine,
  RiNotification2Line,
  RiBarChart2Line,
  RiOrganizationChart,
  RiEqualizerLine,
  RiExternalLinkLine        
} from "react-icons/ri";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfileData } from './UserProfileContext';



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
const SearchMSLPlayer = () => {
    const { userLoggedData, viewBasicInfos, viewUserInfos, fetchUserSchoolData } = UserProfileData();
    const LoginUserIGN = localStorage.getItem('mslUserIGN');
    const LoginUsername = localStorage.getItem('mslUserUsername');
    const LoginUserID = localStorage.getItem('mslUserID');
    const userAdministrator = userLoggedData.administrator

    const [randomAroundMeItem, setRandomAroundMeItem] = useState([]);
    const [randomSameCourseItem, setRandomSameCourseItem] = useState([]);
    const [randomDifferntGender, setRandomDifferntGenderItem] = useState([]);

    useEffect(() => {
        // Filter the data based on school name
        const filterSLAround = viewUserInfos.filter(sl => sl.school && sl.school.schoolname === userLoggedData.schoolname);
        const filterSLCourse = viewUserInfos.filter(sl => sl.school && sl.school.schoolcourse === userLoggedData.schoolcourse);
        const filterDiffGender = viewUserInfos.filter(sl => sl.basic &&  sl.basic.gender != userLoggedData.gender);
        const SLAroundMe = filterSLAround.filter(msl => msl.userid != userLoggedData.userid);
        const SLMyCourse = filterSLCourse.filter(msl => msl.userid != userLoggedData.userid);

        // Select 5 random items from the filtered results
        if (SLAroundMe.length > 0) {
            const selectedItems = [];
            const copyOfFilteredArray = [...SLAroundMe];

            for (let i = 0; i < Math.min(5, SLAroundMe.length); i++) {
                const randomIndex = Math.floor(Math.random() * copyOfFilteredArray.length);
                selectedItems.push(copyOfFilteredArray[randomIndex]);
                copyOfFilteredArray.splice(randomIndex, 1); // Remove selected item to avoid duplicates
            }

            setRandomAroundMeItem(selectedItems);
        }
        if (SLMyCourse.length > 0) {
            const selectedItems = [];
            const copyOfFilteredArray = [...SLMyCourse];

            for (let i = 0; i < Math.min(5, SLMyCourse.length); i++) {
                const randomIndex = Math.floor(Math.random() * copyOfFilteredArray.length);
                selectedItems.push(copyOfFilteredArray[randomIndex]);
                copyOfFilteredArray.splice(randomIndex, 1); // Remove selected item to avoid duplicates
            }

            setRandomSameCourseItem(selectedItems);
        }
        if (filterDiffGender.length > 0) {
            const selectedItems = [];
            const copyOfFilteredArray = [...filterDiffGender];

            for (let i = 0; i < Math.min(10, filterDiffGender.length); i++) {
                const randomIndex = Math.floor(Math.random() * copyOfFilteredArray.length);
                selectedItems.push(copyOfFilteredArray[randomIndex]);
                copyOfFilteredArray.splice(randomIndex, 1); // Remove selected item to avoid duplicates
            }

            setRandomDifferntGenderItem(selectedItems);
        }
    }, [viewUserInfos, userLoggedData]);


    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };
    const filteredUserInfos = viewUserInfos.filter(user => 
        user.username.toLowerCase().includes(searchTerm)
    );


    return (
        <div className='mainContainer serachMSLPlayer'>
            <section className="smlPageContainer top">
                <div className="smlPageContent top1">
                    <div className="smlpct1Search">
                        <h5><RiSearchLine className='faIcons'/></h5>
                        <input type="text" placeholder='Search MSL Player Username' value={searchTerm} onChange={handleSearchChange}/>
                    </div>
                    <div className="smlpct1Total">
                        <h5>{viewUserInfos.length} Listed Users</h5>
                    </div>
                </div>
                {searchTerm && filteredUserInfos.length > 0 && <div className="smlPageContent top2 website">
                    <h5>Result for "{searchTerm}"</h5>
                    <div className="smlpct2Contents">
                        {filteredUserInfos.slice(0, 4).map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {searchTerm && filteredUserInfos.length > 0 && <div className="smlPageContent top2 mobile">
                    <h5>Result for "{searchTerm}"</h5>
                    <div className="smlpct2Contents">
                        {filteredUserInfos.slice(0, 4).map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {(!searchTerm || !filteredUserInfos.length) && <>
                {randomAroundMeItem && <div className="smlPageContent top2 website">
                    <h5>People around You</h5>
                    <div className="smlpct2Contents">
                        {randomAroundMeItem.map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {randomAroundMeItem && <div className="smlPageContent top2 mobile">
                    <h5>People around You</h5>
                    <div className="smlpct2Contents">
                        {randomAroundMeItem.slice(0, 4).map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {(randomAroundMeItem > 5) && <div className="smlpct1ViewMore">
                    <Link><p>View More People</p></Link>
                </div>}
                </>}
            </section>
            <section className="smlPageContainer mid">
                {randomDifferntGender && <div className="smlPageContent mid1 website">
                    <h5>Suggestion for You</h5>
                    <div className="smlpct2Contents">
                        {randomDifferntGender.map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {randomDifferntGender && <div className="smlPageContent mid1 mobile">
                    <h5>Suggestion for You</h5>
                    <div className="smlpct2Contents">
                        {randomDifferntGender.slice(0, 4).map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {randomSameCourseItem && <div className="smlPageContent mid2 website">
                    <h5>{userLoggedData.schoolcourse}</h5>
                    <div className="smlpct2Contents">
                        {randomSameCourseItem.map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
                {randomSameCourseItem && <div className="smlPageContent mid2 mobile">
                    <h5>{userLoggedData.schoolcourse}</h5>
                    <div className="smlpct2Contents">
                        {randomSameCourseItem.slice(0, 4).map((data, i) => (
                            <Link className="smlpcr2cCard" key={i} to={`/MSLPlayer/${data.username}`}>
                                <div className="smlpcr2ccRole">
                                    <img id='mlbbPlayerRole' src="" mlrole={data.mlbb.mslrole} alt="" />
                                </div>
                                <div className="smlpcr2ccImage">
                                    {data.profile ? 
                                    <img src={`https://mslphdatasheet.site/MSLProfileImage/${data.profile}`} alt="" />:
                                    <img src='' gender={data.basic.gender} alt="" />}
                                </div>
                                <div className="smlpcr2ccUserData">
                                    <span>
                                        <h6><UsernameSlicer text={data.basic.username} maxLength={10} /></h6>
                                        <p>{data.mlbb.mslid} ({data.mlbb.mslserver})</p>
                                    </span>
                                    <span>
                                        <img id='mlbbPLayerRank' src="" mlbbrank={data.mlbb.mslrank} alt="" />
                                    </span>
                                </div>
                                {/* <div className="smlpcr2ccUserVisit">
                                    <button disabled>Follow</button>
                                </div> */}
                            </Link>
                        ))}
                    </div>
                </div>}
            </section>
        </div>
    )
}

export default SearchMSLPlayer