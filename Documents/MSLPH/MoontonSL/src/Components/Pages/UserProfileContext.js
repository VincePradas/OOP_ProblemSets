import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserProfileContext = createContext();

export const UserProfileDataProvider = ({ children }) => {
    const [userLoggedData, setUserLoggedData] = useState([]);
    const [viewEditProfile, setViewEditProfile] = useState(false);
    const [viewOTTeamList, setViewOTTeamList] = useState([]);
    const LoginUsername = localStorage.getItem('attractGameUsername');
    const LoginUserID = localStorage.getItem('profileUserID');
    const LoginUserIGN = localStorage.getItem('mslUserIGN');
    const MSLUserListAPI = process.env.REACT_APP_MSL_USER_LIST_DATA_API;
    const MSLUserBasicDataAPI = process.env.REACT_APP_MSL_USER_BASIC_DATA_API;
    const MSLUserSchoolDataAPI = process.env.REACT_APP_MSL_USER_SCHOOL_DATA_API;
    const MSLUserMLBBDataAPI = process.env.REACT_APP_MSL_USER_MLBB_DATA_API;
    const MSLUserIGNDataAPI = process.env.REACT_APP_MSL_USER_MLBB_IGN_API;
    const MSLUserIGNCheckAPI = process.env.REACT_APP_MSL_USER_CHECK_IGN_API;
    const MSLUserIGNUpdateAPI = process.env.REACT_APP_MSL_USER_UPDATE_IGN_API;
    const optTeamListAPI = process.env.REACT_APP_MSL_OPEN_TOURNAMENT_LIST_API;
    const userID = userLoggedData.mslid;
    const zoneID = userLoggedData.mslserver;
    const [viewBasicInfos, setViewBasicInfos] = useState([]);
    const [viewUserInfos, setViewUserInfos] = useState([]);


    const fetchIGNData = async () => {

        if (!userID || !zoneID) {
          return; // Don't fetch if userID or zoneID is empty
        }
        const formFetchIGN = {
          userID: userID,
          zoneID: zoneID,
        };
        const jsonUserIGNData = JSON.stringify(formFetchIGN);
        try {
            const response = await axios.post(MSLUserIGNDataAPI, jsonUserIGNData);
            if (!response.data) {
                throw new Error('No data received from server');
            }


            const updatedIGNFetched = response.data.confirmationFields.username
            localStorage.setItem('mslUserIGN', updatedIGNFetched);


            const formUpdateIGN = {
                userID: userID,
                userIGN: updatedIGNFetched,
            }
            const jsonUserIGNUpdate = JSON.stringify(formUpdateIGN);
            axios.post(MSLUserIGNUpdateAPI, jsonUserIGNUpdate, {
                headers: {
                  'Content-Type': 'application/json',
                },
            }).then(response => {
                const resMessage = response.data;
                if (resMessage.success === false) {
                  console.log(resMessage.message);
                }
                if (resMessage.success === true) {
                  console.log(resMessage.message);
                }
            }).catch(error => {
                console.log(error);
            });
        } catch (error) {
          console.error(error);
        }
    };
    const fetchUserSchoolData = async () => {
        // setLoadingMarketData(false);
        try {
            const stateOrder = {
                "New": 1,
                "Renew": 2,
                "Verified": 3,
                "Blocked": 4
            };
            const response1 = await axios.get(MSLUserListAPI);
            const agAllUsers = response1.data;
            const agSortAllByState = agAllUsers.sort((a, b) => stateOrder[a.state] - stateOrder[b.state]);

            const basicListResponse = await axios.get(MSLUserBasicDataAPI);
            const basicListData = basicListResponse.data;
    
            const schoolListResponse = await axios.get(MSLUserSchoolDataAPI);
            const schoolListData = schoolListResponse.data;

            const mlbbListResponse = await axios.get(MSLUserMLBBDataAPI);
            const mlbbListData = mlbbListResponse.data;
    
            const basicInfo = agSortAllByState.map(users => {
                const basic = basicListData.find(basic => basic.userid === users.userid);
                return {
                    ...users, basic
                };
            });

            const mlbbInfo = basicInfo.map(users => {
                const mlbb = mlbbListData.find(mlbb => mlbb.userid === users.userid);
                return {
                    ...users, mlbb
                };
            });

            const schoolInfo = mlbbInfo.map(users => {
                const school = schoolListData.find(school => school.userid === users.userid);
                return {
                    ...users, school
                };
            });

            setViewBasicInfos(agAllUsers);
            setViewUserInfos(schoolInfo);
            
            
        } catch (error) {
            console.error(error);
        }
    };
    const fetchOpenTournamentTeamList = async () => {
        try {
            const response = await axios.get(optTeamListAPI);
            const teamList = response.data;
            setViewOTTeamList(teamList);
        } catch (error) {
            console.error(error);
        }
    };
    // Fetch data once when component mounts
    
    // const fetchUserSchoolData = async () => {
    //     try {
    //         const stateOrder = {
    //             "New": 1,
    //             "Renew": 2,
    //             "Verified": 3,
    //             "Blocked": 4
    //         };
    
    //         const [response1, basicListResponse, schoolListResponse, mlbbListResponse] = await Promise.all([
    //             axios.get(MSLUserListAPI),
    //             axios.get(MSLUserBasicDataAPI),
    //             axios.get(MSLUserSchoolDataAPI),
    //             axios.get(MSLUserMLBBDataAPI)
    //         ]);
    
    //         const [agAllUsers, basicListData, schoolListData, mlbbListData] = await Promise.all([
    //             response1.data,
    //             basicListResponse.data,
    //             schoolListResponse.data,
    //             mlbbListResponse.data
    //         ]);
    
    //         const agSortAllByState = agAllUsers.sort((a, b) => stateOrder[a.state] - stateOrder[b.state]);
    
    //         const enrichedUsers = agSortAllByState.map(user => ({
    //             ...user,
    //             basic: basicListData.find(basic => basic.userid === user.userid),
    //             mlbb: mlbbListData.find(mlbb => mlbb.userid === user.userid),
    //             school: schoolListData.find(school => school.userid === user.userid)
    //         }));
    
    //         setViewBasicInfos(agAllUsers);
    //         setViewUserInfos(enrichedUsers);
    
    //     } catch (error) {
    //         console.error("Error fetching user school data:", error);
    //         // Handle error state or notify user
    //     }
    // };
    useEffect(() => {
        const fetchUserProfile = async  () => {
            try {
                const [userListResponse, userDataResponse] = await Promise.all([
                  axios.get(MSLUserListAPI),
                  axios.get(MSLUserBasicDataAPI)
                ]);
                const userDataStatus = userListResponse.data.find(item => item.userid === LoginUserID);
                const storedProfileData = localStorage.getItem('mslUserData')

                if(storedProfileData) {
                    setUserLoggedData(JSON.parse(storedProfileData))
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUserProfile();
        const checkUpdateNeeded = async () => {
            try {
              const response = await axios.get(MSLUserIGNCheckAPI);
                const data = response.data;
                const lastUpdateData = data.find(last => last.userid === userID);
                const lastUpdateIGN = lastUpdateData.mslign
                const lastUpdatedDate = new Date(lastUpdateData.ignlastupdate);
                const now = new Date();
                const needToUpdate = now - lastUpdatedDate;

                if (lastUpdateIGN === ''){
                    fetchIGNData();
                    // window.location.reload();
                }

                if (needToUpdate <= 259200000){
                    // console.log('IGN Updated');
                }else {
                    // console.log('IGN Need to Update');
                    fetchIGNData();
                    // window.location.reload();
                }
            } catch (error) {
            //   console.error('Failed to check update status:');
            }
        };
        checkUpdateNeeded();

        fetchOpenTournamentTeamList();
        fetchUserSchoolData();
    }, [userID, zoneID]);


    return (
        <UserProfileContext.Provider value={{ 
            userLoggedData, 
            fetchIGNData, 
            viewEditProfile, 
            setViewEditProfile, 
            viewBasicInfos, 
            viewUserInfos, 
            fetchUserSchoolData,
            viewOTTeamList, 
            setViewOTTeamList,
            fetchOpenTournamentTeamList
        }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const UserProfileData = () => useContext(UserProfileContext);