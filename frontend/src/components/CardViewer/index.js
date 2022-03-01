import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;

const CardViewer = () => {
  const { state } = useLocation();
  const { wn, dn } = state;

  const [data, setData] = React.useState([]);
  const [titleInput, setTitleInput] = React.useState("");
  const [descriptionInput, setDescriptionInput] = React.useState("");

  const calculateDay = (wn - 1) * 5 + dn;

  React.useEffect(() => {
    async function fetchData() {
      const resp = await fetch(`${API_URL}/note/day${calculateDay}`);
      const fetchedData = await resp.json();
      setData([...fetchedData]);
    }
    fetchData();
  }, [calculateDay]);

  function handleTitle(event) {
    setTitleInput(event.target.value);
  }

  function handleDescription(event) {
    setDescriptionInput(event.target.value);
  }

  function addData() {
    const tempData = {
      title: titleInput,
      description: descriptionInput,
    };
    async function postData() {
      const response = await fetch(`${API_URL}/note/day${calculateDay}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(tempData),
      });
      const responseMessage = await response.json();
      console.log(
        "Message from server: \n" + JSON.stringify(responseMessage, null, 2)
      );
      setData([...data, tempData]);
    }
    if (titleInput !== "" || undefined) {
      postData();
    } else {
      alert("Please insert title");
    }
  }

  function updateData() {
    const tempData = {
      title: titleInput,
      description: descriptionInput,
    };
    async function patchData() {
      const response = await fetch(`${API_URL}/note/day${calculateDay}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(tempData),
      });
      const responseMessage = await response.json();
      console.log(
        "Message from server: \n" + JSON.stringify(responseMessage, null, 2)
      );
      const updatedData = data.map((element) =>
        element.title === tempData.title ? tempData : element
      );
      setData([...updatedData]);
    }
    if (titleInput === "" || descriptionInput === "") {
      alert("Please insert title and description");
    } else {
      patchData();
    }
  }

  function deleteData() {
    async function remove() {
      const response = await fetch(`${API_URL}/note/day${calculateDay}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({ title: titleInput }),
      });
      const responseMessage = await response.json();
      console.log(
        "Message from server: \n" + JSON.stringify(responseMessage, null, 2)
      );
      const updatedData = data
        .map((ob) => (ob.title === titleInput ? -1 : ob))
        .filter((el) => el !== -1);
      setData([...updatedData]);
    }

    if (titleInput === "" || undefined) {
      alert("Please insert a valid title");
    } else {
      remove();
    }
  }

  let navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <div className="card-div">
      <Button text="HOME" action={goHome} id="custom-btn" />
      <div id="input-wrapper">
        {data.length !== 0 ? (
          <p id="data">{data[0].date.toString()}</p>
        ) : (
          <p>Date not found</p>
        )}
        <input
          onChange={handleTitle}
          type="text"
          placeholder="Insert title.."
          name="title-input"
        />{" "}
        <br />
        <br />
        <input
          onChange={handleDescription}
          type="text"
          placeholder="Insert description.."
          name="description-input"
        />{" "}
        <br />
        <br />
        <Button text="Add" action={addData} />
        <Button text="Update" action={updateData} />
        <Button text="Delete" action={deleteData} />{" "}
      </div>
      {data.map((item) => {
        return (
          <>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </>
        );
      })}
    </div>
  );
};

export default CardViewer;
