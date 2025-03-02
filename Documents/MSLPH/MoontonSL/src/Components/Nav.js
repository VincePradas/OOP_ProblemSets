import React, { useEffect, useState } from "react";
import "./CSS/nav.css";
import CryptoJS from "crypto-js";
import { FaTimes, FaPlus } from "react-icons/fa";
import { PiUserCircle, PiSignOut } from "react-icons/pi";
import {
  TbEye,
  TbEyeOff,
  TbLayoutDashboard,
  TbFlame,
  TbVocabulary,
  TbNews,
  TbCalendarStar,
  TbConfetti,
  TbExclamationCircle,
  TbKeyframeAlignHorizontal,
  TbFlare,
} from "react-icons/tb";
import {
  RiVerifiedBadgeFill,
  RiImageAddLine,
  RiSearchLine,
  RiNotification2Line,
  RiBarChart2Line,
  RiOrganizationChart,
  RiEqualizerLine,
  RiPassValidLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import HeroData from "./Json/HeroData.json";
import SLLuzon from "./Json/SLLuzonChapter.json";
import SLVisayas from "./Json/SLVisayasChapter.json";
import SLMindanao from "./Json/SLMindanaoChapter.json";
import SLAllSchool from "./Json/SLAllSchools.json";
import SLAllCourses from "./Json/SLAllCourses.json";

import { useActivePage } from "./Pages/ActivePageContect";
import { UserProfileData } from "./Pages/UserProfileContext";

import { remove as removeDiacritics } from "diacritics";
import CatCaptcha from "./Pages/CatCaptcha";
import shortVid from "./assets/videos/landingBGVideo.mp4";

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  return age;
}
const UsernameSlicer = ({ text = "", maxLength }) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <>{truncatedText}</>;
};

const AutoTextNormalizer = ({ encodedText, onNormalize }) => {
  const [decodedText, setDecodedText] = useState("");
  const [normalizedText, setNormalizedText] = useState("");

  useEffect(() => {
    const decodeText = (text) => {
      // Decode the URL-encoded text
      const decoded = decodeURIComponent(text);

      // Additional normalization if necessary (e.g., replacing special characters)
      const normalized = decoded
        .normalize("NFD") // Normalize to NFD form (decomposed form)
        .replace(/[\u0300-\u036f]/g, ""); // Remove combining diacritical marks

      return { decoded, normalized };
    };

    const { decoded, normalized } = decodeText(encodedText);
    setDecodedText(decoded);
    setNormalizedText(normalized);
    onNormalize(normalized);
  }, [encodedText, onNormalize]);

  return <>{normalizedText}</>;
};

