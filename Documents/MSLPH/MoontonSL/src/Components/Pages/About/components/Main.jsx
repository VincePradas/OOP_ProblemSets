import { Link } from "react-router-dom";
import { Logo, Overlay, MSLLogo_Mobile } from "../assets/index";
import Background from "../../../assets/imgs/LandingBG.png";
import ScratchUP from "../../../assets/imgs/Scratch04.png";
import useIsMobile from "../hooks/useIsMobileHook";

//MARK: MAIN - ABOUT
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
          isMobile ? "px-4" : "px-[150px] relative z-10 h-auto p-5"
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
              <h1 className="text-[64px] sm:text-[1px]">
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
                  isMobile
                    ? "text-base"
                    : "text-[18px] lg:text-[2.5vw] md:text-[1.5vw]"
                }`}
              >
                Welcome to Moonton Student Leaders Philippines, a vibrant and
                dedicated community for student gamers passionate about Mobile
                Legends: Bang Bang. Officially established in October 2020, we
                are committed to promoting and supporting the gaming community
                across various schools in the Philippines.
              </p>
              <p
                className={`${
                  isMobile
                    ? "text-base"
                    : "text-[18px] lg:text-[2.5vw] md:text-[1.5vw]"
                }`}
              >
                As of September 2024, the organization has a total of 81
                communities in different universities across the country. These
                schools are the exclusive and major target audience for every
                event held not just by The Moonton Student...
              </p>
              <div className="py-4 mt-2">
                <Link
                  to="/about/more"
                  className={`inline-block rounded-full border-2 border-white/50 text-center px-8 py-[4px] hover:backdrop-blur-sm hover:bg-white hover:text-black transition ${
                    isMobile
                      ? "text-base"
                      : "text-[16px] lg:text-[2vw] md:text-[1.5vw]"
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
          alt="Blender"
          className="w-full h-auto object-contain animate-slideInUp z-[99]"
        />
      </div>
    </div>
  );
};

export default Main;
