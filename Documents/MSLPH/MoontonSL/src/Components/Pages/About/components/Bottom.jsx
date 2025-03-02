import useIsMobile from "../hooks/useIsMobileHook";
import ScratchUP from "../../../assets/imgs/Scratch04.png";
import Esmeralda from "../../../assets/imgs/MLSkins/EsmeraldaSkin.png";
import Silvana from "../../../assets/imgs/MLSkins/SilvanaSkin.png";

//MARK: BOTTOM - PAGE
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
        } hover:cursor-none absolute bottom-[20rem] left-1/2 transform -translate-x-1/2 border-2 border-white py-2 text-white px-8 rounded-full shadow-lg hover:bg-white hover:text-black transition-all focus:outline-none`}
      >
        Back to Top
      </button>
    </div>
  );
};

export default Bottom;
