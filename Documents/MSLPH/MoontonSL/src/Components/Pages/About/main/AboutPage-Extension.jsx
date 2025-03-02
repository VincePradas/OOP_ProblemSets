import React from "react";
import Background from "../../../assets/imgs/LandingBG.png";
import { MSLLogo, MPLBattleTrip2k2301 } from "../assets/index";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../css/about.css";

const useTailwindLayout = () => {
  useEffect(() => {
    const body = document.querySelector(".About");
    body?.classList.add("tailwind-layout");
    return () => {
      body?.classList.remove("tailwind-layout");
    };
  }, []);
};

const AboutPage_Extension = () => {
  useTailwindLayout();
  return (
    <div className="About min-h-screen bg-black text-white p-8 cursor-default">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${Background})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        <section className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8 pt-[10rem] mx-[16px] mb-4">
            <div className="bg-black/40 backdrop-blur-[2px] rounded-lg p-8 h-fit border-2 border-white/55">
              <h4 className="text-4xl font-bold font-poppins py-2">
                ABOUT MSL PHILIPPINES
              </h4>
              <p className="text-sm">
                Welcome to Moonton Student Leaders Philippines, a vibrant and
                dedicated community for student gamers passionate about Mobile
                Legends: Bang Bang. Officially established in October 2020, we
                are committed to promoting and supporting the gaming community
                across various schools in the Philippines. As of September 2024,
                the organization has a total of 81 communities in different
                universities across the country. These schools are the exclusive
                and major target audience for every event held not just by The
                Moonton Student Leaders PH but also by Moonton Philippines
                Technologies, Inc. The official office of Moonton Student
                Leaders Philippines is located at 23rd Floor, The Curve,
                Bonifacio Global City, Taguig, Philippines. Our partnerships
                span across Luzon, Visayas, and Mindanao, making a wide-reaching
                impact within the country. Unlike other gaming communities, MSL
                Philippines solely focuses on Mobile Legends: Bang Bang (MLBB)
                gamers prioritizing their gaming, leadership, and academic
                success. We believe that students can excel in their studies
                while pursuing their passion for gaming and at the same time,
                enhancing their leadership skills. With this approach, we help
                students achieve a well-rounded development. Join us at MSL
                Philippines and become part of our growing community where your
                passion for gaming and commitment to academics are both valued
                and supported. We are open to all MLBB School Communities across
                the Philippines.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="relative h-auto border-2 border-white/55 rounded-lg overflow-hidden">
                <img
                  src={MPLBattleTrip2k2301}
                  alt="MSL Event"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
              <div className="relative h-auto  rounded-lg overflow-hidden">
                <img
                  src={MSLLogo}
                  alt="MSL Logo"
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <Link
                  to="/"
                  className="px-8 py-2 w-[250px] rounded-full border-2 border-white/50 hover:bg-white text-white hover:text-black transition-all duration-300"
                >
                  Join Our Community
                </Link>
                <Link
                  to="/About"
                  className="px-8 py-2 w-[250px] rounded-full border-2 border-white/50 hover:bg-white text-white hover:text-black transition-all duration-300"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage_Extension;
