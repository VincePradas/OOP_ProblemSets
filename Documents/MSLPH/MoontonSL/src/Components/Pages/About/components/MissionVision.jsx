import useIsMobile from "../hooks/useIsMobileHook";
import PlainBG from "../../../assets/imgs/PLainBG.png";

//MARK: MISSION AND VISION
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
                isMobile ? "text-[35px]" : "text-[52px]"
              } `}
            >
              Our Mission
            </h2>
            <p className={`${isMobile ? "text-base" : "text-[18px]"} `}>
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
                isMobile ? "text-[35px]" : "text-[52px]"
              } `}
            >
              Our Vision
            </h2>
            <p className={`${isMobile ? "text-base" : "text-[18px]"} `}>
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

export default MissionVision;
