import React, { useState, useEffect } from 'react';
import useCanvasCursor from './Components/Pages/About/components/custom-cursor/useCanvasCursor.js';
import './App.css';

import { ActivePageProvider } from './Components/Pages/ActivePageContect';

import { UserProfileDataProvider } from './Components/Pages/UserProfileContext';
import { NewsFetchDataProvider } from './Components/Pages/NewsFetchContext';
import { EventsFetchDataProvider } from './Components/Pages/EventFetchContext';


import Nav from './Components/Nav'
import Footer from './Components/Pages/footer';
import ScrollToTop from './Components/Pages/ScrollToTop';
import Loader from './Components/Pages/Loader';
import Home from './Components/Pages/Home'
import Dashboard from './Components/Pages/Dashboard';
import News from './Components/Pages/News';
import NewsPage from './Components/Pages/NewsPage';
import Events from './Components/Pages/Events.js';
import Programs from './Components/Pages/Programs';
import TermsAndCondition from './Components/Pages/TermsAndCondition';
import PrivacyAndPolicy from './Components/Pages/PrivacyPolicies';
import Campus from './Components/Pages/Campus';

import About from './Components/Pages/About/main/AboutPage.jsx'
import OpenTournRF from './Components/Pages/opentournament_NEW/main/form.jsx';
import OpenTournTeams from './Components/Pages/opentournament_NEW/main/teamsADMIN.jsx';

import AboutExtend from './Components/Pages/About/main/AboutPage-Extension.jsx'
import OpenTournament from './Components/Pages/OpenTournament';
import BattleTrips from './Components/Pages/BattleTrips';

import M6WFLocations from './Components/Pages/M6WFLocations';

import Magcelebr8Tayo from './Components/Pages/Magcelebr8Tayo';
import WatchParty from './Components/Pages/WatchParty';
import WatchFest from './Components/Pages/WatchFest';
import WatchFestRegForm from './Components/Pages/WatchFestRegForm';
import WatchFestChallenge from './Components/Pages/WatchFestChallenge';
import WatchFestPrimer from './Components/Pages/WatchFestPrimer';
import WatchFestGame from './Components/Pages/WatchFestGame';

import Profile from './Components/Pages/Profile';
import SearchMSLPlayer from './Components/Pages/SearchMSLPlayer';
import MSLProfile from './Components/Pages/MSLProfile';

import SLAdminPanel from './Components/Pages/SLAdminPanel';
import MainAdminPanel from './Components/Pages/MainAdminPanel';


import DevKoswi from './Components/Pages/Developer/DevKoswi';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userCredentials = localStorage.getItem('mslUserData');
  const isLoggedin = localStorage.getItem('isLoggedIn');
  const currentUserData = userCredentials ? JSON.parse(userCredentials) : '';
  const userAdministrator = currentUserData.administrator;
  const allowedRoles = ["Super Admin", "National Admin", "Regional Admin", "SL"];
  
  // useEffect(() => {
  //   // Display loader when the page is being reloaded
  //   window.addEventListener('beforeunload', () => {
  //     setIsLoading(true);
  //   });

  //   // Hide loader when the page is fully loaded
  //   window.addEventListener('load', () => {
  //     setIsLoading(false);
  //   });

  //   return () => {
  //     // Clean up event listeners
  //     window.removeEventListener('beforeunload', () => {});
  //     window.removeEventListener('load', () => {});
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleStart = () => setLoading(true);
  //   const handleComplete = () => setLoading(false);
  
  //   // Listen to route changes and update loading state accordingly
  //   const history = window.history;
  //   const pushState = history.pushState;
    
  //   history.pushState = (...args) => {
  //     handleStart();
  //     const result = pushState.apply(history, args);
  //     setTimeout(handleComplete, 2000); // Delay handleComplete() by 10 seconds
  //     return result;
  //   };
  
  //   const popstateHandler = () => {
  //     handleStart();
  //     setTimeout(handleComplete, 2000); // Delay handleComplete() by 10 seconds
  //   };
  
  //   window.addEventListener('popstate', popstateHandler);
  
  //   return () => {
  //     window.removeEventListener('popstate', popstateHandler);
  //   };
  // }, []);

  
  useCanvasCursor();
  return (
    <ActivePageProvider>
      <UserProfileDataProvider>
        <NewsFetchDataProvider>
        <EventsFetchDataProvider>
          <Router>
          <div>
            <ScrollToTop />
            {/* {loading || isLoading ? <Loader />:
            <> */}
            <Nav />
            <Routes>
              {/* <Route path="/Loader" element={<Loader/>}/> */}
              <Route path="/" element={<Home/>}/>
              <Route path="/Dashboard" element={<Dashboard/>}/>
              <Route path="/News" element={<News/>}/>
              <Route path="/News/:newsCanonical" element={<NewsPage/>}/>
              <Route path="/Events" element={<Events/>}/>
              <Route path="/Programs" element={<Programs/>}/>
              <Route path="/TermsAndConditions" element={<TermsAndCondition/>}/>
              <Route path="/PrivacyPolicies" element={<PrivacyAndPolicy/>}/>
              <Route path="/Campus" element={<Campus/>}/>
              <Route path="/About" element={<About/>}/>
              <Route path="/About/More" element={<AboutExtend/>}/>

              <Route path="/M6WFLocations" element={<M6WFLocations/>}/>

              <Route path="/SearchMSLPlayer" element={<SearchMSLPlayer/>}/>
              <Route path="/MSLPlayer/:userProfile" element={<MSLProfile/>}/>
              <Route path="/OpenTournament" element={<OpenTournament/>}/>
              <Route path="/opentournament/register" element={<OpenTournRF/>}/>
              {(isLoggedin) && <>
                <Route path="/Profile" element={<Profile/>}/>
              </>}
              
              <Route path="/MagCelebr8Tayo" element={<Magcelebr8Tayo/>}/>
              <Route path="/BattleTrips" element={<BattleTrips/>}/>
              <Route path="/MPLWatchFest" element={<WatchParty/>}/>
              <Route path="/M6WatchFest" element={<WatchFest/>}/>
              <Route path="/M6WatchFestRegForm" element={<WatchFestRegForm/>}/>
              <Route path="/M6WatchFestChallenge" element={<WatchFestChallenge/>}/>
              <Route path="/WatchFestPrimer" element={<WatchFestPrimer/>}/>
              <Route path="/WatchFestPrediction" element={<WatchFestGame/>}/>x
              
              {isLoggedin && allowedRoles.includes(userAdministrator) && (
                <>
                <Route path="/SLAdminPanel" element={<SLAdminPanel />} />
                <Route path="/opentournament/admin" element={<OpenTournTeams/>}/>
                </>
              )}
              {(userAdministrator === 'Super Admin') &&
                <Route path="/MainAdminPanel" element={<MainAdminPanel />} />
              }

              <Route path="/Developer/Koswi" element={<DevKoswi/>}/>
              <Route path="*" element={<Home/>}/>
            </Routes>
            <Footer />
            {/* </>} */}
          </div>
          </Router>
        </EventsFetchDataProvider>
        </NewsFetchDataProvider>
      </UserProfileDataProvider>
    </ActivePageProvider>
  );
}


export default App;
