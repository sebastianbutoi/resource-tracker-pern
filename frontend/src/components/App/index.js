import "./App.css";
import Week from "../Week/index.js";
import React from "react";
import Button from "../Button";

const API_URL = process.env.REACT_APP_API_URL;

const bootcampLenght = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const quotes = [
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
  "In order to be irreplaceable, one must always be different - Coco Chanel",
  "Java is to JavaScript what car is to Carpet. - Chris Heilmann",
  "Knowledge is power. - Francis Bacon",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. - Dan Salomon",
  "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away. - Antoine de Saint-Exupery",
  "Code is like humor. When you have to explain it, it's bad. - Cory House",
  "Fix the cause, not the symptom. - Steve Maguire",
  "Optimism is an occupational hazard of programming: feedback is the treatment. -Kent Beck",
  "Simplicity is the soul of efficiency. - Austin Freeman",
  "Before software can be reusable it first has to be usable. - Ralph Johnson",
  "Cultivate an optimistic mind, use your imagination, always consider alternatives",
  "here are two ways of spreading light: to be the candle or the mirror that reflects it.",
  "You can, you should, and if you're brave enough to start, you will. Stephen King (Author)",
  "When everything seems to be going against you, remember that the aeroplane takes off against the wind, not with it. - Henry Ford",
];

function App() {
  const [input, setInput] = React.useState("");
  const [found, setFound] = React.useState(null);
  const [quote, setQuote] = React.useState("");

  function handleInput(event) {
    setInput(event.target.value);
  }

  React.useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  function handleClick() {
    async function getData() {
      const resp = await fetch(`${API_URL}/note/filter/${input.toLowerCase()}`);
      const fetchedData = await resp.json();
      const tempArr = fetchedData
        .map((ob) => ob.name)
        .map(
          (e) =>
            e[0].toUpperCase() +
            e.substring(1, 3) +
            " " +
            e.substring(3, e.length)
        );
      setFound([...tempArr]);
    }
    if (input !== "" || undefined) {
      getData();
    } else {
      alert("Input is missing");
    }
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Resources Tracker by Coding four-ever team</h1>
        <p>{quote}</p>
      </header>
      <h2>Quick search</h2>
      <input
        placeholder="Search by title.."
        onChange={handleInput}
        type="text"
      />
      <Button action={handleClick} text="Search" />
      {found ? found.map((item) => <p>{item}</p>) : ""}
      {bootcampLenght.map((item) => {
        return (
          <div>
            <Week weeknumber={item} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
