import React from "react";
import Card from "../Card";
import "./style.css";

const weekLength = [1, 2, 3, 4, 5];
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const topics = [
  "Foundations",
  "JavaScript",
  "Front-end",
  "Back-end",
  "Databases",
  "Testing",
  "React Basics",
  "React Advanced",
  "Client Project",
  "Agile",
  "Computer Science",
  "Architecture",
  "Final Project",
  "Final Project",
  "Final Project",
  "Final Project",
];

const style = {
  display: "flex",
  marginTop: "25px",
};

const Week = ({ weeknumber, previewData }) => {
  return (
    <section id="week-wrapper">
      <div>
        <h2 id="week-id">
          Week {weeknumber} - {topics[weeknumber - 1]}
        </h2>
      </div>
      <div style={style}>
        {weekLength.map((item) => {
          return (
            <Card
              dayname={weekDays[item - 1]}
              weeknumber={weeknumber}
              daynumber={item}
              previewData={previewData}
            />
          );
        })}
      </div>
      <hr />
    </section>
  );
};

export default Week;
