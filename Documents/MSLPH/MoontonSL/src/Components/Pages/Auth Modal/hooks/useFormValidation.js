const useFormValidation = () => {
  const validatePage1 = (formData) => {
    const newErrors = {};
    if (!formData.slGivenName) newErrors.slGivenName = "First Name is required";
    if (!formData.slSurname) newErrors.slSurname = "Last Name is required";
    if (!formData.slEmail) newErrors.slEmail = "Email is required";
    if (!formData.slBirthday) newErrors.slBirthday = "Birthday is required";
    if (!formData.slGender) newErrors.slGender = "Gender is required";
    if (!formData.slContactNum)
      newErrors.slContactNum = "Contact Number is required";
    return newErrors;
  };

  const validatePage2 = (formData) => {
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
    return newErrors;
  };

  const validatePage3 = (formData) => {
    const newErrors = {};
    if (!formData.slUserMLID) newErrors.slUserMLID = "MLBB User ID is required";
    if (!formData.slUserServer)
      newErrors.slUserServer = "MLBB Server ID is required";
    if (!formData.slUserIGN) newErrors.slUserIGN = "IGN is required";
    if (!formData.slUserRank) newErrors.slUserRank = "Rank is required";
    if (!formData.slUserRole) newErrors.slUserRole = "Role is required";
    if (!formData.slUserHero) newErrors.slUserHero = "Main Hero is required";
    return newErrors;
  };

  const validatePage4 = (formData) => {
    const newErrors = {};
    if (!formData.slUsername) newErrors.slUsername = "Username is required";
    if (!formData.slUserPassword)
      newErrors.slUserPassword = "Password is required";
    return newErrors;
  };

  return { validatePage1, validatePage2, validatePage3, validatePage4 };
};

export default useFormValidation;
