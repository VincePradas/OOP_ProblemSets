import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import LandingBG01 from "../../../assets/imgs/LandingBG01.png";
import MSLPHNewLogo from "../../../assets/imgs/MSLPHNewLogo.png";
import useFileHandler from "../hooks/useFileHandler";
import useAgeCalculator from "../hooks/useAgeCalculator";
import useFormValidation from "../hooks/useFormValidation";
import axios from "axios";

const RegistrationModal = ({
  handleCloseModals,
  handlePage1,
  handlePage2,
  handlePage3,
  handlePage4,
  handleRegister,
  handleInputChange,
  viewPage1Form,
  viewPage2Form,
  viewPage3Form,
  viewPage4Form,
  isMobile,
  handleViewLogin,
  formData,
  setFormData,
  schools,
  courses,
  heroes,
}) => {
  const { profileImage, handleProfileImageChange } = useFileHandler();
  const { age, handleBirthdayChange } = useAgeCalculator();
  const { validatePage1, validatePage2, validatePage3, validatePage4 } =
    useFormValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIGNData = async (userID, zoneID) => {
    setIsLoading(true);
    setError(null);

    const formFetchIGN = {
      userID: userID,
      zoneID: zoneID,
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_MSL_USER_MLBB_IGN_API,
        formFetchIGN,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("No data received from server");
      }

      const updatedIGNFetched = response.data.confirmationFields.username;

      setFormData((prevData) => ({
        ...prevData,
        slUserIGN: decodeURIComponent(updatedIGNFetched),
      }));

      const formUpdateIGN = {
        userID: userID,
        userIGN: updatedIGNFetched,
      };

      const updateResponse = await axios.post(
        process.env.REACT_APP_MSL_USER_UPDATE_IGN_API,
        formUpdateIGN,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (updateResponse.data.success === false) {
        throw new Error(updateResponse.data.message);
      }

      console.log(updateResponse.data.message);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching or updating IGN:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formData.slUserMLID && formData.slUserServer) {
      fetchIGNData(formData.slUserMLID, formData.slUserServer);
    }
  }, [formData.slUserMLID, formData.slUserServer]);

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="rounded-lg shadow-lg relative max-w-md w-full mx-4 h-[500px] border-2 border-white/15"
        style={{
          backgroundImage: `url(${LandingBG01})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflowY: "auto",
        }}
      >
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

        <div className="w-full md:w-2/3 p-8">
          <button
            onClick={handleCloseModals}
            className="absolute top-4 right-4 text-white hover:text-gray-700"
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="ex. Pradas"
                  name="slSurname"
                  value={formData.slSurname}
                  onChange={handleInputChange}
                  required
                />
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
                <Input
                  type="date"
                  label="Birthday"
                  name="slBirthday"
                  onChange={(e) => handleBirthdayChange(e, setFormData)}
                  required
                />
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
                <Input
                  type="text"
                  label="Contact Number"
                  placeholder="ex. 09** **** ***"
                  name="slContactNum"
                  value={formData.slContactNum}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  label="Facebook Link"
                  placeholder="ex. https://facebook.com/vince6910"
                  name="slFacebook"
                  value={formData.slFacebook}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <Button hook={handlePage2} text="Next" />
              </div>
            </form>
          )}

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
                <Input
                  type="searchable-select"
                  label="School Name"
                  name="slSchoolName"
                  value={formData.slSchoolName}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Select School" },
                    ...schools.map((school) => ({
                      value: school.name,
                      label: school.name,
                    })),
                  ]}
                  required
                />
                <Input
                  type="text"
                  label="Student ID"
                  placeholder="ex. 123456"
                  name="slSchoolID"
                  value={formData.slSchoolID}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  label="Island"
                  placeholder="Search for your School"
                  name="slChapter"
                  value={formData.slChapter}
                  onChange={handleInputChange}
                  required
                  disabled
                />
                <Input
                  type="text"
                  label="Region"
                  placeholder="Search for your School"
                  name="slRegion"
                  value={formData.slRegion}
                  onChange={handleInputChange}
                  required
                  disabled
                />
                <Input
                  type="searchable-select"
                  label="Course or Program"
                  name="slUserCourse"
                  value={formData.slUserCourse}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Select Course" },
                    ...courses.map((course) => ({
                      value: course.program,
                      label: course.program,
                    })),
                  ]}
                  required
                />
                <Input
                  type="file"
                  label="Cert. of Enrollment"
                  name="slSchoolProof"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <Button hook={handlePage1} text="Prev" />
                <Button hook={handlePage3} text="Next" />
              </div>
            </form>
          )}

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
                <Input
                  type="text"
                  label="MLBB Server ID"
                  placeholder="ex. 1234"
                  name="slUserServer"
                  value={formData.slUserServer}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  label="IGN"
                  placeholder="-"
                  name="slUserIGN"
                  value={formData.slUserIGN}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
                {isLoading && (
                  <p className="text-white/50 text-xs">Fetching IGN...</p>
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
                    { value: "Mythical Immortal", label: "Mythical Immortal" },
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
                <Input
                  type="select"
                  label="In-Game Role"
                  name="slUserRole"
                  value={formData.slUserRole}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "Select Role" },
                    { value: "Jungler", label: "Jungler" },
                    { value: "Exp Laner", label: "Exp Laner" },
                    { value: "Gold Laner", label: "Gold Laner" },
                    { value: "Mid Laner", label: "Mid Laner" },
                    { value: "Roamer", label: "Roamer" },
                  ]}
                  required
                />
                <Input
                  type="searchable-select"
                  label="Main Hero"
                  name="slUserHero"
                  value={formData.slUserHero}
                  onChange={handleInputChange}
                  options={[{ value: "", label: "Select Hero" }, ...heroes]}
                  required
                />
              </div>
              <div className="flex justify-between">
                <Button hook={handlePage2} text="Prev" />
                <Button hook={handlePage4} text="Next" />
              </div>
            </form>
          )}

          {viewPage4Form && (
            <div className="flex justify-center items-center">
              <form className="space-y-6 w-full max-w-md">
                <div className="flex flex-col space-y-4 items-center">
                  <Input
                    type="text"
                    label="Create Username"
                    placeholder="ex. Crisostomo"
                    name="slUsername"
                    value={formData.slUsername}
                    onChange={handleInputChange}
                    required
                    className={`${isMobile ? "w-full" : "w-full"}`}
                  />
                  <Input
                    type="password"
                    label="Create Password"
                    placeholder="********"
                    name="slUserPassword"
                    value={formData.slUserPassword}
                    onChange={handleInputChange}
                    required
                    className={`${isMobile ? "w-full" : "w-full"}`}
                  />
                </div>

                <div className="flex justify-center space-x-4">
                  <Button hook={handlePage3} text="Prev" />
                  <Button hook={handleRegister} text="Submit" />
                </div>
              </form>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-white/50 text-xs">
              Already have an account?{" "}
              <span
                onClick={handleViewLogin}
                className="text-xs text-yellow-500 hover:cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
