import React, { Component } from "react";

function AddFood(props) {
  return (
    <div className="list-container">
      <label htmlFor="name">שם הפריט</label>
      <input
        name="name"
        className="form-control"
        onChange={(t) => {
          props.setFoodName(t.target.value);
        }}
      />
      <h1>{props.amount}</h1>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          props.setAmount(props.amount + 1);
        }}
      >
        +
      </button>
      <button
        className="btn btn-secondary m-2"
        onClick={() => {
          if (props.amount > 1) props.setAmount(props.amount - 1);
        }}
      >
        -
      </button>
      <br />
      <label htmlFor="section">מחלקה</label>
      <input
        name="section"
        className="form-control"
        onChange={(t) => {
          props.setFoodSection(t.target.value);
        }}
      />
      <br />
      <button
        className="btn btn-warning m-2"
        onClick={() => {
          props.resetFields();
        }}
      >
        בטל
      </button>
      <button
        className="btn btn-success m-2"
        onClick={() => {
          props.addFood();
          props.resetFields();
        }}
      >
        הוסף
      </button>
    </div>
  );
}

export default AddFood;
