import React, { useState, useEffect } from "react";
import { Logo, Overlay, arrow, MSLLogo, MSLLogo_Mobile } from "./assets/index";
import Background from "../../assets/imgs/LandingBG.png";
import Background2 from "../../assets/imgs/LandingBG02.png";
import PlainBG from "../../assets/imgs/PLainBG.png";
import ScratchUP from "../../assets/imgs/Scratch04.png";
import DiggieSkin from "../../assets/imgs/MLSkins/DiggieSkin.png";
import Esmeralda from "../../assets/imgs/MLSkins/EsmeraldaSkin.png";
import Silvana from "../../assets/imgs/MLSkins/SilvanaSkin.png";
import ScratchDOWN from "../../assets/imgs/Scratch03.png";
import SunLogo from "../../assets/imgs/SunLogo.png";
import { Link } from "react-router-dom";
import "./about.css";

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

const useTailwindLayout = () => {
  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.add("tailwind-layout");
    return () => {
      body?.classList.remove("tailwind-layout");
    };
  }, []);
};

const LandingPage = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`h-screen bg-cover bg-center bg-black text-white relative pt-[100px] md:pt-[200px] overflow-hidden ${
        isMobile ? "block" : "hidden"
      }`}
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Overlay})`,
          backgroundSize: "cover",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100" />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <img
          src={SunLogo}
          alt="Sun Logo"
          className="absolute w-auto h-[200px] opacity-30 object-contain"
          style={{ zIndex: 10 }}
        />

        <div className="relative z-20 text-center mt-[4rem] flex flex-col items-center">
          <h1 className="font-poetsen text-[36px] mb-4">MSL PHILIPPINES</h1>
          <button
            className="mt-3 border-2 border-white rounded-full px-8 py-[3px] backdrop-blur-sm hover:bg-white hover:text-black transition"
            onClick={() => {
              const nextSection = document.getElementById("firstSection");
              if (nextSection) {
                nextSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            Learn More
          </button>
        </div>
      </div>
      <div className="absolute bottom-[80px] left-[47%] transform -translate-x-1/2 z-30 animate-floating justify-center flex items-center">
        <img src={arrow} alt="down arrow" className="w-auto h-4" />
      </div>

      <div className="absolute bottom-0 w-full">
        <img
          src={ScratchUP}
          alt="BlenderImage"
          className="w-full h-auto object-contain animate-slideInUp"
        />
      </div>
    </div>
  );
};

const Main = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`h-auto bg-cover bg-center text-white relative ${
        isMobile ? "pt-[50px]" : "pt-[100px]"
      } md:pt-[200px] overflow-x-hidden overflow-hidden scroll-m-0`}
      style={{
        backgroundImage: `url(${Background})`,
        backgroundBlendMode: "overlay",
      }}
    >
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${Overlay})`,
            backgroundSize: "cover",
            opacity: 0.25,
            pointerEvents: "none",
          }}
        />
      )}
      {isMobile ? (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent opacity-100" />
      ) : (
        ""
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100" />
      <div
        className={`${
          isMobile ? "px-4" : "px-[150px] relative z-10 h-auto  p-5"
        }`}
      >
        <div
          className={`flex justify-between align-middle items-center gap-16`}
        >
          <div
            className={`${
              isMobile
                ? "w-full border-2 border-white p-3 rounded-lg mb-5 border-opacity-25"
                : "w-[60%] h-auto"
            } animate-slideInLeft transition-all duration-1000 ease-out`}
          >
            {isMobile ? (
              <img
                src={MSLLogo_Mobile}
                alt="MSL Logo"
                className="h-[90px] w-auto"
              />
            ) : (
              <h1 className="text-[64px]">
                <span className="font-poetsen inline-block relative">
                  <div className="absolute left-0 right-0 top-0 w-full h-1 bg-[#F2C21A] rounded-full"></div>
                  MSL
                </span>{" "}
                Philippines
              </h1>
            )}

            <div className="space-y-4 mt-2 ">
              <p
                className={`${
                  isMobile ? "text-base" : "text-[18px]"
                } text-white`}
              >
                Welcome to Moonton Student Leaders Philippines, a vibrant and
                dedicated community for student gamers passionate about Mobile
                Legends: Bang Bang. Officially established in October 2020, we
                are committed to promoting and supporting the gaming community
                across various schools in the Philippines.
              </p>
              <p
                className={`${
                  isMobile ? "text-base" : "text-[18px]"
                } text-white`}
              >
                As of September 2024, the organization has a total of 81
                communities in different universities across the country. These
                schools are the exclusive and major target audience for every
                event held not just by The Moonton Student...
              </p>
              <div className="py-4 mt-2">
                <Link
                  to="/about/details"
                  className={`inline-block rounded-full border-2 border-white/50 text-center px-8 py-[4px] hover:backdrop-blur-sm hover:bg-white hover:text-black transition ${
                    isMobile ? "text-base" : "text-[16px]"
                  }`}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>

          <div
            className={`${
              isMobile ? "hidden" : "block"
            } animate-slideInRight transition-all duration-1000 ease-out`}
          >
            <img
              src={Logo}
              alt="MSL Philippines Community"
              className="w-auto h-[450px] object-contain"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full z-[99]">
        <img
          src={ScratchUP}
          alt="BlenderImage"
          className="w-full h-auto object-contain animate-slideInUp z-[99]"
        />
      </div>
    </div>
  );
};