const Nav = () => {
  const { activePage, setActivePage } = useActivePage();
  const { fetchIGNData, setViewEditProfile } = UserProfileData();
  const navigate = useNavigate();
  const [viewDefaultForm, setDefaultForm] = useState(true);
  const [viewPage1Form, setViewPage1Form] = useState(false);
  const [viewPage2Form, setViewPage2Form] = useState(false);
  const [viewPage3Form, setViewPage3Form] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [inputValueCaptcha, setInputValueCaptcha] = useState("");
  const [viewProfileNav, setViewProfileNav] = useState(false);

  const handleNavigation = (page, path) => {
    setActivePage(page);
    navigate(path);
    setViewProfileNav(false);
    setViewUserNav(false);
    setViewSearchMSLPlayer(true);
  };
  const generateCaptcha = () => {
    // Generate a random 4-digit number for the CAPTCHA
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(randomCaptcha.toString());
  };
  useEffect(() => {
    generateCaptcha();
  }, []);
  const handlePageDefault = (e) => {
    e.preventDefault();
    setDefaultForm(true);
    setViewPage1Form(false);
    setViewPage2Form(false);
    setViewPage3Form(false);
  };
  const handlePage1 = (e) => {
    e.preventDefault();
    setDefaultForm(false);
    setViewPage1Form(true);
    setViewPage2Form(false);
    setViewPage3Form(false);
  };
  const handlePage2 = (e) => {
    e.preventDefault();
    setDefaultForm(false);
    setViewPage1Form(false);
    setViewPage2Form(true);
    setViewPage3Form(false);
  };
  const handlePage3 = (e) => {
    e.preventDefault();
    setDefaultForm(false);
    setViewPage1Form(false);
    setViewPage2Form(false);
    setViewPage3Form(true);
  };

  const [viewRegisterMSL, setViewRegisterMSL] = useState(false);
  const [viewRegPassword, setViewRegPassword] = useState(false);
  const [viewLoginMSL, setViewLoginMSL] = useState(false);
  const [viewLoginPassword, setViewLoginPassword] = useState(false);

  const handleViewregister = () => {
    setViewRegisterMSL(true);
    setViewLoginMSL(false);
  };
  const handleViewlogin = () => {
    setViewRegisterMSL(false);
    setViewLoginMSL(true);
  };
  const handleCloseModals = () => {
    setViewRegisterMSL(false);
    setViewLoginMSL(false);
    setSuccessModalResponse(false);
    setViewResetPassword(false);
  };
  const handleViewRegPass = () => {
    setViewRegPassword(true);
  };
  const handleHideRegPass = () => {
    setViewRegPassword(false);
  };
  const handleViewLogPass = () => {
    setViewLoginPassword(true);
  };
  const handleHideLogPass = () => {
    setViewLoginPassword(false);
  };

  const LoginUsername = localStorage.getItem("mslUserUsername");
  const LoginUserID = localStorage.getItem("mslUserID");
  const LoginUserIGN = localStorage.getItem("mslUserIGN");
  const userLoggedIn = localStorage.getItem("isLoggedIn");
  const [viewUserCredentials, setViewUserCredentials] = useState(false);
  const [viewAdminCredentials, setViewAdminCredentials] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [dataStatus, setDataUserStatus] = useState("");

  const [messageResponse, setMessageResponse] = useState("");
  const [successModalResponse, setSuccessModalResponse] = useState(false);
  const [errorModalResponse, setErrorModalResponse] = useState(false);
  const [errorEmailResponse, setErrorEmailResponse] = useState(false);
  const [errorAgeResponse, setErrorAgeResponse] = useState(false);
  const [errorContactResponse, setErrorContactResponse] = useState(false);
  const [errorIGNResponse, setErrorIGNResponse] = useState(false);
  const [mslGivenName, setMSLGivenName] = useState("");
  const [mslSurname, setMSLSurname] = useState("");
  const [mslSuffix, setMSLSuffix] = useState("");
  const [mslEmail, setMSLEmail] = useState("");
  const [mslFacebook, setMSLFacebook] = useState("");
  const [mslBirthday, setMSLBirthday] = useState("");
  const [mslAge, setMSLAge] = useState(null);
  const [mslGender, setMSLGender] = useState("");
  const [mslContactNum, setMSLContactNum] = useState("");
  const [mslSchoolYear, setMSLSchoolYear] = useState("");
  const [mslChapter, setMSLChapter] = useState("");
  const [mslRegion, setMSLRegion] = useState("");
  const [mslSchoolName, setMSLSchoolName] = useState("");
  const [mslSchoolID, setMSLSchoolID] = useState("");
  const [mslUserCourse, setMSLUserCourse] = useState("");
  const [mslUserProof, setMSLUserProof] = useState("");
  const [mslUserIGN, setMSLUserIGN] = useState("");
  const [mslUserID, setMSLUserID] = useState("");
  const [mslUserServer, setMSLUserServer] = useState("");
  const [mslUserSquad1, setMSLUserSquad1] = useState("");
  const [mslUserSquad2, setMSLUserSquad2] = useState("");
  const [mslUserRank, setMSLUserRank] = useState("");
  const [mslUserRole, setMSLUserRole] = useState("");
  const [mslUserHero, setMSLUserHero] = useState("");
  const [mslUsername, setMSLUsername] = useState("");
  const [mslPassword, setMSLPassword] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseSearchTerm, setCourseSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [viewUserNav, setViewUserNav] = useState(false);
  const [viewUserIGN, setViewUserIGN] = useState("");
  const [normalizedIGN, setNormalizedIGN] = useState("");
  const [captchaComplete, setCaptchaComplete] = useState(null);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [reuploadCOR, setReuploadCOR] = useState(false);
  const [renewUsername, setRenewUsername] = useState("");
  const [renewUserID, setRenewUserID] = useState("");
  const [renewUserCOR, setRenewUserCOR] = useState("");
  const [viewSearchMSLPlayer, setViewSearchMSLPlayer] = useState(true);
  const MSLUserRegisterDataAPI =
    process.env.REACT_APP_MSL_USER_REGISTER_DATA_API;
  const MSLUserLoginDataAPI = process.env.REACT_APP_MSL_USER_LOGIN_DATA_API;
  const MSLUserLogoutDataAPI = process.env.REACT_APP_MSL_USER_LOGOUT_DATA_API;
  const MSLUsersListAPI = process.env.REACT_APP_MSL_USER_LIST_DATA_API;
  const MSLUserBasicAPI = process.env.REACT_APP_MSL_USER_BASIC_DATA_API;
  const MSLUserSchoolAPI = process.env.REACT_APP_MSL_USER_SCHOOL_DATA_API;
  const MSLUserMLBBAPI = process.env.REACT_APP_MSL_USER_MLBB_DATA_API;
  const MSLUserIGNDataAPI = process.env.REACT_APP_MSL_USER_MLBB_IGN_API;
  const MSLUserCustomDPAPI = process.env.REACT_APP_MSL_USER_ADD_DP_API;
  const MSLUserProofAPI = process.env.REACT_APP_MSL_USER_ADD_EC_API;
  const MSLUserUpdateCORAPI = process.env.REACT_APP_MSL_USER_UPDATE_COR_API;

  // User Reset Password
  const [viewResetPassword, setViewResetPassword] = useState(false);
  const [resetUsername, setResetUsername] = useState("");
  const [resetMSLID, setResetMSLID] = useState("");
  const [resetSchoolID, setResetSchoolID] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const MSLUserResetAPI = process.env.REACT_APP_MSL_USER_RESET_PASSWORD_API;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setMSLEmail(email);

    if (!validateEmail(email)) {
      setErrorEmailResponse(true);
      setMessageResponse("Please enter a valid email address");
    } else {
      setErrorEmailResponse(false);
    }
  };
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    // Adjust age if the birth date has not occurred yet this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }
    return age;
  };
  const handleDateChange = (e) => {
    const newBirthDate = e.target.value;
    setMSLBirthday(newBirthDate);

    if (newBirthDate) {
      const calculatedAge = calculateAge(newBirthDate);
      setMSLAge(calculatedAge);
      if (calculatedAge <= 16) {
        setErrorAgeResponse(true);
        setMessageResponse("Age must be at least 16 Up.");
      } else {
        setErrorAgeResponse(false);
      }
    } else {
      setMSLAge(null);
    }
  };
  const handleContactChange = (e) => {
    const newContactNum = e.target.value;
    // Ensure only numbers and limit to 11 digits
    if (newContactNum.length >= 11 && /^\d*$/.test(newContactNum)) {
      setMSLContactNum(newContactNum);

      if (newContactNum.length !== 11) {
        setErrorContactResponse(true);
        setMessageResponse("Contact number must be exactly 11 digits.");
      } else {
        setErrorContactResponse(false);
      }
    } else {
      setErrorContactResponse(true);
      setMessageResponse("Contact number must be exactly 11 digits.");
    }
  };
  const [imageDP, setImageDP] = useState(null);
  const [imageDPName, setImageDPName] = useState("");
  const handleUploadUserDP = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageDP(file);
      setImageDPName(file.name);
    }
  };
  const [imageEC, setImageEC] = useState(null);
  const [imageECName, setImageECName] = useState("");
  const handleUploadUserEC = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageEC(file);
      setImageECName(file.name);
    }
  };
  const [imageCOR, setImageCOR] = useState(null);
  const [imageCORName, setImageCORName] = useState("");
  const handleUploadUserCOR = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageCOR(file);
      setImageCORName(file.name);
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = SLAllSchool.filter(
      (school) =>
        school.name && school.name.toLowerCase().includes(value.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by school name

    setFilteredSchools(filtered);
  };
  const handleSchoolSelect = (school) => {
    setMSLSchoolName(school.name);
    setSearchTerm(school.name);
    setMSLChapter(school.island);
    setMSLRegion(school.region);
    setFilteredSchools([]);
  };
  const handleCourseSearchChange = (e) => {
    const value = e.target.value;
    setCourseSearchTerm(value);

    const filtered = SLAllCourses.filter(
      (course) =>
        course.program &&
        course.program.toLowerCase().includes(value.toLowerCase())
    ).sort((a, b) => a.program.localeCompare(b.program)); // Sort alphabetically by course name

    setFilteredCourses(filtered);
  };
  const handleCourseSelect = (course) => {
    setMSLUserCourse(course.program);
    setCourseSearchTerm(course.program);
    setFilteredCourses([]);
  };

  const renderProfileUser = () => {
    if (imageDPName == "") {
      return "";
    } else {
      return `${mslUsername}_${mslUserID}_${imageDPName}`;
    }
  };
  const renderCertificateUser = () => {
    if (imageECName == "") {
      return "";
    } else {
      return `${mslUsername}_${mslUserID}_${imageECName}`;
    }
  };
  const renderCORUser = () => {
    if (imageCORName == "") {
      return "";
    } else {
      return `${renewUsername}_${renewUserID}_${imageCORName}`;
    }
  };
  const fetchUserData = async () => {
    try {
      const [
        userListResponse,
        userData1Response,
        userData2Response,
        userData3Response,
      ] = await Promise.all([
        axios.get(MSLUsersListAPI),
        axios.get(MSLUserBasicAPI),
        axios.get(MSLUserSchoolAPI),
        axios.get(MSLUserMLBBAPI),
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
      } else {
        if (!userLoggedIn) return;
        setViewUserCredentials(true);
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

        const storedProfileData = localStorage.getItem("mslUserData");
        if (storedProfileData) {
          setDataUser(JSON.parse(storedProfileData));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!userLoggedIn) return;
    fetchUserData();
  }, [
    userLoggedIn,
    LoginUsername,
    LoginUserID,
    mslUsername,
    MSLUsersListAPI,
    MSLUserBasicAPI,
    MSLUserSchoolAPI,
    MSLUserMLBBAPI,
  ]);

  const [regAccountLoader, setRegAccountLoader] = useState(false);
  const handleUserRegister = async (e) => {
    e.preventDefault();
    setRegAccountLoader(true);

    const fullHash = CryptoJS.SHA256(
      `${mslUsername}, ${mslUserID}, ${mslSchoolID}, ${new Date()}`
    ).toString(CryptoJS.enc.Hex);
    const shortHash = fullHash.substring(0, 15);

    const formAddUser = {
      slAccountID: shortHash,
      slUserDP: renderProfileUser(),
      slGivenName: mslGivenName,
      slSurname: mslSurname,
      slSuffix: mslSuffix,
      slEmail: mslEmail,
      slFacebook: mslFacebook,
      slBirthday: mslBirthday,
      slAge: mslAge,
      slGender: mslGender,
      slContactNum: mslContactNum,
      slSchoolYear: mslSchoolYear,
      slChapter: mslChapter,
      slRegion: mslRegion,
      slSchoolName: mslSchoolName,
      slSchoolID: mslSchoolID,
      slUserCourse: mslUserCourse,
      slSchoolProof: renderCertificateUser(),
      slUserIGN: viewUserIGN,
      slUserMLID: mslUserID,
      slUserServer: mslUserServer,
      slUserSquad1: mslUserSquad1,
      slUserSquad2: mslUserSquad2,
      slUserRank: mslUserRank,
      slUserRole: mslUserRole,
      slUserHero: mslUserHero,
      slUsername: mslUsername,
      slUserPassword: mslPassword,
      slUserState: "New",
      slUserAdmin: "",
    };

    const formUserDPData = new FormData();
    formUserDPData.append("profileuser", mslUsername);
    formUserDPData.append("profileimg", imageDP);
    formUserDPData.append("profileimgid", mslUserID);

    const formUserProofData = new FormData();
    formUserProofData.append("userproof", mslUsername);
    formUserProofData.append("proofimg", imageEC);
    formUserProofData.append("proofimgid", mslUserID);

    try {
      if (captchaComplete) {
        // CAPTCHA verification successful
        const [responseUserRegister, responseCustomDP, responseUserProof] =
          await Promise.all([
            axios.post(MSLUserRegisterDataAPI, JSON.stringify(formAddUser), {
              headers: {
                "Content-Type": "application/json",
              },
            }),
            axios.post(MSLUserCustomDPAPI, formUserDPData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }),
            axios.post(MSLUserProofAPI, formUserProofData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }),
          ]);

        const resMessageUserRegister = responseUserRegister.data;
        const resMessageCustomDP = responseCustomDP.data;
        const resMessageUserProof = responseUserProof.data;

        if (resMessageUserRegister.success) {
          setRegAccountLoader(false);
          setViewRegisterMSL(false);
          setSuccessModalResponse(true);
          setMessageResponse(resMessageUserRegister.message);

          const timeoutId = setTimeout(() => {
            setSuccessModalResponse(false);
            setMessageResponse("");
          }, 5000);
          return () => clearTimeout(timeoutId);
        } else {
          setRegAccountLoader(false);
          setErrorModalResponse(true);
          setMessageResponse(resMessageUserRegister.message);

          const timeoutId = setTimeout(() => {
            setErrorModalResponse(false);
            setMessageResponse("");
          }, 3000);
          return () => clearTimeout(timeoutId);
        }

        // if (!resMessageCustomDP.success) {
        //     // console.log(resMessageCustomDP.message);
        // }

        // if (!resMessageUserProof.success) {
        //     // console.log(resMessageUserProof.message);
        // }
      } else {
        alert("CAPTCHA verification failed. Please try again.");
      }
    } catch (error) {
      setRegAccountLoader(false);
      setErrorModalResponse(true);
      setMessageResponse(error.message);
      const timeoutId = setTimeout(() => {
        setErrorModalResponse(false);
        setMessageResponse("");
      }, 3000);
      return () => clearTimeout(timeoutId);
    } finally {
      // Any additional finalization if needed
    }
  };
  const handleUserUpdateCOE = async (e) => {
    e.preventDefault();

    const formUpdateUser = {
      slRenewUsername: renewUsername,
      slRenewUserID: renewUserID,
      slRenewUserCOR: renderCORUser(),
    };

    const formUserUpdateCORData = new FormData();
    formUserUpdateCORData.append("userproof", renewUsername);
    formUserUpdateCORData.append("proofimg", imageCOR);
    formUserUpdateCORData.append("proofimgid", renewUserID);

    // const JSONUPDATE = JSON.stringify(formUpdateUser)
    // console.log(JSONUPDATE);

    try {
      if (reuploadCOR) {
        const [responseUserUpdate, responseCustomCOR] = await Promise.all([
          axios.post(MSLUserUpdateCORAPI, JSON.stringify(formUpdateUser), {
            headers: {
              "Content-Type": "application/json",
            },
          }),
          axios.post(MSLUserProofAPI, formUserUpdateCORData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        ]);

        const resMessageUserUpdate = responseUserUpdate.data;
        const resMessageCustomDP = responseCustomCOR.data;

        if (resMessageUserUpdate.success) {
          setMessageResponse(resMessageUserUpdate.message);
          window.location.reload();
        } else {
          setMessageResponse(resMessageUserUpdate.message);
        }

        if (!resMessageCustomDP.success) {
          setMessageResponse(resMessageCustomDP.message);
        }
      } else {
        alert("Enable to Update Data");
      }
    } catch (error) {
      // setMessageResponse(error.message);
    }
  };
  const handleUserLogin = (e) => {
    e.preventDefault();

    if (!mslUsername || !mslPassword) {
      setMessageResponse("Please fill in all fields.");
      return;
    }

    fetch(MSLUserLoginDataAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: mslUsername,
        password: mslPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setViewUserCredentials(true);
          localStorage.setItem("mslUserUsername", data.username);
          localStorage.setItem("mslUserID", data.userid);
          localStorage.setItem("isLoggedIn", "true");
          fetchUserData();
          window.location.reload();
          fetchIGNData();
        }

        if (data.success === "Not Verified") {
          setMessageResponse(data.message);
        }

        if (data.success === "Reverified") {
          setMessageResponse(data.message);
          setReuploadCOR(true);
        }

        if (data.success === "User Blocked") {
          setMessageResponse(data.message);
          handleUserLogout();
        }

        if (data.success === "Blacklisted") {
          setMessageResponse(data.message);
          window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

          const fileUrl = "https://mslphdatasheet.site/MSLBlacklisted.bat";
          const link = document.createElement("a");
          link.href = fileUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }

        if (data.success === false) {
          console.log(data.message);
          setMessageResponse(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleUserLogout = () => {
    fetch(MSLUserLogoutDataAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("mslAdminLoggedIn");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("mslUserID");
          localStorage.removeItem("mslUserUsername");
          localStorage.removeItem("mslUserIGN");
          localStorage.removeItem("mslUserData");
          setViewUserCredentials(false);
          navigate("/");
          window.location.reload();
        } else {
          setMessageResponse("Logout failed. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleViewProfileNav = () => {
    setViewProfileNav(true);
    const timeout = setTimeout(() => {
      setViewProfileNav(false);
    }, 5000); // 5 seconds
    return () => {
      clearTimeout(timeout);
    };
  };
  const handleHideProfileNav = () => {
    setViewProfileNav(false);
  };
  const handleViewMobileNav = (page) => {
    setActivePage(page);
    setViewUserNav(true);
  };
  const handleViewMSLSearch = (page) => {
    setActivePage(page);
    setViewUserNav(false);
  };
  const fetchUserIGN = async () => {
    if (!mslUserID || !mslUserServer) {
      return; // Don't fetch if userID or zoneID is empty
    }
    const formFetchIGN = {
      userID: mslUserID,
      zoneID: mslUserServer,
    };
    const jsonUserIGNData = JSON.stringify(formFetchIGN);
    try {
      const response = await axios.post(MSLUserIGNDataAPI, jsonUserIGNData);
      if (!response.data) {
        throw new Error("No data received from server");
      }
      const updatedIGNFetched = response.data.confirmationFields.username;
      setErrorIGNResponse(false);
      setViewUserIGN(updatedIGNFetched);
      setMessageResponse("");
    } catch (error) {
      console.error(error);
      setErrorIGNResponse(true);
      setMessageResponse("Please enter a valid MLBB ID and Server");
    }
  };
  useEffect(() => {
    fetchUserIGN();
  }, [mslUserID, mslUserServer]);

  const handleEditProfile = (page, path) => {
    setViewEditProfile(true);
    setActivePage(page);
    navigate(path);
    setViewProfileNav(false);
    setViewUserNav(false);
  };
  const handleCaptchaComplete = async (isCorrect) => {
    setCaptchaComplete(isCorrect);
    setIsCaptchaOpen(false);
  };
  const handleOpenCaptchaModal = () => {
    if (mslUsername === "" || mslPassword === "") {
      setMessageResponse("Please Fill all fields");
    } else {
      setIsCaptchaOpen(true);
    }
  };

  useEffect(() => {
    if (!userLoggedIn) return;

    if (dataUser.state === "Blacklisted") {
      handleUserLogout();
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }

    const keysToWatch = [
      "isLoggedIn",
      "mslUserUsername",
      "mslUserIGN",
      "mslUserID",
      "mslUserData",
    ];
    const handleStorageChange = (event) => {
      if (keysToWatch.includes(event.key)) {
        handleUserLogout();
        setTimeout(() => {
          keysToWatch.forEach((key) => localStorage.removeItem(key));
        }, 1000);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleUserLogout]);

  if (viewRegisterMSL == true || viewLoginMSL == true || viewUserNav == true) {
    window.document.body.style.overflow = "hidden";
  } else {
    window.document.body.style.overflow = "auto";
  }

  const [resetPasswordLoader, setResetPasswordLoader] = useState(false);
  const handleViewReset = () => {
    setViewResetPassword(true);
  };
  const handleUserResetUser = async (e) => {
    e.preventDefault();
    setResetPasswordLoader(true);

    const formResetPassword = {
      slSetUsername: resetUsername,
      slSetBirthday: mslBirthday,
      slSetMSLID: resetMSLID,
      slSetSchoolID: resetSchoolID,
      slSetUPassword: resetPassword,
    };
    // const jsonResetUserData = JSON.stringify(formResetPassword);
    // console.log(jsonResetUserData);

    try {
      const resetUserPassword = await axios.post(
        MSLUserResetAPI,
        formResetPassword
      );
      const responseMessage = resetUserPassword.data;

      if (responseMessage.success) {
        setResetPasswordLoader(false);
        setMessageResponse(responseMessage.message);
        setViewResetPassword(false);
        setResetUsername("");
        setResetMSLID("");
        setResetSchoolID("");
        setResetPassword("");
      } else {
        setMessageResponse(responseMessage.message);
        setResetPasswordLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      {!userLoggedIn && (
        <>
          {viewRegisterMSL && (
            <div className="navContainerModal">
              <div className="navContentModal register">
                <button className="ncmButtonClose" onClick={handleCloseModals}>
                  <FaTimes className="faIcons" />
                </button>
                {/* <img id='ncmLogo' src={require('./assets/imgs/MSLNewLogo.png')} alt="" /> */}
                <div className="navCModalForm registration">
                  <div className="ncmfReg left">
                    {!imageDP ? (
                      <h6>
                        <FaPlus className="faIcons" />
                      </h6>
                    ) : (
                      <></>
                    )}
                    {!imageDP ? (
                      <img
                        id="ncmfrlSilhoutte"
                        src={require("./assets/imgs/MSLSilhoutte/lgbtqaSilhoutte.png")}
                        alt=""
                      />
                    ) : (
                      <img
                        id="ncmfrlSilhoutte"
                        src={URL.createObjectURL(imageDP)}
                        alt="No image Selected"
                      />
                    )}
                    <input type="file" onChange={handleUploadUserDP} />
                    <img
                      id="ncmfrlBorder"
                      src={require("./assets/imgs/MSLBorders/MythicalImmortal.png")}
                      alt=""
                    />
                  </div>
                  <div className="ncmfReg right">
                    <h5>CREATE MSL ACCOUNT</h5>
                    <form onSubmit={handleUserRegister} className="ncmfrrForm">
                      <div
                        className={
                          !viewPage1Form && !viewPage2Form && !viewPage3Form
                            ? "ncmfrrFormBasic visible"
                            : "ncmfrrFormBasic"
                        }
                      >
                        <h6>BASIC DETAILS</h6>
                        <div>
                          <label htmlFor="">
                            <p>First Name</p>
                          </label>
                          <input
                            className={mslGivenName ? "inputComplete" : ""}
                            type="text"
                            name="slGivenName"
                            placeholder="ex. Crisostomo"
                            onChange={(e) => setMSLGivenName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="ncmfrrfSurname">
                          <label htmlFor="">
                            <p>Last Name</p>
                          </label>
                          <input
                            className={mslSurname ? "inputComplete" : ""}
                            type="text"
                            name="slSurname"
                            placeholder="ex. Ibarra"
                            onChange={(e) => setMSLSurname(e.target.value)}
                            required
                          />
                        </div>
                        <div className="ncmfrrfSuffix">
                          <label htmlFor="">
                            <p>Suffix</p>
                          </label>
                          {/* <input className={ mslSuffix ? 'inputComplete' : ''} type="text" name='slSuffix' placeholder='ex. Sr.' onChange={(e) => setMSLSuffix(e.target.value)}/> */}
                          <select
                            className={mslSuffix ? "inputComplete" : ""}
                            name="slSuffix"
                            id=""
                            onChange={(e) => setMSLSuffix(e.target.value)}
                          >
                            <option value="">-</option>
                            <option value="Jr">Jr</option>
                            <option value="Sr">Sr</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="">
                            <p>Valid Email Address</p>
                          </label>
                          <input
                            className={
                              mslEmail && !errorEmailResponse
                                ? "inputComplete"
                                : ""
                            }
                            type="email"
                            name="slEmail"
                            placeholder="ex. crisIbarra@email.com"
                            onChange={handleChangeEmail}
                            required
                          />
                        </div>
                        <div className="ncmfrrfBirthday">
                          <label htmlFor="">
                            <p>Birthday</p>
                          </label>
                          <input
                            className={
                              mslBirthday && !errorAgeResponse
                                ? "inputComplete"
                                : ""
                            }
                            type="date"
                            name="slBirthday"
                            value={mslBirthday}
                            onChange={handleDateChange}
                            required
                          />
                        </div>
                        <div className="ncmfrrfAge">
                          <label htmlFor="">
                            <p>Age</p>
                          </label>
                          <input
                            className={
                              mslAge && !errorAgeResponse ? "inputComplete" : ""
                            }
                            type="text"
                            name="slAge"
                            value={mslAge !== null ? mslAge : ""}
                            placeholder="0"
                            readOnly
                            disabled={mslAge !== null && mslAge < 16}
                          />
                        </div>
                        <div className="ncmfrrfGender">
                          <label htmlFor="">
                            <p>Gender</p>
                          </label>
                          <select
                            className={mslGender ? "inputComplete" : ""}
                            name="slGender"
                            onChange={(e) => setMSLGender(e.target.value)}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Empty">Prefer not to say</option>
                          </select>
                        </div>
                        <div className="ncmfrrfContact">
                          <label htmlFor="">
                            <p>Contact No.</p>
                          </label>
                          <input
                            className={
                              mslContactNum && !errorContactResponse
                                ? "inputComplete"
                                : ""
                            }
                            type="number"
                            name="slContactNum"
                            placeholder="ex. 09** **** ***"
                            onChange={handleContactChange}
                            required
                          />
                        </div>
                        <div className="ncmfrrfFacebook">
                          <label htmlFor="">
                            <p>Facebook Link</p>
                          </label>
                          <input
                            className={mslFacebook ? "inputComplete" : ""}
                            type="text"
                            name="slFacebook"
                            placeholder="ex. https://facebook.com/..."
                            onChange={(e) => setMSLFacebook(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div
                        className={
                          !viewPage1Form && !viewPage2Form && !viewPage3Form
                            ? "ncmfrrFormPageBtn visible"
                            : "ncmfrrFormPageBtn"
                        }
                      >
                        <button
                          type="button"
                          className={
                            errorModalResponse ||
                            !mslGivenName ||
                            !mslGivenName ||
                            !mslEmail ||
                            !mslFacebook ||
                            !mslBirthday ||
                            !mslGender ||
                            !mslContactNum
                              ? "disabled"
                              : ""
                          }
                          onClick={handlePage1}
                          disabled={
                            errorModalResponse ||
                            !mslGivenName ||
                            !mslGivenName ||
                            !mslEmail ||
                            !mslFacebook ||
                            !mslBirthday ||
                            !mslGender ||
                            !mslContactNum
                          }
                        >
                          Next
                        </button>
                      </div>

                      <div
                        className={
                          !viewDefaultForm && !viewPage2Form && !viewPage3Form
                            ? "ncmfrrFormBasic visible"
                            : "ncmfrrFormBasic"
                        }
                      >
                        <h6>SCHOOL DETAILS</h6>
                        <div className="ncmfrrfbYear">
                          <label htmlFor="">
                            <p>Year Level</p>
                          </label>
                          <select
                            className={mslSchoolYear ? "inputComplete" : ""}
                            name="slSchoolYear"
                            onChange={(e) => setMSLSchoolYear(e.target.value)}
                            required
                          >
                            <option value="">Select Year Level</option>
                            <option value="Grade 11">Grade 11 SHS</option>
                            <option value="Grade 12">Grade 12 SHS</option>
                            <option value="Freshmen">Freshmen (1st Yr)</option>
                            <option value="Sophomore">
                              Sophomore (2nd Yr)
                            </option>
                            <option value="Junior">Junior (3rd Yr)</option>
                            <option value="Senior">Senior (4th Yr Up)</option>
                            <option value="Alumni">Alumni</option>
                            <option value="Masters">Masters</option>
                            <option value="Doctorate">Doctorate</option>
                          </select>
                        </div>
                        <div className="ncmfrrfbSearchSchool">
                          <label htmlFor="">
                            <p>University / College / Institute</p>
                          </label>
                          <input
                            className={mslSchoolName ? "inputComplete" : ""}
                            type="text"
                            name="slSchoolName"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search for your School"
                            required
                          />
                          {filteredSchools.length > 0 && (
                            <ul>
                              {filteredSchools.map((school, i) => (
                                <li
                                  key={i}
                                  onClick={() => handleSchoolSelect(school)}
                                >
                                  <p>{school.name}</p>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="ncmfrrIsland">
                          <label htmlFor="">
                            <p>Island</p>
                          </label>
                          <input
                            className={mslChapter ? "inputComplete" : ""}
                            type="text"
                            name="slChapter"
                            value={mslChapter}
                            readOnly
                            required
                          />
                        </div>
                        <div className="ncmfrrRegion">
                          <label htmlFor="">
                            <p>Region</p>
                          </label>
                          <input
                            className={mslRegion ? "inputComplete" : ""}
                            type="text"
                            name="slRegion"
                            value={mslRegion}
                            readOnly
                            required
                          />
                        </div>
                        <div className="ncmfrrstudentID">
                          <label htmlFor="">
                            <p>Student ID</p>
                          </label>
                          <input
                            className={mslSchoolID ? "inputComplete" : ""}
                            type="text"
                            name="slSchoolID"
                            placeholder="*** **** ***"
                            onChange={(e) => setMSLSchoolID(e.target.value)}
                            disabled={!mslSchoolYear || !mslSchoolName}
                            required
                          />
                        </div>
                        <div className="ncmfrrfCourse">
                          <label htmlFor="">
                            <p>Course or Program</p>
                          </label>
                          <input
                            className={mslUserCourse ? "inputComplete" : ""}
                            type="text"
                            name="slUserCourse"
                            value={courseSearchTerm}
                            onChange={handleCourseSearchChange}
                            placeholder="ex. BS in Esports Gaming"
                            required
                          />
                          {filteredCourses.length > 0 && (
                            <ul>
                              {filteredCourses.map((course, i) => (
                                <li
                                  key={i}
                                  onClick={() => handleCourseSelect(course)}
                                >
                                  <p>{course.program}</p>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div className="ncmfrrProof">
                          <label htmlFor="">
                            <p>Cert. of Enrollment</p>
                          </label>
                          <input
                            className={imageEC ? "inputComplete" : ""}
                            type="file"
                            name="slSchoolProof"
                            onChange={handleUploadUserEC}
                            required
                          />
                        </div>
                      </div>
                      <div
                        className={
                          !viewDefaultForm && !viewPage2Form && !viewPage3Form
                            ? "ncmfrrFormPageBtn visible"
                            : "ncmfrrFormPageBtn"
                        }
                      >
                        <button type="button" onClick={handlePageDefault}>
                          Prev
                        </button>
                        <button
                          type="button"
                          className={
                            !mslSchoolYear ||
                            !mslChapter ||
                            !mslRegion ||
                            !mslSchoolName ||
                            !mslSchoolID ||
                            !mslUserCourse ||
                            !imageEC
                              ? "disabled"
                              : ""
                          }
                          onClick={handlePage2}
                          disabled={
                            !mslSchoolYear ||
                            !mslChapter ||
                            !mslRegion ||
                            !mslSchoolName ||
                            !mslSchoolID ||
                            !mslUserCourse ||
                            !imageEC
                          }
                        >
                          Next
                        </button>
                      </div>

                      <div
                        className={
                          !viewDefaultForm && !viewPage1Form && !viewPage3Form
                            ? "ncmfrrFormBasic visible"
                            : "ncmfrrFormBasic"
                        }
                      >
                        <h6>MLBB DETAILS</h6>
                        <div className="ncmfrrfID">
                          <label htmlFor="">
                            <p>MLBB User ID</p>
                          </label>
                          <input
                            className={mslUserID ? "inputComplete" : ""}
                            type="number"
                            name="slUserID"
                            placeholder="*********"
                            onChange={(e) => setMSLUserID(e.target.value)}
                            required
                          />
                        </div>
                        <div className="ncmfrrfServer">
                          <label htmlFor="">
                            <p>MLBB Server ID</p>
                          </label>
                          <input
                            className={mslUserServer ? "inputComplete" : ""}
                            type="number"
                            maxLength={6}
                            name="slUserServer"
                            placeholder="*****"
                            onChange={(e) => setMSLUserServer(e.target.value)}
                            required
                          />
                        </div>
                        <div className="ncmfrrfIGN">
                          <label htmlFor="">
                            <p>IGN</p>
                          </label>
                          <input
                            className={
                              mslUserID && mslUserServer ? "inputComplete" : ""
                            }
                            type="text"
                            value={normalizedIGN}
                            readOnly
                            required
                          />
                          <p id="mslIGNConvert">
                            <AutoTextNormalizer
                              encodedText={viewUserIGN}
                              onNormalize={setNormalizedIGN}
                            />
                          </p>
                        </div>
                        <div>
                          <label htmlFor="">
                            <p>MLBB Squad Name (Optional)</p>
                          </label>
                          <input
                            className={mslUserSquad1 ? "inputComplete" : ""}
                            type="text"
                            name="slUserSquad1"
                            placeholder="ex. El Fili Esports"
                            onChange={(e) => setMSLUserSquad1(e.target.value)}
                          />
                        </div>
                        <div>
                          <label htmlFor="">
                            <p>Squad Abrev. (Optional)</p>
                          </label>
                          <input
                            className={mslUserSquad2 ? "inputComplete" : ""}
                            type="text"
                            name="slUserSquad2"
                            placeholder="ex. FILI"
                            onChange={(e) => setMSLUserSquad2(e.target.value)}
                          />
                        </div>
                        <div className="ncmfrrfRank">
                          <label htmlFor="">
                            <p>Current Rank</p>
                          </label>
                          <select
                            className={mslUserRank ? "inputComplete" : ""}
                            name="slUserRank"
                            onChange={(e) => setMSLUserRank(e.target.value)}
                            required
                          >
                            <option value="">Select Ranking</option>
                            <option value="Mythical Immortal">
                              Mythical Immortal
                            </option>
                            <option value="Mythical Glory">
                              Mythical Glory
                            </option>
                            <option value="Mythical Honor">
                              Mythical Honor
                            </option>
                            <option value="Mythic">Mythic</option>
                            <option value="Legend">Legend</option>
                            <option value="Epic">Epic</option>
                            <option value="Grand Master">Grand Master</option>
                            <option value="Master">Master</option>
                            <option value="Elite">Elite</option>
                            <option value="Warrior">Warrior</option>
                          </select>
                        </div>
                        <div className="ncmfrrfRole">
                          <label htmlFor="">
                            <p>In-Game-Role</p>
                          </label>
                          <select
                            className={mslUserRole ? "inputComplete" : ""}
                            name="slUserRole"
                            onChange={(e) => setMSLUserRole(e.target.value)}
                            required
                          >
                            <option value="">Select Role</option>
                            <option value="Mid Laner">Mid Laner</option>
                            <option value="Exp Laner">Exp Laner</option>
                            <option value="Gold Laner">Gold Laner</option>
                            <option value="Roamer">Roamer</option>
                            <option value="Jungler">Jungler</option>
                          </select>
                        </div>
                        <div className="ncmfrrfHero">
                          <label htmlFor="">
                            <p>Main Hero</p>
                          </label>
                          <select
                            className={mslUserHero ? "inputComplete" : ""}
                            name="slUserHero"
                            onChange={(e) => setMSLUserHero(e.target.value)}
                            required
                          >
                            <option value="">Select Hero</option>
                            {HeroData.sort((a, b) =>
                              a.name.localeCompare(b.name)
                            ).map((hero, i) => (
                              <option value={hero.name} key={i}>
                                {hero.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div
                        className={
                          !viewDefaultForm && !viewPage1Form && !viewPage3Form
                            ? "ncmfrrFormPageBtn visible"
                            : "ncmfrrFormPageBtn"
                        }
                      >
                        <button type="button" onClick={handlePage1}>
                          Prev
                        </button>
                        <button
                          type="button"
                          className={
                            !viewUserIGN ||
                            !mslUserID ||
                            !mslUserServer ||
                            !mslUserRank ||
                            !mslUserRole ||
                            !mslUserHero
                              ? "disabled"
                              : ""
                          }
                          onClick={handlePage3}
                          disabled={
                            !viewUserIGN ||
                            !mslUserID ||
                            !mslUserServer ||
                            !mslUserRank ||
                            !mslUserRole ||
                            !mslUserHero
                          }
                        >
                          Next
                        </button>
                      </div>

                      <div
                        className={
                          !viewDefaultForm && !viewPage1Form && !viewPage2Form
                            ? "ncmfrrFormBasic account visible"
                            : "ncmfrrFormBasic"
                        }
                      >
                        <img
                          src={require("./assets/imgs/MSLPHNewLogo.png")}
                          alt=""
                        />
                        <div className="ncmfrrfUsername">
                          <label htmlFor="">
                            <p>Username</p>
                          </label>
                          <input
                            type="text"
                            name="slUsername"
                            placeholder="ex. Simoun"
                            onChange={(e) => setMSLUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="ncmfrrfPassword">
                          <label htmlFor="">
                            <p>Password</p>
                          </label>
                          {!viewRegPassword ? (
                            <button type="button" onClick={handleViewRegPass}>
                              <TbEye />
                            </button>
                          ) : (
                            <button type="button" onClick={handleHideRegPass}>
                              <TbEyeOff />
                            </button>
                          )}
                          <input
                            type={!viewRegPassword ? "password" : "text"}
                            name="slUserPassword"
                            placeholder="*********"
                            onChange={(e) => setMSLPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="recaptchaSetup" id="recaptchaSetup">
                          {!captchaComplete ? (
                            <button
                              type="button"
                              className={
                                !mslUsername || !mslPassword ? "disabled" : ""
                              }
                              onClick={handleOpenCaptchaModal}
                              disabled={!mslUsername || !mslPassword}
                            >
                              Cat Captcha
                            </button>
                          ) : (
                            <button type="button" className="complete">
                              Cat Captcha
                            </button>
                          )}
                          <h4>{!captchaComplete ? "😿" : "😸"}</h4>
                        </div>
                      </div>
                      <div
                        className={
                          !viewDefaultForm && !viewPage1Form && !viewPage2Form
                            ? "ncmfrrFormPageBtn visible"
                            : "ncmfrrFormPageBtn"
                        }
                      >
                        <button type="button" onClick={handlePage2}>
                          Prev
                        </button>
                        {!regAccountLoader ? (
                          <>
                            <button
                              type="submit"
                              className={
                                !mslUsername || !mslPassword || !captchaComplete
                                  ? "disabled"
                                  : ""
                              }
                              disabled={
                                !mslUsername || !mslPassword || !captchaComplete
                              }
                            >
                              Submit
                            </button>
                          </>
                        ) : (
                          <>
                            <button type="button">Submitting</button>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                {errorIGNResponse && (
                  <div className="registrationError">
                    <p>{messageResponse}</p>
                  </div>
                )}
                {errorContactResponse && (
                  <div className="registrationError">
                    <p>{messageResponse}</p>
                  </div>
                )}
                {errorAgeResponse && (
                  <div className="registrationError">
                    <p>{messageResponse}</p>
                  </div>
                )}
                {errorEmailResponse && (
                  <div className="registrationError">
                    <p>{messageResponse}</p>
                  </div>
                )}
                {errorModalResponse && (
                  <div className="registrationError">
                    <p>{messageResponse}</p>
                  </div>
                )}
                <div className="navcmfReg">
                  <p>Already have an Account?</p>
                  <a onClick={handleViewlogin}>
                    <p>Sign In</p>
                  </a>
                </div>
              </div>
            </div>
          )}
          {viewLoginMSL && (
            <div className="navContainerModal">
              <div className="navContentModal login">
                <button className="ncmButtonClose" onClick={handleCloseModals}>
                  <FaTimes className="faIcons" />
                </button>
                <div className="navcmloginContainer">
                  <div className="navcmlc left">
                    <div className="navCModalForm login">
                      <div className="ncmfLog">
                        {!viewResetPassword ? (
                          <>
                            {!reuploadCOR ? (
                              <>
                                <h5>LOGIN MSL ACCOUNT</h5>
                                <form onSubmit={handleUserLogin}>
                                  <img
                                    src={require("./assets/imgs/MSLPHNewLogo.png")}
                                    alt=""
                                  />
                                  <div className="ncmfLogContainer">
                                    <div>
                                      <label htmlFor="">
                                        <p>Username</p>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="ex. Simeon"
                                        value={mslUsername}
                                        onChange={(e) =>
                                          setMSLUsername(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="ncmflcPassword">
                                      <label htmlFor="">
                                        <p>Password</p>
                                      </label>
                                      {!viewLoginPassword ? (
                                        <button
                                          type="button"
                                          onClick={handleViewLogPass}
                                        >
                                          <TbEye />
                                        </button>
                                      ) : (
                                        <button
                                          type="button"
                                          onClick={handleHideLogPass}
                                        >
                                          <TbEyeOff />
                                        </button>
                                      )}
                                      <input
                                        type={
                                          !viewLoginPassword
                                            ? "password"
                                            : "text"
                                        }
                                        placeholder="*********"
                                        value={mslPassword}
                                        onChange={(e) =>
                                          setMSLPassword(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="ncmflcLogin">
                                      <button type="submit">LOGIN</button>
                                    </div>
                                  </div>
                                </form>
                              </>
                            ) : (
                              <>
                                <h5>RENEW MSL ACCOUNT</h5>
                                <form onSubmit={handleUserUpdateCOE}>
                                  <img
                                    src={require("./assets/imgs/MSLPHNewLogo.png")}
                                    alt=""
                                  />
                                  <div className="ncmfLogContainer">
                                    <div>
                                      <label htmlFor="">
                                        <p>Username</p>
                                      </label>
                                      <input
                                        type="text"
                                        name="slRenewUsername"
                                        onChange={(e) =>
                                          setRenewUsername(e.target.value)
                                        }
                                        placeholder="ex. Simeon"
                                        required
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="">
                                        <p>MLBB User ID</p>
                                      </label>
                                      <input
                                        type="number"
                                        name="slRenewUserID"
                                        onChange={(e) =>
                                          setRenewUserID(e.target.value)
                                        }
                                        placeholder="*********"
                                        required
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor="">
                                        <p>Updated COE/COR</p>
                                      </label>
                                      <input
                                        type="file"
                                        onChange={handleUploadUserCOR}
                                        required
                                      />
                                    </div>
                                    <div className="ncmflcLogin">
                                      <button type="submit">SUBMIT</button>
                                    </div>
                                  </div>
                                </form>
                              </>
                            )}
                            <div className="navcmfErrorHandling">
                              <p>{messageResponse}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <form onSubmit={handleUserResetUser}>
                              <div className="ncmfLogContainer">
                                <div>
                                  <label htmlFor="">
                                    <p>Username</p>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="ex. Simeon"
                                    value={resetUsername}
                                    onChange={(e) =>
                                      setResetUsername(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label htmlFor="">
                                    <p>Birthday</p>
                                  </label>
                                  <input
                                    type="date"
                                    value={mslBirthday}
                                    onChange={handleDateChange}
                                  />
                                </div>
                                <div>
                                  <input
                                    type="number"
                                    placeholder="Insert MLID"
                                    value={resetMSLID}
                                    onChange={(e) =>
                                      setResetMSLID(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <input
                                    type="type"
                                    placeholder="Insert School ID"
                                    value={resetSchoolID}
                                    onChange={(e) =>
                                      setResetSchoolID(e.target.value)
                                    }
                                  />
                                </div>
                                <div>
                                  <label htmlFor="">
                                    <p>New Password</p>
                                  </label>
                                  <input
                                    type="password"
                                    placeholder="********"
                                    value={resetPassword}
                                    onChange={(e) =>
                                      setResetPassword(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="ncmflcReset">
                                  {!resetPasswordLoader ? (
                                    <button type="submit">
                                      RESET PASSWORD
                                    </button>
                                  ) : (
                                    <button type="button">
                                      VERIFYING INFO
                                    </button>
                                  )}
                                </div>
                                <div className="navcmfErrorHandling">
                                  <p>{messageResponse}</p>
                                </div>
                              </div>
                            </form>
                          </>
                        )}
                        {!viewResetPassword && (
                          <div className="navcmfForgotPassword">
                            <button type="button" onClick={handleViewReset}>
                              Forgot Password
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="navcmfReg">
                      <p>Don't have an account yet?</p>
                      <a onClick={handleViewregister}>
                        <p>Sign Up</p>
                      </a>
                    </div>
                  </div>
                  <div className="navcmlc right">
                    <video className="navcmlcrVideo" autoPlay muted loop>
                      <source
                        src={
                          "https://mslphdatasheet.site/MSLVideo/M6PortalTeaser.mp4"
                        }
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          )}
          {successModalResponse && (
            <div className="navContainerModal">
              <div className="navContentModal regSuccess">
                <button className="ncmButtonClose" onClick={handleCloseModals}>
                  <FaTimes className="faIcons" />
                </button>
                <img src={require("./assets/imgs/MSLLogoSuccess.png")} alt="" />
                <h5>CONGRATULATIONS!</h5>
                <p>
                  Your MSL Account was successfully recorded, <br /> Please wait
                  for your Campus SL Confirmation.
                </p>
              </div>
            </div>
          )}
          {isCaptchaOpen && (
            <div className="navContainerModal catCaptcha">
              <div className="navContentModal captcha">
                <CatCaptcha onComplete={handleCaptchaComplete} />
              </div>
            </div>
          )}
        </>
      )}

      <div className="mainNavContainer">
        <div
          className={
            !viewUserNav ? "navContainer website" : "navContainer website out"
          }
        >
          <div className="navContent left">
            <Link to="/" onClick={() => handleNavigation("home", "/")}>
              <img src={require("./assets/imgs/MSLPHNewLogo.png")} alt="" />
            </Link>
          </div>
          <div className="navContent right">
            <div className="navcr navSelections">
              <Link
                className={`${activePage === "dashboard" ? "active" : ""}`}
                to="/Dashboard"
                onClick={() => handleNavigation("dashboard", "/Dashboard")}
              >
                <h6>Dashboard</h6>
              </Link>
              <Link
                className={`${activePage === "events" ? "active" : ""}`}
                to="/Events"
                onClick={() => handleNavigation("events", "/Events")}
              >
                <h6>Events</h6>
              </Link>
              <Link
                className={`${activePage === "news" ? "active" : ""}`}
                to="/news"
                onClick={() => handleNavigation("news", "/news")}
              >
                <h6>News</h6>
              </Link>
              <Link
                className={`${activePage === "programs" ? "active" : ""}`}
                to="/Programs"
                onClick={() => handleNavigation("programs", "/Programs")}
              >
                <h6>Programs</h6>
              </Link>
              <Link
                className={`${activePage === "Campus" ? "active" : ""}`}
                to="/Campus"
                onClick={() => handleNavigation("Campus", "/Campus")}
              >
                <h6>Resources</h6>
              </Link>
              <Link
                className={`${activePage === "About" ? "active" : ""}`}
                to="/About"
                onClick={() => handleNavigation("About", "/About")}
              >
                <h6>About</h6>
              </Link>
            </div>
            {!userLoggedIn || !viewUserCredentials ? (
              <>
                <div className="navcr userAccounts">
                  <Link
                    to="/SearchMSLPlayer"
                    onClick={() => handleViewMSLSearch("search")}
                    className="navcruaSearch"
                  >
                    {/* <p>Search Player</p> */}
                    <h5>
                      <RiSearchLine className="faIcons" />
                    </h5>
                  </Link>
                  <button id="loginMSL" onClick={handleViewlogin}>
                    <PiUserCircle className="faIcons" />
                  </button>
                  <button id="registerMSL" onClick={handleViewregister}>
                    SIGN UP
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/SearchMSLPlayer"
                  onClick={() => handleViewMSLSearch("search")}
                  className="navcruaSearch"
                >
                  {/* <p>Search Player</p> */}
                  <h5>
                    <RiSearchLine className="faIcons" />
                  </h5>
                </Link>
                <div className="navcr userLoggedIn">
                  <Link
                    to="/SearchMSLPlayer"
                    onClick={() => handleViewMSLSearch("search")}
                    id="navcrulSearch"
                  >
                    <h5>
                      <RiSearchLine className="faIcons" />
                    </h5>
                  </Link>
                  {!viewProfileNav ? (
                    <button id="MSLProfile" onClick={handleViewProfileNav}>
                      <div>
                        {dataUser.profile ? (
                          <img
                            src={`https://mslphdatasheet.site/MSLProfileImage/${dataUser.profile}`}
                            alt=""
                          />
                        ) : (
                          <img src="" gender={dataUser.gender} alt="" />
                        )}
                      </div>
                    </button>
                  ) : (
                    <button id="MSLProfile" onClick={handleHideProfileNav}>
                      <div>
                        {dataUser.profile ? (
                          <img
                            src={`https://mslphdatasheet.site/MSLProfileImage/${dataUser.profile}`}
                            alt=""
                          />
                        ) : (
                          <img src="" gender={dataUser.gender} alt="" />
                        )}
                      </div>
                    </button>
                  )}
                  {viewProfileNav && (
                    <div className="navcrModalContent">
                      <Link
                        to="/Profile"
                        onClick={() => handleNavigation("profile", "/Profile")}
                      >
                        <h6>MY PROFILE</h6>
                      </Link>
                      <Link
                        onClick={() =>
                          handleNavigation("notifications", "/Notifications")
                        }
                      >
                        <h6>NOTIFICATIONS</h6>
                      </Link>
                      {(dataUser.administrator === "Super Admin" ||
                        dataUser.badge === "Gold" ||
                        dataUser.badge === "Dev") && (
                        <Link
                          to="/MainAdminPanel"
                          onClick={() =>
                            handleNavigation("admin", "/MainAdminPanel")
                          }
                        >
                          <h6>MAIN ADMIN PANEL</h6>
                        </Link>
                      )}
                      {(dataUser.administrator === "Super Admin" ||
                        dataUser.administrator === "National Admin" ||
                        dataUser.administrator === "Regional Admin" ||
                        dataUser.administrator === "SL") && (
                        <>
                          <Link
                            to="/SLAdminPanel"
                            onClick={() =>
                              handleNavigation("approval", "/StudentApproval")
                            }
                          >
                            <h6>SL ADMIN PANEL</h6>
                          </Link>
                          <Link
                            to="/opentournament/admin"
                            onClick={() =>
                              handleNavigation(
                                "opentournament/admin",
                                "/opentournament/admin"
                              )
                            }
                          >
                            <h6>OPEN TOURNAMENT</h6>
                          </Link>
                        </>
                      )}
                      <Link
                        onClick={() =>
                          handleNavigation("monthly", "/MonthlyTournament")
                        }
                      >
                        <h6> MONTHLY TOURNAMENTS</h6>
                      </Link>
                      <Link onClick={handleUserLogout}>
                        <h6>SIGN OUT</h6>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="navContainer mobile border">
          <div className="navContentMobile">
            <button
              className={`${activePage === "dashboard" ? "active" : ""}`}
              onClick={() => handleNavigation("dashboard", "/Dashboard")}
            >
              <TbLayoutDashboard className="faIcons" />
            </button>
            <button
              className={`${activePage === "news" ? "active" : ""}`}
              onClick={() => handleNavigation("news", "/News")}
            >
              <TbNews className="faIcons" />
            </button>
            <button
              className={`${activePage === "events" ? "active" : ""}`}
              onClick={() => handleNavigation("events", "/Events")}
            >
              <TbCalendarStar className="faIcons" />
            </button>
            <button
              className={`${activePage === "programs" ? "active" : ""}`}
              onClick={() => handleNavigation("programs", "/Programs")}
            >
              <TbConfetti className="faIcons" />
            </button>
            <button
              className={`${activePage === "about" ? "active" : ""}`}
              onClick={() => handleNavigation("about", "/About")}
            >
              <TbExclamationCircle className="faIcons" />
            </button>
            {viewUserCredentials && (
              <Link
                className={`${activePage === "profile" ? "active" : ""}`}
                id="MSLProfileMobile"
                onClick={() => handleViewMobileNav("profile")}
              >
                <div>
                  {dataUser.profile ? (
                    <img
                      src={`https://mslphdatasheet.site/MSLProfileImage/${dataUser.profile}`}
                      alt=""
                    />
                  ) : (
                    <img src="" gender={dataUser.gender} alt="" />
                  )}
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {userLoggedIn && (
        <div className="navcmLoggedNav">
          <div
            className={
              viewUserNav ? "navcmUserNavigation active" : "navcmUserNavigation"
            }
          >
            <Link
              to="/SearchMSLPlayer"
              onClick={() => handleViewMSLSearch("search")}
              className="navcmunSearchUser"
            >
              <p>Search MSL Player</p>
              <h5>
                <RiSearchLine className="faIcons" />
              </h5>
            </Link>
            <Link
              className="navcmunLoggedUser"
              to="/Profile"
              onClick={() => handleNavigation("profile", "/Profile")}
            >
              <div>
                {dataUser.profile ? (
                  <img
                    src={`https://mslphdatasheet.site/MSLProfileImage/${dataUser.profile}`}
                    alt=""
                  />
                ) : (
                  <img src="" gender={dataUser.gender} alt="" />
                )}
              </div>
              <span>
                {/* <p id="mslIGNConvert">
                <AutoTextNormalizer encodedText={(dataUser.mslign ? dataUser.mslign : LoginUserIGN)} onNormalize={setNormalizedIGN}/>
              </p> */}
                <h2>
                  {dataUser.username && (
                    <UsernameSlicer text={dataUser.username} maxLength={10} />
                  )}
                  {dataUser.badge && (
                    <sup>
                      <RiVerifiedBadgeFill
                        className={`faIcons ${dataUser.badge}`}
                      />
                    </sup>
                  )}
                </h2>
              </span>
            </Link>
            <div className="navmunNavLinks">
              <Link>
                <h5>
                  <RiNotification2Line className="faIcons" /> Notifications
                </h5>
              </Link>
              <Link>
                <h5>
                  <RiBarChart2Line className="faIcons" /> My Stats
                </h5>
              </Link>
              <Link>
                <h5>
                  <RiOrganizationChart className="faIcons" /> Tournaments
                </h5>
              </Link>
              <Link
                to="/Profile"
                onClick={() => handleEditProfile("profile", "/Profile")}
              >
                <h5>
                  <RiEqualizerLine className="faIcons" /> Settings
                </h5>
              </Link>
 
              {(dataUser.administrator === "Super Admin" ||
                dataUser.administrator === "National Admin" ||
                dataUser.administrator === "Regional Admin" ||
                dataUser.administrator === "SL") && (
                <>
                  <Link to="/sladminpanel" onClick={handleUserLogout}>
                    <h5>
                      <RiPassValidLine className="faIcons" /> SL Admin Panel
                    </h5>
                  </Link>
                  <Link
                to="/opentournament/admin"
              >
                <h5>
                  <TbKeyframeAlignHorizontal className="faIcons" /> OpenTM Admin
                </h5>
              </Link>
                </>
              )}
              <Link to="" onClick={handleUserLogout}>
                <h5>
                  <RiLogoutBoxLine className="faIcons" /> Sign Out
                </h5>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
