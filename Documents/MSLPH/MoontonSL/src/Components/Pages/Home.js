import React, { useEffect, useState } from 'react'
import "../CSS/home.css";
import { Link } from 'react-router-dom';
import 'react-awesome-slider/dist/styles.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { 
  TbTrophy,
  TbCalendarStar,
  TbBrain,
  TbUsersGroup,
  TbHeartHandshake,
  TbGift 
} from "react-icons/tb";
import shortVid from "../assets/videos/landingBGVideo.mp4";
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend );



const Home = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [viewFetchedNewsData, setViewFetchedNewsData] = useState([])
  const MSLNewsDataAPI = process.env.REACT_APP_MSL_NEWS_DATA_API;

  useEffect(() => {
      const fetchMslNewsData = () => {
      axios.get(MSLNewsDataAPI)
          .then((response) => {
              const allNewsData = response.data.sort((a, b) => new Date(b.news_published) - new Date(a.news_published));
              setViewFetchedNewsData(allNewsData)
          })
          .catch(error => {
              console.log(error)
          })
      }
      fetchMslNewsData();
  }, []);

  
  const handleNewsPage = () => {
    localStorage.setItem('news', 'active')
    localStorage.removeItem('dashboard')
  }


  return (
    <div className='mainContainer home'>
      <section className="landingPageContainer top">
        <div className="lndpctFeatImgs top">
          <img id='lndPageImg1' src={require('../assets/imgs/MLSkins/MiyaSkin.png')} alt="" />
          <img id='lndPageImg2' src={require('../assets/imgs/MLSkins/ValeSkin.png')} alt="" />
        </div>
        <div className="lndpctFeatImgs bot">
          <img id='lndPageImg3' src={require('../assets/imgs/MLSkins/FannySkin.png')} alt="" />
          <img id='lndPageImg4' src={require('../assets/imgs/MLSkins/HanzoSkin.png')} alt="" />
        </div>
        <div className="lndPageContent top">
          <img id='mslSunLogo' src={require('../assets/imgs/SunLogo.png')} alt="" />
          <div className='msllndTitle'>
            <h6>MSL Philippines</h6>
            <h3>PAMANTASANG <br /> LAKAS</h3>
            <div>
              <img src={require('../assets/imgs/MLChampion/M2Champion.png')} alt="" />
              <img src={require('../assets/imgs/MLChampion/M3Champion.png')} alt="" />
              <img src={require('../assets/imgs/MLChampion/M4Champion.png')} alt="" />
              <img src={require('../assets/imgs/MLChampion/M5Champion.png')} alt="" />
            </div>
          </div>
          <div className="msllndStats">
            <p>Over <span>29,000+ Student Players</span> and <span>201 Student Leaders</span><br /> from <span>67 University Communities</span> anmposs the <span>Philippines</span>.</p>
          </div>
        </div>
        <img id='scratchLndPage' src={require('../assets/imgs/Scratch04.png')} alt="" />
      </section>
      <section className="landingPageContainer mid1">
        <div className="lndPageContent mid1">
          <div className="lndpcm1 left">
            <img id='lndpcm1Img' src={require('../assets/imgs/MLSkins/DiggieSkin.png')} alt="" />
            <div>
              <h5>BECOME A STUDENT LEADER</h5>
              <span>
                <Link>APPLY HERE</Link>
              </span>
            </div>
          </div>
          <div className="lndpcm1 right">
            <h3><span>What is</span><br />MOONTON <br /> STUDENT LEADERS?</h3>
            <p>
              Moonton Student Leaders (MSL) Philippines is an organization of student-gamers from different 
              colleges and universities all over the country. Under the supervision of Moonton Technologies 
              Philippines, Inc., the program was developed to promote the growth of Mobile Legends: Bang Bang 
              communities in schools while advocating for academic excellence.
            </p>
            <div>
              <span>
                <h5><TbTrophy className='faIcons'/></h5>
                <p>Monthly <br /> Tournament</p>
              </span>
              <span>
                <h5><TbCalendarStar className='faIcons'/></h5>
                <p>Special <br /> Events</p>
              </span>
              <span>
                <h5><TbBrain className='faIcons'/></h5>
                <p>Academic <br /> Activities</p>
              </span>
              <span>
                <h5><TbUsersGroup className='faIcons'/></h5>
                <p>Interschool <br /> Activities</p>
              </span>
              <span>
                <h5><TbHeartHandshake className='faIcons'/></h5>
                <p>School <br /> Partnership</p>
              </span>
              <span>
                <h5><TbGift className='faIcons'/></h5>
                <p>Event <br /> Raffle</p>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="landingPageContainer mid2">
        <div className="lndpcm2Skins">
          <img id='lndpcm2Skin1' src={require('../assets/imgs/MLSkins/EstesSkin.png')} alt="" />
          <img id='lndpcm2Skin2' src={require('../assets/imgs/MLSkins/FredrinSkin.png')} alt="" />
          <img id='lndpcm2Skin3' src={require('../assets/imgs/MLSkins/MelissaSkin.png')} alt="" />
        </div>
        <div className="lndPageContent mid2">
          <h2>BE OUR ORG <br />PARTNER</h2>
          <h6>Enjoy exclusive perks and grants for your organization and members.</h6>
          <Link>
            <button>Learn More</button>
          </Link>
        </div>
      </section>
      <section className="landingPageContainer mid3">
        <div className="lndPageContent mid3">
          <h5>PREVIOUSLY PARTNERED ORGANIZATIONS</h5>
          <div>
            <img src={require('../assets/imgs/OrgLogos/logos/GREEN with yellow and red accent (TEXT).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/HCDC Esports.PNG')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ISATU Spectral GEARS.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Legion of Lures New logo white.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/LITE.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Logo (1).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Logo Default.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/LOGO Orange (1).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/LOGO PURE copy.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/NUAG_OFFICIAL_LOGO.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ORG_MTE_Logo.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ormoc esports community logo.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/PANTHERA LOGO.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Pylon Esports Logo PNG.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/SEA LOGO.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Society of Industrial Technology Students Logo.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/SSG Org Logo.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/The Urian Arena Vanguards Logo.jpg')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/TUPC ANARCHS LOGO.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/UCU_Knights_Reborn_Esports-coloredbg.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Untitled design (5).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Untitled20_20241007164431.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/UP Esports Varsity Team Logo.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/WA Logo Official (1).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/white (1).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/WVSU Logo no box.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/XCEED White.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/TCM.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/UMESA.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/NUC.jpg')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ACLC.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ABKE BLUE.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ADL Logo.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/AZP Logo in White.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Beacon.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/BS ENTREPRENEURSHIP SBO LOGO.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/CES_LOGO.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/CMU Calayo Esports.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Copy of Copy of New Logo no BG.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/KEC.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/PUP.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Copy of M21 WHITE.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Copy of TRACE.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/GAMEE LOGO (FINAL).png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/Gamer_s Guild - University of Cabuyao.png')} alt="" />
            <img src={require('../assets/imgs/OrgLogos/logos/ACES.png')} alt="" />
          </div>
        </div>
      </section>
      <section className="landingPageContainer mid4">
        <img id='lndm4scratch1' src={require('../assets/imgs/Scratch03.png')} alt="" />
        <div className="lndPageContent mid4">
          <video className='videoTag' autoPlay muted>
            <source src={shortVid} type='video/mp4' />
          </video>
        </div>
        <div className="lndPageContent mid4News">
          <div className='lndpcm4News'></div>
          {viewFetchedNewsData.map((news, i) => (
            <Link className='lndpcm4News' key={i} to={`/News/${news.news_canonical}`} onClick={handleNewsPage}>
              <img src={`https://mslphdatasheet.site/MSLNewsAssets/${news.news_img1}`} alt="" />
              <div></div>
              <span>
                {/* <h6>{news.news_state}</h6> */}
                <p>{news.news_title}</p>
              </span>
            </Link>
          ))}
          <div className='lndpcm4News'></div>
        </div>
        <img id='lndm4scratch2' src={require('../assets/imgs/Scratch04.png')} alt="" />
      </section>
      <section className="landingPageContainer mid5">
        <div className="lndPageContent mid5">
          <h4>THE CORE TEAM</h4>
          <div className='lndpcm5Contents'>
            <div>
              <img src={require('../assets/imgs/CoreTeam/Mary.png')} alt="" />
              <h6>Mary Pasco</h6>
              <p>Contents and SocMed Dept.</p>
            </div>
            <div>
              <img src={require('../assets/imgs/CoreTeam/Ivan.png')} alt="" />
              <h6>Ivan Valenzuela</h6>
              <p>Campus Dept.</p>
            </div>
            <div className='lndpcm5cPrio'>
              <img src={require('../assets/imgs/CoreTeam/Ken.png')} alt="" />
              <h6>KEN RYAN LEE</h6>
              <p>MSL Philippines <br />Community Manager</p>
            </div>
            <div>
              <img src={require('../assets/imgs/CoreTeam/Aerol.JPG')} alt="" />
              <h6>Aerol Balayon</h6>
              <p>SERP Dept.</p>
            </div>
            <div>
              <img src={require('../assets/imgs/CoreTeam/Gab2.jpg')} alt="" />
              <h6>Gab Matawaran </h6>
              <p>General Affairs Dept.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;