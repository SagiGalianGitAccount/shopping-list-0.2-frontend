import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/signin.css";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { backendURL } from "../components/backendConnector";

const SignIn = () => {
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [listPassword, setListPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const checkList = (listName, listPassword) => {
    setLoading(true);
    console.log("Checking list !");
    axios
      .get(backendURL + "getlist", {
        params: {
          listName: listName,
          listPassword: listPassword,
        },
      })
      .then((result) => {
        setLoading(false);
        console.log(result.data);
        if (result.data) {
          console.log("Successful");
          localStorage.setItem("token", "some use data");
          localStorage.setItem("listId", result.data._id);
          navigate("/list");
        } else {
          setLoading(false);
          alert("שם או סיסמא שגויים");
          console.log("No user found");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    localStorage.setItem("remindme", "false");
  }, []);
  return (
    <div className="signin-container">
      {loading ? (
        <>
          <ClipLoader
            color={"#111111"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
          />

          <h1>המערכת טוענת, בבקשה אל תכבה את התוכנה</h1>
        </>
      ) : (
        <div className="container-inner">
          <h1 className="signin-title">כניסה לרשימה קיימת</h1>
          <label htmlFor="uname">
            <b>שם הרשימה</b>
          </label>
          <input
            type="text"
            placeholder="הכנס את שם הרשימה"
            name="uname"
            required
            onChange={(e) => {
              setListName(e.target.value);
            }}
          />

          <label htmlFor="psw">
            <b>סיסמת הרשימה</b>
          </label>
          <input
            type="password"
            placeholder="הכנס את סיסמת הרשימה"
            name="psw"
            required
            onChange={(e) => {
              setListPassword(e.target.value);
            }}
          />

          <input
            type="checkbox"
            name="checkbox"
            style={{ marginLeft: "10px" }}
            onClick={(e) => {
              localStorage.setItem("remindme", e.target.checked);
            }}
          />
          <label htmlFor="checkbox">
            <b>זכור אותי</b>
          </label>

          <button
            className="btn btn-primary"//log-reg-btn
            style={{width: "100%", height: 40, marginTop: 10}}
            type="submit"
            onClick={() => {
              checkList(listName, listPassword);
            }}
          >
            כניסה
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
