import axios from "axios";

const fetchUserData = async (
  LoginUserID,
  setSuccessModalResponse,
  setViewLoginMSL,
  setMSLUsername,
  setMSLPassword,
  handleUserLogout,
  userLoggedIn,
  setDataUser,
  setViewUserCredentials
) => {
  try {
    const [
      userListResponse,
      userData1Response,
      userData2Response,
      userData3Response,
    ] = await Promise.all([
      axios.get(process.env.REACT_APP_MSL_USER_LIST_DATA_API),
      axios.get(process.env.REACT_APP_MSL_USER_BASIC_DATA_API),
      axios.get(process.env.REACT_APP_MSL_USER_SCHOOL_DATA_API),
      axios.get(process.env.REACT_APP_MSL_USER_MLBB_DATA_API),
    ]);

    const allUsersStatus = userListResponse.data.find(
      (item) => item.userid === LoginUserID
    );

    if (allUsersStatus?.state === "New") {
      setSuccessModalResponse(true);
      setViewLoginMSL(false);
      setMSLUsername("");
      setMSLPassword("");
      handleUserLogout();
      return { success: false, message: "Account not yet verified." };
    }

    if (!userLoggedIn) {
      return { success: false, message: "User is not logged in." };
    }

    const userProfile = userListResponse.data.find(
      (item) => item.userid === `${LoginUserID}`
    );
    const userBasicProfile = userData1Response.data.find(
      (item) => item.userid === `${LoginUserID}`
    );
    const userSchoolProfile = userData2Response.data.find(
      (item) => item.userid === `${LoginUserID}`
    );
    const userMLBBProfile = userData3Response.data.find(
      (item) => item.userid === `${LoginUserID}`
    );

    const userAllProfileData = {
      ...userProfile,
      ...userBasicProfile,
      ...userSchoolProfile,
      ...userMLBBProfile,
    };

    const profileDetailsJSON = JSON.stringify(userAllProfileData);
    localStorage.setItem("mslUserData", profileDetailsJSON);

    if (setDataUser) {
      setDataUser(userAllProfileData);
    }

    if (setViewUserCredentials) {
      setViewUserCredentials(true);
    }

    setViewUserCredentials(true);

    return { success: true, data: userAllProfileData };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      message: "An error occurred while fetching user data.",
    };
  }
};

export default fetchUserData;
