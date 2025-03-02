import useIsMobile from "../hooks/useIsMobileHook";
import SunLogo from "../../../assets/imgs/SunLogo.png";
import Background from "../../../assets/imgs/LandingBG.png";
import ScratchUP from "../../../assets/imgs/Scratch04.png";
import { arrow, Overlay } from "../assets/index";

//MARK: LANDING PAGE
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
          className="absolute w-auto h-[200px] opacity-30 object-contain lg:hidden"
          style={{ zIndex: 10 }}
        />

        <div className="relative z-20 text-center mt-[4rem] flex flex-col items-center">
          <h1 className="font-poetsen text-[48px] mb-4 ">MSL PHILIPPINES</h1>
          <button
            className="mt-3 border-2 border-white rounded-full px-8 py-[5px] backdrop-blur-sm hover:bg-white hover:text-black transition"
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
          alt="Blender"
          className="w-full h-auto object-contain animate-slideInUp"
        />
      </div>
    </div>
  );
};

export default LandingPage;
