// src/hooks/useAgeCalculator.js
import { useState } from 'react';

const useAgeCalculator = () => {
  const [age, setAge] = useState("");

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleBirthdayChange = (e, setFormData) => {
    const birthday = e.target.value;
    const calculatedAge = calculateAge(birthday);
    setAge(calculatedAge);
    setFormData((prevFormData) => ({
      ...prevFormData,
      slBirthday: birthday,
      slAge: calculatedAge,
    }));
  };

  return { age, handleBirthdayChange };
};

export default useAgeCalculator;