const MissionVision = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className="h-auto py-8 md:py-10 bg-cover bg-center text-white relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${PlainBG})`,
        opacity: 0.9,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/2 to-transparent opacity-75 z-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent opacity-70 z-[-1]" />

      <div className="flex justify-center items-center h-full">
        <div
          className={`${
            isMobile ? "px-4" : "px-[150px]"
          } space-y-8 md:space-y-16`}
        >
          <div>
            <h2
              className={`font-bold mb-4 md:mb-6 ${
                isMobile ? "text-[35px]" : "text-[64px]"
              } `}
            >
              Our Mission
            </h2>
            <p className={`${isMobile ? "text-base" : "text-[22px]"} `}>
              To empower and unite student leaders across the Philippines
              through the power of gaming. We strive to create a safe and
              inclusive community where students can develop their leadership
              skills, collaborate with one another, and inspire positive change
              in their schools and communities.
            </p>
          </div>

          <div>
            <h2
              className={`font-bold mb-4 md:mb-6 ${
                isMobile ? "text-[35px]" : "text-[64px]"
              } `}
            >
              Our Vision
            </h2>
            <p className={`${isMobile ? "text-base" : "text-[22px]"} `}>
              Creating positive change among young leaders and esports gamers in
              the Philippines through mobile gaming. We advocate a future where
              students from all walks of life can come together to share their
              passions, build their skills, and create meaningful impact in
              their communities. We strive to be a catalyst for change,
              leveraging the power of gaming to connect people and inspire them
              to take action on issues that matter, from social responsibilities
              to leadership. Through collective effort, we aim to cultivate a
              generation of socially responsible and compassionate leaders and
              gamers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Responsibilities = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className="h-auto bg-cover bg-center text-white relative overflow-x-hidden"
      style={{
        backgroundImage: isMobile ? "none" : `url(${Background2})`,
        backgroundColor: isMobile ? "black" : "transparent",
        opacity: 0.99,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent opacity-70 z-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-[-1]" />
      <div className="w-full">
        <img
          src={ScratchDOWN}
          alt="Scratch Top"
          className="w-full object-cover"
        />
      </div>

      <div className={`py-8 z-10 ${isMobile ? "" : "px-[150px]"} mt-10`}>
        <div className="space-y-4 md:space-y-6 px-4 md:px-[150px]">
          <h1
            className={`${
              isMobile ? "text-[32px]" : "text-[64px]"
            } font-poetsen w-full text-white`}
          >
            WHAT ARE THE RESPONSIBILITIES OF AN MSL?
          </h1>
          <p
            className={`font-poppins font-bold text-white ${
              isMobile ? "text-[18px]" : "text-[24px] font-bold"
            }`}
          >
            Moonton Student Leaders (MSLs) play a crucial role in our community.
            They are responsible for:
          </p>
          <p
            className={`font-poppins text-white ${
              isMobile ? "text-base" : "text-[20px]"
            }`}
          >
            Organizing events and tournaments.
            <br />
            Promoting Mobile Legends: Bang Bang.
            <br />
            Supporting the gaming community in their schools.
            <br />
            Acting as ambassadors for Moonton and the Mobile Legends game.
          </p>
        </div>
      </div>
      {!isMobile && (
        <div>
          <div className="w-full">
            <img
              src={ScratchUP}
              alt="Scratch Bottom"
              className="w-full object-cover"
            />
          </div>
          <div className="absolute z-[-1] right-[6rem] bottom-[8rem]">
            <img
              src={DiggieSkin}
              alt="Diggie Skin"
              className="max-w-lg mx-auto w-auto h-[345px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

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

const Departments = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`bg-black h-auto text-white py-4 ${isMobile ? "mb-5" : ""}`}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2
          className={`${
            isMobile ? "text-[32px]" : "text-[64px]"
          } font-bold mb-2`}
        >
          DEPARTMENTS
        </h2>
        <p className={`${isMobile ? "text-base" : "text-[18px]"} opacity-80`}>
          The Backbone of Our Operations
        </p>
      </div>
      <div className="mx-4 md:mx-10 px-4 border-2 border-white border-opacity-25 rounded-lg py-4">
        <div
          className={`${
            isMobile ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-8"
          }`}
        >
          <DepartmentCard
            title="General Affairs Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines General Affairs Department (GA)
                </span>{" "}
                is in charge of keeping the equilibrium between each branch of
                the organization. While eyeing that every department meets its
                goals and functions properly, GA keeps track that rewards and
                key performance indicators (KPIs) are liquidated properly. They
                also ensure that programs such as the Student Leader School
                Events Partnership Program (SL SEPP), SL Application, and many
                more, are implemented appropriately. As a balance keeper, GA
                strives that fairness remains at large within the organization.
              </>
            }
          />
          <DepartmentCard
            title="Campus Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines Campus Department (CaD)
                </span>{" "}
                is in charge of keeping the constancy of affairs with the
                partnered schools/esports organizations. Herewith, they are
                responsible for the existence of tournaments and other
                activities that provide avenues to cultivate students'
                engagements to the highest level. CaD also assesses and
                implements necessary changes for the betterment of the campuses
                affiliated with while anchoring all in terms of rules, core
                values and structure of the CaD. While taking up the
                responsibility to strengthen student's competitiveness by
                engaging in online and offline campus tournaments, CaD strives
                also to see that activities administered initiate relations that
                benefit both students and the MSL community.
              </>
            }
          />
          <DepartmentCard
            title="Contents and Social Media Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines Contents and Social Media Department (CSMD)
                </span>{" "}
                is in charge of keeping the organization visible at all times.
                They produce, they write, and they oversee the content creation
                of the organization. They are also responsible for maintaining
                the consistency of the branding of MSL Philippines. Through
                effective management of the social media platforms the
                organization is in possession with, and through providing
                quality, entertaining, and informative contents, CSMD strives to
                create an interactive, optimized, and well-managed avenue for
                everyone to hone camaraderie and healthy engagements.
              </>
            }
          />
          <DepartmentCard
            title="Partnership Department"
            description={
              <>
                The{" "}
                <span className="font-poetsen">
                  MSL Philippines Partnerships Department (PaD)
                </span>{" "}
                is in charge of keeping the steadiness of the internal and
                external functionalities of the organization. They supervise
                whereabouts such as MSL-SP Promotions (giveaways, etc.), MSL
                Philippines website database management, Student Leaders
                applicant screening and selection, and funding and allocation of
                budget. Moreover, they are the bridge in a collaborative
                atmosphere between the departments of MSL Philippines while
                ensuring also that alliances and partnerships with benefactors
                external to the organization are maintained accurately. In
                pursuit of equipoise, PaD strives to maintain sturdy connections
                and outstanding collaborations inside and outside of MSL.
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

const Bottom = () => {
  const isMobile = useIsMobile();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative h-auto">
      {!isMobile && (
        <div className="flex justify-between relative z-0 pb-10 overflow-hidden">
          <div className="w-1/2">
            <img
              src={Esmeralda}
              alt="Esmeralda Skin"
              className="w-auto h-[30rem] transform translate-x-[-120px] translate-y-5 scale-110"
            />
          </div>
          <div className="w-1/2">
            <img
              src={Silvana}
              alt="Silvana Skin"
              className="w-auto h-[25rem] transform translate-x-[200px] translate-y-10 scale-110"
            />
          </div>
        </div>
      )}

      <div
        className="absolute bottom-1 left-0 right-0 z-10"
        style={{ marginBottom: "-20px" }}
      >
        <img
          src={ScratchUP}
          alt="Scratch Bottom"
          className="w-full h-auto object-cover"
        />
      </div>
      <button
        onClick={scrollToTop}
        className={`${
          isMobile ? "hidden" : ""
        } absolute bottom-[20rem] left-1/2 transform -translate-x-1/2 border-2 border-white py-2 text-white px-8 rounded-full shadow-lg hover:bg-white hover:text-black transition-all focus:outline-none`}
      >
        Back to Top
      </button>
    </div>
  );
};

