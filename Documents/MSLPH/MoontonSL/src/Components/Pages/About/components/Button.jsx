import React from "react";

function Button({ text, divClassName }) {
  return (
    <div className={divClassName}>
      <button>{text}</button>
    </div>
  );
}

export default Button;
