import React, { useState, useEffect } from "react";
import useIsMobile from "../hooks/useIsMobile";
import fetchUserData from "../hooks/fetchUserData";
import PromptModal from "./PromptModal";
import LoginModal from "./Login";
import RegistrationModal from "./Registration";
import SchoolsJSON from "../../../Json/SLAllSchools.json";
import CoursesJSON from "../../../Json/SLAllCourses.json";
import HeroesJSON from "../../../Json/HeroData.json";

const MSLRegistrationModal = () => {
  const isMobile = useIsMobile();
  const [showPromptModal, setShowPromptModal] = useState(true);
  const [viewRegisterMSL, setViewRegisterMSL] = useState(false);
  const [viewLoginMSL, setViewLoginMSL] = useState(false);
  const [viewPage1Form, setViewPage1Form] = useState(true);
  const [viewPage2Form, setViewPage2Form] = useState(false);
  const [viewPage3Form, setViewPage3Form] = useState(false);
  const [viewPage4Form, setViewPage4Form] = useState(false);
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [messageResponse, setMessageResponse] = useState("");
  const [viewUserCredentials, setViewUserCredentials] = useState(false);
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    setSchools(SchoolsJSON);
    setCourses(CoursesJSON);
    setHeroes(HeroesJSON);
  }, []);

  const generateDynamicID = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    return `MSL-${timestamp}-${randomString}`;
  };

  const sortedSchools = [...SchoolsJSON].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const sortedCourses = [...CoursesJSON].sort((a, b) =>
    a.program.localeCompare(b.program)
  );
  const sortedHeroes = [...HeroesJSON]
    .map((hero) => ({ value: hero.name, label: hero.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const initialFormData = {
    slAccountID: generateDynamicID(),
    slUserDP: "",
    slGivenName: "",
    slSurname: "",
    slSuffix: "",
    slEmail: "",
    slFacebook: "",
    slBirthday: "",
    slGender: "",
    slContactNum: "",
    slSchoolYear: "",
    slChapter: "",
    slRegion: "",
    slSchoolName: "",
    slSchoolID: "",
    slUserCourse: "",
    slSchoolProof: "",
    slUserIGN: "",
    slUserMLID: "",
    slUserServer: "",
    slUserSquad1: "",
    slUserSquad2: "",
    slUserRank: "",
    slUserRole: "",
    slUserHero: "",
    slUsername: "",
    slUserPassword: "",
    slUserState: "New",
    slUserAdmin: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateContactNumber = (contactNum) => {
    const regex = /^\d{11}$/;
    return regex.test(contactNum);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "slEmail" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, slEmail: "Invalid email format" }));
    } else if (name === "slContactNum" && !validateContactNumber(value)) {
      setErrors((prev) => ({
        ...prev,
        slContactNum: "Contact number must be 11 digits",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "slSchoolName") {
      const selectedSchool = schools.find((school) => school.name === value);
      if (selectedSchool) {
        setFormData((prev) => ({
          ...prev,
          slChapter: selectedSchool.island,
          slRegion: selectedSchool.region,
        }));
      }
    }

    if (e.target.type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("proofimg", file);
    formData.append("userproof", formData.slUsername);
    formData.append("proofimgid", formData.slAccountID);

    try {
      const response = await fetch(process.env.REACT_APP_MSL_UPLOAD_CERT_API, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const validateFields = (fields) => {
    const newErrors = {};
    const missingFields = [];

    fields.forEach(({ field, message }) => {
      if (!formData[field]) {
        newErrors[field] = message;
        missingFields.push(message);
      }
    });

    if (missingFields.length > 0) {
      alert(
        `Please fill in the following fields:\n${missingFields.join("\n")}`
      );
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  const validationRules = {
    page1: [
      { field: "slGivenName", message: "First Name is required" },
      { field: "slSurname", message: "Last Name is required" },
      { field: "slEmail", message: "Email is required" },
      { field: "slBirthday", message: "Birthday is required" },
      { field: "slGender", message: "Gender is required" },
      { field: "slContactNum", message: "Contact Number is required" },
      { field: "slFacebook", message: "Facebok link is required" },
    ],
    page2: [
      { field: "slSchoolYear", message: "Year Level is required" },
      { field: "slSchoolName", message: "School Name is required" },
      { field: "slSchoolID", message: "Student ID is required" },
      { field: "slChapter", message: "Island is required" },
      { field: "slRegion", message: "Region is required" },
      { field: "slUserCourse", message: "Course or Program is required" },
      {
        field: "slSchoolProof",
        message: "Certificate of Enrollment is required",
      },
    ],
    page3: [
      { field: "slUserMLID", message: "MLBB User ID is required" },
      { field: "slUserServer", message: "MLBB Server ID is required" },
      { field: "slUserIGN", message: "IGN is required" },
      { field: "slUserRank", message: "Rank is required" },
      { field: "slUserRole", message: "Role is required" },
      { field: "slUserHero", message: "Main Hero is required" },
    ],
    page4: [
      { field: "slUsername", message: "Username is required" },
      { field: "slUserPassword", message: "Password is required" },
    ],
  };

  const handlePage1 = () => {
    if (validateFields(validationRules.page1)) {
      setViewPage1Form(true);
      setViewPage2Form(false);
      setViewPage3Form(false);
      setViewPage4Form(false);
    }
  };

  const handlePage2 = () => {
    if (validateFields(validationRules.page1)) {
      setViewPage1Form(false);
      setViewPage2Form(true);
      setViewPage3Form(false);
      setViewPage4Form(false);
    }
  };

  const handlePage3 = () => {
    if (validateFields(validationRules.page2)) {
      setViewPage1Form(false);
      setViewPage2Form(false);
      setViewPage3Form(true);
      setViewPage4Form(false);
    }
  };

  const handlePage4 = () => {
    if (validateFields(validationRules.page3)) {
      setViewPage1Form(false);
      setViewPage2Form(false);
      setViewPage3Form(false);
      setViewPage4Form(true);
    }
  };

  const handleRegister = async () => {
    if (validateFields(validationRules.page4)) {
      try {
        const fileToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]);
            reader.onerror = (error) => reject(error);
          });
        };

        const slUserDP = profileImage ? await fileToBase64(profileImage) : "";
        const slSchoolProof = formData.slSchoolProof
          ? await fileToBase64(formData.slSchoolProof)
          : "";

        const payload = {
          ...formData,
          slUserDP,
          slSchoolProof,
          slAge: age,
        };

        const response = await fetch(
          process.env.REACT_APP_MSL_USER_REGISTER_DATA_API,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const result = await response.json();
        if (result.success) {
          alert(result.message);
          handleCloseModals();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering.");
      }
    }
  };

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    const { username, password } = loginData;

    if (!username || !password) {
      setMessageResponse("Please fill in all fields.");
      alert("Please fill in all fields.");
      return;
    }

    fetch(process.env.REACT_APP_MSL_USER_LOGIN_DATA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
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
        }

        if (data.success === "Not Verified") {
          setMessageResponse(data.message);
          alert("Account not yet verified. Contact SL.");
        }

        if (data.success === "Blacklisted") {
          setMessageResponse(data.message);
          alert(
            "Your account has been blacklisted. Contact support for assistance."
          );
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
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while logging in. Please try again.");
      });
  };

  const handleCloseModals = () => {
    setShowPromptModal(false);
    setViewRegisterMSL(false);
    setViewLoginMSL(false);
  };

  const handleViewRegister = () => {
    setShowPromptModal(false);
    setViewRegisterMSL(true);
    setViewLoginMSL(false);
  };

  const handleViewLogin = () => {
    setShowPromptModal(false);
    setViewRegisterMSL(false);
    setViewLoginMSL(true);
  };

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleBirthdayChange = (e) => {
    const birthday = e.target.value;
    const calculatedAge = calculateAge(birthday);
    setAge(calculatedAge);
    setFormData((prev) => ({
      ...prev,
      slBirthday: birthday,
      slAge: calculatedAge,
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData((prev) => ({ ...prev, slUserDP: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, slUserDP: "" }));
    }
  };

  return (
    <>
      {showPromptModal && (
        <PromptModal
          handleViewLogin={handleViewLogin}
          handleViewRegister={handleViewRegister}
          handleCloseModals={handleCloseModals}
        />
      )}

      {viewLoginMSL && (
        <LoginModal
          handleCloseModals={handleCloseModals}
          handleUserLogin={handleUserLogin}
          handleLoginInputChange={handleLoginInputChange}
          loginData={loginData}
          handleViewRegister={handleViewRegister}
        />
      )}

      {viewRegisterMSL && (
        <RegistrationModal
          handleCloseModals={handleCloseModals}
          handlePage1={handlePage1}
          handlePage2={handlePage2}
          handlePage3={handlePage3}
          handlePage4={handlePage4}
          handleRegister={handleRegister}
          handleInputChange={handleInputChange}
          handleBirthdayChange={handleBirthdayChange}
          handleProfileImageChange={handleProfileImageChange}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          viewPage1Form={viewPage1Form}
          viewPage2Form={viewPage2Form}
          viewPage3Form={viewPage3Form}
          viewPage4Form={viewPage4Form}
          profileImage={profileImage}
          isMobile={isMobile}
          handleViewLogin={handleViewLogin}
          schools={sortedSchools}
          courses={sortedCourses}
          handleFileUpload={handleFileUpload}
          heroes={sortedHeroes}
        />
      )}
    </>
  );
};

export default MSLRegistrationModal;
