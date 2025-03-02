import React from "react";
import Button from "../components/Button";
import PLain_BG from "../../../assets/imgs/PLainBG.png";
import Natan from "../../../assets/imgs/MLSkins/NatanSkin.png";

const PromptModal = ({
  handleViewLogin,
  handleViewRegister,
  handleCloseModals,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="rounded-lg bg-black shadow-lg relative w-[90%] max-w-md h-[500px] border-2 border-white/50 mx-4 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${PLain_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={handleCloseModals}
          className="absolute top-4 right-4 text-white hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-4 text-center">
          <h2 className="text-lg text-white mb-4">
            Hey, warrior! It looks like you aren't logged in yet.
          </h2>
          <p className="text-white/50 mb-6 text-sm">
            Please log in or create an account to continue.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              hook={handleViewLogin}
              text="Login"
              className="px-4 py-2 w-[120px] text-xs"
            />
            <Button
              hook={handleViewRegister}
              text="SignUp"
              className="px-4 py-2 w-[120px] text-xs"
            />
          </div>
          <p className="text-center text-xs py-3 text-white">
            By continuing, you agree to our{" "}
            <a href="/TermsAndConditions" className="text-yellow-500 underline">
              Terms and Conditions
            </a>
          </p>
        </div>

        <div className="relative bottom-0 left-0">
          <img src={Natan} alt="Natan Skin" className="" />
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
