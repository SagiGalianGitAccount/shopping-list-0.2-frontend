import React, { useState } from "react";
import AddFood from "./addfood";
import "../static/css/food.css";
import axios from "axios";
import { backendURL } from "./backendConnector";

function Food(props) {
  const [editing, setEditing] = useState(false);

 

  const removeMe = () => {
    axios
      .post(backendURL + "removefood", null, {
        params: {
          listId: props.listId,
          foodId: props._id,
        },
      })
      .then((res) => {
        console.log(res);
        props.getFood();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const decrementMe = () => {
    if (props.amount > 1) {
      axios
        .post(backendURL + "changefoodamount", null, {
          params: {
            listId: props.listId,
            foodId: props._id,
            foodAmount: Number(props.amount) - 1,
          },
        })
        .then((res) => {
          console.log(res);
          props.getFood();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const incrementMe = () => {
    axios
      .post(backendURL + "changefoodamount", null, {
        params: {
          listId: props.listId,
          foodId: props._id,
          foodAmount: Number(props.amount) + 1,
        },
      })
      .then((res) => {
        console.log(res);
        props.getFood();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="food-container">
        <div className="title-container">
          <h1 className="title">{props.name}</h1>
          <h6 className="title">{props.section}</h6>
        </div>
        
        <div className="amount-container">
          <h1 className="title">{props.amount}</h1>
        </div>
        <div className="buttons-container">
          {editing && (
            <div className="inner-buttons-container">
              <button className="btn btn-primary m-2" onClick={incrementMe}>
                +
              </button>
              <button className="btn btn-secondary m-2" onClick={decrementMe}>
                -
              </button>
              <button className="btn btn-danger m-2" onClick={removeMe}>
                x
              </button>
             
            </div>
          )}
          <button
            className="btn btn-warning m-2"
            onClick={() => {
              setEditing(!editing);
            }}
          >
            ערוך
          </button>
        </div>
      </div>
    </>
  );
}

export default Food;
