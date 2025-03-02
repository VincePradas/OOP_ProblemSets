import { useState } from "react";

const useFileHandler = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (e, setFormData) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData((prevFormData) => ({
          ...prevFormData,
          slUserDP: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return { profileImage, handleProfileImageChange };
};

export default useFileHandler;
