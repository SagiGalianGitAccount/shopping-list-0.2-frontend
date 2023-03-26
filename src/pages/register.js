import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../static/css/register.css";
import axios from "axios";
import { backendURL } from "../components/backendConnector";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Register() {
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [listPassword, setListPassword] = useState("");
  const [payment, setPayment] = useState(false);
  useEffect(() => {
    // Return a cleanup function that removes the item from LocalStorage
    return () => {
      localStorage.removeItem("listName");
      localStorage.removeItem("listPassword");
    };
  }, []);

  const addList = (listName, listPassword) => {
    axios
      .post(backendURL + "addlist", null, {
        params: {
          listName: listName,
          listPassword: listPassword,
        },
      })
      .then((result) => {
        console.log(result);
        alert(
          "שם: " +
            localStorage.getItem("listName") +
            "\n  " +
            "סיסמה: " +
            localStorage.getItem("listPassword") +
            "\n  " +
            "מומלץ לצלם מסך"
        );
        navigate("/signin");
      });
  };
  const checkList = (listName, listPassword) => {
    axios
      .get(backendURL + "getlist", {
        params: {
          listName: listName,
          listPassword: listPassword,
        },
      })
      .then((result) => {
        console.log(result.data);
        if (result.data) {
          alert("שם הרשימה תפוס, אנא נסה שם אחר");
        } else {
          addList(listName, listPassword);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="register-container">
      <div className="container-inner">
        <h1 className="register-title">צור רשימה חדשה</h1>
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
            localStorage.setItem("listName", e.target.value);
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
            localStorage.setItem("listPassword", e.target.value);
          }}
        />
        <br />
        <br />
        <br />
        <button
          className="btn btn-primary"
          style={{ width: "100%", height: 40 }}
          onClick={() => {
            if (listName.replace(/\s/g, "") == "" || listPassword.replace(/\s/g, "") == "") {
              alert("שם או סיסמת הרשימה לא חוקיים");
            } else {
              setPayment(true);
            }
          }}
        >
          המשך
        </button>
        <br />
        <br />
        {payment && (
          <PayPalScriptProvider
            options={{
              "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
              currency: "ILS",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "1.00",
                      },
                    },
                  ],
                });
              }}
              // createSubscription={(data, actions) => {
              //   return actions.subscription.create({
              //     plan_id: 'P-9Y0949858B393844CMQONEXI',
              //   });
              // }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(function (details) {
                  checkList(
                    localStorage.getItem("listName"),
                    localStorage.getItem("listPassword")
                  );
                  console.log("Done buying phase");
                  //alert("Transaction completed by " + details.payer.name.given_name);
                });
              }}
            />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
}

export default Register;
