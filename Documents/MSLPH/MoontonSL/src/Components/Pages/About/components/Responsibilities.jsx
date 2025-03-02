import useIsMobile from "../hooks/useIsMobileHook";
import Background2 from "../../../assets/imgs/LandingBG02.png";
import DiggieSkin from "../../../assets/imgs/MLSkins/DiggieSkin.png";
import ScratchDOWN from "../../../assets/imgs/Scratch03.png";
import ScratchUP from "../../../assets/imgs/Scratch04.png";

//MARK: RESPONSIBILITIES
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

export default Responsibilities;
