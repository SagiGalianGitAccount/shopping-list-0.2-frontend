import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Food from "../components/food";
import "../static/css/list.css";
import ClipLoader from "react-spinners/ClipLoader";
import AddFood from "../components/addfood";
import { backendURL } from "../components/backendConnector";
function startWithStr(string, substring) {
  if (substring.length > string.length) return false;

  for (let i = 0; i < substring.length; i++) {
    if (string[i] != substring[i]) return false;
  }
  return true;
}
var orderBySection = {};
function List(props) {
  const navigate = useNavigate();
  const [id, setId] = useState(localStorage.getItem("listId"));
  const [food, setFood] = useState([]);
  const [filteredFood, setFilteredFood] = useState(food);
  const [adding, setAdding] = useState(false);
  const [amount, setAmount] = useState(1);
  const [foodName, setFoodName] = useState("");
  const [foodSection, setFoodSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inUpdate, setInUpdate] = useState(false);
  const [updates, setUpdates] = useState([]);


  useEffect(() => {
    getUpdates()
    if (!localStorage.getItem("token")) {
      props.setLogged(false);
      navigate("/signin");
    } else {
      props.setLogged(true);
    }
  }, []);

  const getUpdates = () => {
    axios.get(backendURL + "getupdates").then((res) => {
      console.log(res.data)
      setUpdates(res.data)
    })
  };

  const resetFields = () => {
    setAmount(1);
    setFoodName("");
    setFoodSection("");
    setAdding(!adding);
  };

  const getFood = () => {
    setLoading(true);
    axios
      .get(backendURL + "getlistbyid", {
        params: {
          _id: id,
        },
      })
      .then((result) => {
        //    food.sort((a, b) => (a.section > b.section) ? 1 : -1));
        setFood(
          result.data.food.sort((a, b) => (a.section > b.section ? 1 : -1))
        );
        console.log(result.data.food);
        setFilteredFood(
          result.data.food.sort((a, b) => (a.section > b.section ? 1 : -1))
        );
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  const addFood = () => {
    setLoading(true);
    axios
      .post(backendURL + "addfood", null, {
        params: {
          _id: id,
          foodName: foodName,
          foodAmount: amount,
          foodSection: foodSection,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        getFood();
      });
  };

  const deleteAll = () => {
    if (window.confirm("האם אתה בטוח שתרצה למחוק את כל הפריטים ברשימה ?")) {
      setLoading(true);
      axios
        .post(backendURL + "removeall", null, {
          params: {
            listId: id,
          },
        })
        .then((result) => {
          console.log(result.data);
          getFood();
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    getFood();
  }, []);
  return (
    <>
      <button
        className="btn btn-secondary m-2"
        style={{marginTop: 0}}
        onClick={() => {
          setInUpdate((current) => !current);
        }}
      >
        עידכונים
      </button>
      {inUpdate && <div className="inupdate">
        {updates.map(update => <h1 key={update} style={{fontSize: 22}}>{update}</h1>)}
        
        <button
        className="btn btn-danger m-2"
        onClick={() => {
          setInUpdate((current) => !current);
        }}
      >
        סגור
      </button>
        </div>}
      <div className="loading">
        {loading && (
          <ClipLoader
            color={"#111111"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
          />
        )}
        {error && loading && <h1>ישנה שגיאה</h1>}
        {!error && loading && <h1>אין שגיאה המערכת טוענת</h1>}
      </div>
      {!adding && (
        <div className="list-container">
          <h1>ישנם: {filteredFood.length} פריטים</h1>
          <button className="btn btn-danger m-2" onClick={deleteAll}>
            מחק הכל
          </button>
          <button
            className="btn btn-warning m-2"
            onClick={() => {
              localStorage.clear();
              props.setLogged(false);
              navigate("/signin");
            }}
          >
            התנתק
          </button>
          <button
            className="btn btn-success m-2"
            onClick={() => {
              setAdding(!adding);
            }}
          >
            הוסף פריט
          </button>
          <input
            className="form-control"
            placeholder="חפש פריט"
            onChange={(e) => {
              setFilteredFood(
                food.filter((f) => startWithStr(f.name, e.target.value))
              );
            }}
          />
          {filteredFood && filteredFood.length > 0 ? (
            filteredFood.map((f) => (
              <Food
                getFood={getFood}
                listId={id}
                name={f.name}
                amount={f.amount}
                section={f.section}
                key={f.foodId}
                _id={f.foodId}
              />
            ))
          ) : (
            <h1>אין פריטים ברשימה</h1>
          )}
        </div>
      )}
      {adding && loading == false && (
        <AddFood
          amount={amount}
          setFoodSection={setFoodSection}
          setFoodName={setFoodName}
          setAmount={setAmount}
          resetFields={resetFields}
          addFood={addFood}
        />
      )}
    </>
  );
}

export default List;
