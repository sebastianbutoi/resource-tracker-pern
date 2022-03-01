import React from "react";

const Button = ({ action, text, id }) => {
  return (
    <button onClick={action} id={id}>
      {text}
    </button>
  );
};

export default Button;
