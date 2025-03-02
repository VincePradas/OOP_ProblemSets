import React from "react";

const Button = ({ hook, text, cCLass }) => {
  return (
    <button
      type="button"
      onClick={hook}
      className={`${cCLass} px-12 py-[6px] text-xs border-2 border-white/75 text-white rounded-full hover:bg-white hover:text-black transition duration-300`}
    >
      {text}
    </button>
  );
};

export default Button;
