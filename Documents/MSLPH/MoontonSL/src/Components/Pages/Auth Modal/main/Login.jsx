import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import LandingBG01 from "../../../assets/imgs/LandingBG01.png";
import MSLPHNewLogo from "../../../assets/imgs/MSLPHNewLogo.png";

const LoginModal = ({
  handleCloseModals,
  handleViewRegister,
  handleUserLogin,
  loginData,
  handleLoginInputChange,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="rounded-lg shadow-lg relative max-w-md w-full mx-4 h-[500px] border-2 border-white/15"
        style={{
          backgroundImage: `url(${LandingBG01})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          Height: "100vh",
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
        <div className="p-8">
          <div className="flex items-center justify-center mb-2">
            <div className="flex flex-col justify-center items-left">
              <h2 className="text-2xl text-white mb-4 font-poppins font-semibold">
                LOGIN MSL ACCOUNT
              </h2>
              <div>
                <img
                  src={MSLPHNewLogo}
                  alt="new msl logo"
                  className="w-auto h-[55px]"
                />
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <Input
              type="text"
              label="Username"
              placeholder="ex. Crisostomo"
              name="username"
              value={loginData.username}
              onChange={handleLoginInputChange}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="********"
              name="password"
              value={loginData.password}
              onChange={handleLoginInputChange}
              required
            />
            <div className="flex items-center justify-center">
              <Button hook={handleUserLogin} text="LOGIN" />
            </div>
          </form>
          <div className="my-5">
            <p className="text-center text-yellow-500/50 text-xs">
              Forgot Password
            </p>
          </div>
          <div className="py-5 relative top-10">
            <p className="text-white/50 text-center text-xs">
              Don't have an account yet?{" "}
              <p
                onClick={handleViewRegister}
                className="text-yellow-500 hover:cursor-pointer text-xs"
              >
                Sign up
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
