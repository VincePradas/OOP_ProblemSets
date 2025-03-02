//MARK: IMPORTS
import React, { useState, useEffect } from "react";
import PlainBG from "../../../assets/imgs/PLainBG.png";

//MARK: CUSTOM HOOKS
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

//MARK: DEPARTMENT CARDS
const DepartmentCard = ({ title, description }) => {
  const isMobile = useIsMobile();
  return (
    <div
      className="h-auto p-4 md:p-8 bg-cover bg-center text-white relative overflow-x-hidden rounded-lg border-2 border-white border-opacity-25"
      style={{
        backgroundImage: `url(${PlainBG})`,
        opacity: 1,
      }}
    >
      <h3
        className={`${
          isMobile ? "text-[24px]" : "text-[32px]"
        } font-bold font-poppins text-white mb-4`}
      >
        {title}
      </h3>
      <p className={`${isMobile ? "text-base" : "text-[18px]"}`}>
        {description}
      </p>
    </div>
  );
};

export default DepartmentCard;