const useSmoothScroll = () => {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
};

const useLazyLoading = () => {
  useEffect(() => {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
    return () => imageObserver.disconnect();
  }, []);
};

const useScrollAnimation = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible =
          elementTop <= window.innerHeight && elementBottom >= 0;

        if (isVisible) {
          element.classList.add("animate-visible");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);
};

const About = () => {
  const isMobile = useIsMobile();
  useTailwindLayout();
  useSmoothScroll();
  useLazyLoading();
  useScrollAnimation();

  useEffect(() => {
    document.title = "About MSL Philippines - Moonton Student Leaders";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about Moonton Student Leaders Philippines, a community for student gamers passionate about Mobile Legends: Bang Bang. Discover our mission, vision, and departments."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-black transition-all">
      <div className="fixed bottom-4 right-4 md:hidden z-[99]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-black/50 backdrop-blur-sm p-3 rounded-full border border-white/20"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
      <LandingPage />
      <Main />
      <MissionVision />
      <Responsibilities />
      <Departments />
      <Bottom />

      {isMobile && (
        <style jsx global>{`
          @media (max-width: 768px) {
            .animate-slideInLeft,
            .animate-slideInRight,
            .animate-slideInUp {
              animation-duration: 0.5s;
            }

            .font-poetsen {
              letter-spacing: -0.5px;
            }

            p {
              line-height: 1.6;
            }
          }
        `}</style>
      )}
    </div>
  );
};

export default About;
