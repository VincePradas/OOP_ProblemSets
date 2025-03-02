import React, { useState } from "react";
import useIsMobile from "../hooks/useIsMobileHook";
import PLain_BG from "../../../assets/imgs/PLainBG.png";
import CatCaptcha from "../../CatCaptcha";
import MSLPHNewLogo from "../../../assets/imgs/MSLPHNewLogo.png";
import Natan from "../../../assets/imgs/MLSkins/NatanSkin.png";
import LandingBG01 from "../../../assets/imgs/LandingBG01.png";
import fetchUserData from "../hooks/fetchUserData";

const Button = ({ hook, text, cCLass }) => {
  return (
    <button
      type="button"
      onClick={hook}
      className={`${cCLass} px-12 py-[6px] text-xs border-2 border-white/75 text-white rounded-full hover:bg-white hover:text-black transition duration-300`}
    >
      {text}
    </button>
  );
};

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  label,
  options,
  className,
  required = false,
  name,
}) => {
  if (type === "select") {
    return (
      <div className={className}>
        <label className="block text-[11px] text-neutral-100/50">{label}</label>
        <select
          className="w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={value}
          onChange={onChange}
          required={required}
          name={name}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-black"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className={className}>
        <label className="block text-[11px] text-neutral-100/50">{label}</label>
        <input
          type="file"
          className="w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={onChange}
          required={required}
          name={name}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-[11px] text-neutral-100/50">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-[6px] border-2 border-white bg-transparent text-xs text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        required={required}
        name={name}
      />
    </div>
  );
};

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

  const [formData, setFormData] = useState({
    slAccountID: "asasdas1jasdkas",
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
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (e.target.type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear errors when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validatePage1 = () => {
    const newErrors = {};
    if (!formData.slGivenName) newErrors.slGivenName = "First Name is required";
    if (!formData.slSurname) newErrors.slSurname = "Last Name is required";
    if (!formData.slEmail) newErrors.slEmail = "Email is required";
    if (!formData.slBirthday) newErrors.slBirthday = "Birthday is required";
    if (!formData.slGender) newErrors.slGender = "Gender is required";
    if (!formData.slContactNum)
      newErrors.slContactNum = "Contact Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage2 = () => {
    const newErrors = {};
    if (!formData.slSchoolYear)
      newErrors.slSchoolYear = "Year Level is required";
    if (!formData.slSchoolName)
      newErrors.slSchoolName = "School Name is required";
    if (!formData.slSchoolID) newErrors.slSchoolID = "Student ID is required";
    if (!formData.slChapter) newErrors.slChapter = "Island is required";
    if (!formData.slRegion) newErrors.slRegion = "Region is required";
    if (!formData.slUserCourse)
      newErrors.slUserCourse = "Course or Program is required";
    if (!formData.slSchoolProof)
      newErrors.slSchoolProof = "Certificate of Enrollment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage3 = () => {
    const newErrors = {};
    if (!formData.slUserMLID) newErrors.slUserMLID = "MLBB User ID is required";
    if (!formData.slUserServer)
      newErrors.slUserServer = "MLBB Server ID is required";
    if (!formData.slUserIGN) newErrors.slUserIGN = "IGN is required";
    if (!formData.slUserRank) newErrors.slUserRank = "Rank is required";
    if (!formData.slUserRole) newErrors.slUserRole = "Role is required";
    if (!formData.slUserHero) newErrors.slUserHero = "Main Hero is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePage4 = () => {
    const newErrors = {};
    if (!formData.slUsername) newErrors.slUsername = "Username is required";
    if (!formData.slUserPassword)
      newErrors.slUserPassword = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePage1 = () => {
    if (validatePage1()) {
      setViewPage1Form(true);
      setViewPage2Form(false);
      setViewPage3Form(false);
      setViewPage4Form(false);
    }
  };

  const handlePage2 = () => {
    if (validatePage1()) {
      setViewPage1Form(false);
      setViewPage2Form(true);
      setViewPage3Form(false);
      setViewPage4Form(false);
    }
  };

  const handlePage3 = () => {
    if (validatePage2()) {
      setViewPage1Form(false);
      setViewPage2Form(false);
      setViewPage3Form(true);
      setViewPage4Form(false);
    }
  };

  const handlePage4 = () => {
    if (validatePage3()) {
      setViewPage1Form(false);
      setViewPage2Form(false);
      setViewPage3Form(false);
      setViewPage4Form(true);
    }
  };

  const handleRegister = async () => {
    if (validatePage4()) {
      try {
        // Convert the file to a base64-encoded string
        const fileToBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(",")[1]); // Remove the data URL prefix
            reader.onerror = (error) => reject(error);
          });
        };

        // Convert the profile image and school proof to base64
        const slUserDP = profileImage ? await fileToBase64(profileImage) : null;
        const slSchoolProof = formData.slSchoolProof
          ? await fileToBase64(formData.slSchoolProof)
          : null;

        // Prepare the payload
        const payload = {
          slAccountID: "asasdas1jasdkas", // Replace with dynamic value if needed
          slUserDP: "",
          slGivenName: formData.slGivenName,
          slSurname: formData.slSurname,
          slSuffix: formData.slSuffix,
          slEmail: formData.slEmail,
          slFacebook: formData.slFacebook,
          slBirthday: formData.slBirthday,
          slAge: age,
          slGender: formData.slGender,
          slContactNum: formData.slContactNum,
          slSchoolYear: formData.slSchoolYear,
          slChapter: formData.slChapter,
          slRegion: formData.slRegion,
          slSchoolName: formData.slSchoolName,
          slSchoolID: formData.slSchoolID,
          slUserCourse: formData.slUserCourse,
          slSchoolProof,
          slUserIGN: formData.slUserIGN,
          slUserMLID: formData.slUserMLID,
          slUserServer: formData.slUserServer,
          slUserSquad1: formData.slUserSquad1,
          slUserSquad2: formData.slUserSquad2,
          slUserRank: formData.slUserRank,
          slUserRole: formData.slUserRole,
          slUserHero: formData.slUserHero,
          slUsername: formData.slUsername,
          slUserPassword: formData.slUserPassword,
          slUserState: "New", // Default value
          slUserAdmin: "", // Default value
        };

        // Send the payload to the backend
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
    setFormData({ ...formData, slBirthday: birthday, slAge: calculatedAge });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData({ ...formData, slUserDP: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="rounded-lg bg-black shadow-lg relative max-w-md w-full mx-4 h-[500px] border-2 border-white/15"
            style={{
              backgroundImage: `url(${PLain_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              Height: "100vh",
              width: "100vw",
            }}
          >
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-xl text-white mb-4">
                  Hey, warrior! It looks like you aren't logged in yet.
                </h2>
                <p className="text-white/50 mb-6 text-sm">
                  Please log in or create an account to continue.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button
                  hook={handleViewLogin}
                  text="Login"
                  cCLass="px-6 py-[5px] w-[150px]"
                />
                <Button
                  hook={handleViewRegister}
                  text="Sign Up"
                  cCLass="px-6 py-[5px] w-[150px]"
                />
              </div>
              <p className="text-center text-xs py-3 text-white">
                By continuing, you agree to our{" "}
                <a
                  href="/TermsAndConditions"
                  className="text-yellow-500 underline"
                >
                  Terms and Conditions
                </a>
              </p>
            </div>
            <button
              onClick={handleCloseModals}
              className="absolute top-4 right-4 text-white hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="absolute bottom-0 left-0">
              <img src={Natan} alt="Natan Skin" className="block" />
            </div>
          </div>
        </div>
      )}

      {viewLoginMSL && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="rounded-lg shadow-lg relative max-w-md w-full mx-4 h-[500px] border-2 border-white/15"
            style={{
              backgroundImage: `url(${LandingBG01})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              Height: "100vh",
            }}
          >
            <button
              onClick={handleCloseModals}
              className="absolute top-4 right-4 text-white hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-8">
              <div className="flex items-center justify-center mb-2">
                <div className="flex flex-col justify-center items-left">
                  <h2 className="text-2xl text-white mb-4 font-poppins font-semibold">
                    LOGIN MSL ACCOUNT
                  </h2>
                  <div>
                    <img
                      src={MSLPHNewLogo}
                      alt="new msl logo"
                      className="w-auto h-[55px]"
                    />
                  </div>
                </div>
              </div>
              <form className="space-y-6">
                <Input
                  type="text"
                  label="Username"
                  placeholder="ex. Crisostomo"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginInputChange}
                  required
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="********"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  required
                />
                <div className="flex items-center justify-center">
                  <Button hook={handleUserLogin} text="LOGIN" />
                </div>
              </form>
              <div className="my-5">
                <p className="text-center text-yellow-500/50 text-xs">
                  Forgot Password
                </p>
              </div>
              <div className="py-5 relative top-10">
                <p className="text-white/50 text-center text-xs">
                  Don't have an account yet?{" "}
                  <p
                    onClick={handleViewRegister}
                    className="text-yellow-500 hover:cursor-pointer text-xs"
                  >
                    Sign up
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {viewRegisterMSL && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-black rounded-lg shadow-lg relative max-w-4xl w-full mx-4 border-2 border-white/15 flex flex-col md:flex-row"
            style={{
              backgroundImage: `url(${LandingBG01})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              Height: "100vh",
              width: "100vw",
            }}
          >
            {/* Profile Picture Frame */}
            <div className="hidden md:flex flex-col items-center justify-center w-1/3 p-8 border-r border-white/15">
              <div className="relative w-32 h-32 border-2 border-white/25 rounded-full flex items-center justify-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
              </div>
              <Input
                type="file"
                label="Upload Photo"
                onChange={handleProfileImageChange}
                className="mt-4"
                required
              />
            </div>

            {/* Registration Form */}
            <div className="w-full md:w-2/3 p-8">
              <button
                onClick={handleCloseModals}
                className="absolute top-4 right-4 text-white hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="flex flex-col items-center justify-center mb-2">
                <h2 className="text-xl text-white mb-4">CREATE MSL ACCOUNT</h2>
                <div>
                  <img
                    src={MSLPHNewLogo}
                    alt="new msl logo"
                    className="w-auto h-[55px]"
                  />
                </div>
              </div>

              {/* Page 1: Basic Details */}
              {viewPage1Form && (
                <form className="space-y-4">
                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-2" : "grid-cols-3"
                    } gap-4`}
                  >
                    <Input
                      type="text"
                      label="First Name"
                      placeholder="ex. Vince Warren"
                      name="slGivenName"
                      value={formData.slGivenName}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slGivenName && (
                      <p className="text-red-500 text-xs">
                        {errors.slGivenName}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Last Name"
                      placeholder="ex. Pradas"
                      name="slSurname"
                      value={formData.slSurname}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slSurname && (
                      <p className="text-red-500 text-xs">{errors.slSurname}</p>
                    )}
                    <Input
                      type="text"
                      label="Suffix (Optional)"
                      placeholder="ex. Jr."
                      name="slSuffix"
                      value={formData.slSuffix}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="email"
                      label="Email"
                      placeholder="ex. crisibarra@email.com"
                      name="slEmail"
                      value={formData.slEmail}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slEmail && (
                      <p className="text-red-500 text-xs">{errors.slEmail}</p>
                    )}
                    <Input
                      type="date"
                      label="Birthday"
                      name="slBirthday"
                      onChange={handleBirthdayChange}
                      required
                    />
                    {errors.slBirthday && (
                      <p className="text-red-500 text-xs">
                        {errors.slBirthday}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Age"
                      value={age ? age : "-"}
                      readOnly
                    />
                    <Input
                      type="select"
                      label="Gender"
                      name="slGender"
                      value={formData.slGender}
                      onChange={handleInputChange}
                      options={[
                        { value: "", label: "Select Gender" },
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                        { value: "Other", label: "Prefer not to say" },
                      ]}
                      required
                    />
                    {errors.slGender && (
                      <p className="text-red-500 text-xs">{errors.slGender}</p>
                    )}
                    <Input
                      type="text"
                      label="Contact Number"
                      placeholder="ex. 09** **** ***"
                      name="slContactNum"
                      value={formData.slContactNum}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slContactNum && (
                      <p className="text-red-500 text-xs">
                        {errors.slContactNum}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Facebook Link"
                      placeholder="ex. https://facebook.com/vince6910"
                      name="slFacebook"
                      value={formData.slFacebook}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button hook={handlePage2} text="Next" />
                  </div>
                </form>
              )}

              {/* Page 2: School Details */}
              {viewPage2Form && (
                <form className="space-y-4">
                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-2" : "grid-cols-3"
                    } gap-4`}
                  >
                    <Input
                      type="select"
                      label="Year Level"
                      name="slSchoolYear"
                      value={formData.slSchoolYear}
                      onChange={handleInputChange}
                      options={[
                        { value: "", label: "Select Year Level" },
                        { value: "Grade 11", label: "Grade 11" },
                        { value: "Grade 12", label: "Grade 12" },
                        { value: "Freshmen", label: "Freshmen" },
                        { value: "Sophomore", label: "Sophomore" },
                        { value: "Junior", label: "Junior" },
                        { value: "Senior", label: "Senior" },
                        { value: "Alumni", label: "Alumni" },
                        { value: "Masters", label: "Masters" },
                        { value: "Doctorate", label: "Doctorate" },
                      ]}
                      required
                    />
                    {errors.slSchoolYear && (
                      <p className="text-red-500 text-xs">
                        {errors.slSchoolYear}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Search for your School"
                      placeholder="Search for your School"
                      name="slSchoolName"
                      value={formData.slSchoolName}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slSchoolName && (
                      <p className="text-red-500 text-xs">
                        {errors.slSchoolName}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Student ID"
                      placeholder="ex. 123456"
                      name="slSchoolID"
                      value={formData.slSchoolID}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slSchoolID && (
                      <p className="text-red-500 text-xs">
                        {errors.slSchoolID}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Island"
                      placeholder="Search for your School"
                      name="slChapter"
                      value={formData.slChapter}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slChapter && (
                      <p className="text-red-500 text-xs">{errors.slChapter}</p>
                    )}
                    <Input
                      type="text"
                      label="Region"
                      placeholder="Search for your School"
                      name="slRegion"
                      value={formData.slRegion}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slRegion && (
                      <p className="text-red-500 text-xs">{errors.slRegion}</p>
                    )}
                    <Input
                      type="text"
                      label="Course or Program"
                      placeholder="Search for your School"
                      name="slUserCourse"
                      value={formData.slUserCourse}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slUserCourse && (
                      <p className="text-red-500 text-xs">
                        {errors.slUserCourse}
                      </p>
                    )}
                    <Input
                      type="file"
                      label="Cert. of Enrollment"
                      name="slSchoolProof"
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slSchoolProof && (
                      <p className="text-red-500 text-xs">
                        {errors.slSchoolProof}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Button hook={handlePage1} text="Prev" />
                    <Button hook={handlePage3} text="Next" />
                  </div>
                </form>
              )}

              {/* Page 3: MLBB Details */}
              {viewPage3Form && (
                <form className="space-y-4">
                  <div
                    className={`grid ${
                      isMobile ? "grid-cols-2" : "grid-cols-3"
                    } gap-4`}
                  >
                    <Input
                      type="text"
                      label="MLBB User ID"
                      placeholder="ex. 123456789"
                      name="slUserMLID"
                      value={formData.slUserMLID}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slUserMLID && (
                      <p className="text-red-500 text-xs">
                        {errors.slUserMLID}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="MLBB Server ID"
                      placeholder="ex. 1234"
                      name="slUserServer"
                      value={formData.slUserServer}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slUserServer && (
                      <p className="text-red-500 text-xs">
                        {errors.slUserServer}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="IGN"
                      placeholder="-"
                      name="slUserIGN"
                      value={formData.slUserIGN}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slUserIGN && (
                      <p className="text-red-500 text-xs">{errors.slUserIGN}</p>
                    )}
                    <Input
                      type="text"
                      label="Squad Name (Optional)"
                      placeholder="ex. MSL ESports"
                      name="slUserSquad1"
                      value={formData.slUserSquad1}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="text"
                      label="Squad Abrev.(Optional)"
                      placeholder="ex. MSLE"
                      name="slUserSquad2"
                      value={formData.slUserSquad2}
                      onChange={handleInputChange}
                    />
                    <Input
                      type="select"
                      label="Current rank"
                      name="slUserRank"
                      value={formData.slUserRank}
                      onChange={handleInputChange}
                      options={[
                        { value: "", label: "Select Ranking" },
                        {
                          value: "Mythical Immortal",
                          label: "Mythical Immortal",
                        },
                        { value: "Mythical Glory", label: "Mythical Glory" },
                        { value: "Mythical Honor", label: "Mythical Honor" },
                        { value: "Mythic", label: "Mythic" },
                        { value: "Legend", label: "Legend" },
                        { value: "Epic", label: "Epic" },
                        { value: "Grand Master", label: "Grand Master" },
                        { value: "Master", label: "Master" },
                        { value: "Elite", label: "Elite" },
                        { value: "Warrior", label: "Warrior" },
                      ]}
                      required
                    />
                    {errors.slUserRank && (
                      <p className="text-red-500 text-xs">
                        {errors.slUserRank}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="In-Game Role"
                      placeholder="ex. Jungler"
                      name="slUserRole"
                      value={formData.slUserRole}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slUserRole && (
                      <p className="text-red-500 text-xs">
                        {errors.slUserRole}
                      </p>
                    )}
                    <Input
                      type="text"
                      label="Main Hero"
                      placeholder="ex. Franco"
                      name="slUserHero"
                      value={formData.slUserHero}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.slUserHero && (
                      <p className="text-red-500 text-xs">
                        {errors.slUserHero}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Button hook={handlePage2} text="Prev" />
                    <Button hook={handlePage4} text="Next" />
                  </div>
                </form>
              )}

              {/* Page 4: Account Creation */}
              {viewPage4Form && (
                <form className="space-y-6">
                  <Input
                    type="text"
                    label="Username"
                    placeholder="ex. Crisostomo"
                    name="slUsername"
                    value={formData.slUsername}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.slUsername && (
                    <p className="text-red-500 text-xs">{errors.slUsername}</p>
                  )}
                  <Input
                    type="password"
                    label="Password"
                    placeholder="********"
                    name="slUserPassword"
                    value={formData.slUserPassword}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.slUserPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.slUserPassword}
                    </p>
                  )}
                  <div className="flex justify-between">
                    <Button hook={handlePage3} text="Prev" />
                    <Button hook={handleRegister} text="Submit" />
                  </div>
                </form>
              )}

              <div className="mt-4 text-center">
                <p className="text-white/50 text-xs">
                  Already have an account?{" "}
                  <p
                    onClick={handleViewLogin}
                    className="text-xs text-yellow-500 hover:cursor-pointer"
                  >
                    Sign in
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MSLRegistrationModal;
