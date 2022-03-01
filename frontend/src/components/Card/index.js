import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const Card = ({ weeknumber, daynumber, dayname }) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/cardviewer", { state: { wn: weeknumber, dn: daynumber } });
  }

  return (
    <div id="card-id">
      <h3>{dayname}</h3>
      <p>Day {(weeknumber - 1) * 5 + daynumber}</p>
      <Button action={handleClick} text="Open" />
    </div>
  );
};

export default Card;
