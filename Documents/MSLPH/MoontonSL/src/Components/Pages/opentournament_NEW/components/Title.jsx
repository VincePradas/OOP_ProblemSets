import React from "react";
import useTailwindLayout from "../hooks/useTailwindLayout";
import useIsMobile from "../hooks/useIsMobileHook";
import { MCCLogo, subLogo, MCC_HLOGO } from "../assets/index";

const TitleSection = () => {
  const isMobile = useIsMobile();
  useTailwindLayout();
  return (
    <div className={`text-center p-4 ${isMobile ? "pt-[8rem]" : "pt-20"}`}>
      <img
        src={MCCLogo}
        alt="MCC Logo"
        className={`mx-auto mb-4 w-auto ${
          isMobile ? "w-[5rem] h-[5rem]" : "w-[11rem] h-[7rem]"
        }`}
      />
      <img
        src={subLogo}
        alt="Pamantasang Lakas"
        className="mx-auto w-auto py-2"
      />
      <p className="text-white text-xs max-w-2xl mx-auto">
        MSL Collegiate Cup is the flagship Collegiate League of Moonton Student
        Leaders
        <br />
        PH under the supervision of Moonton Philippines Technologies, Inc.
      </p>
    </div>
  );
};

export default TitleSection;
