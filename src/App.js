import Home from "./pages/home";
import Register from "./pages/register";
import SignIn from "./pages/signin";
import Header from "./components/header";
import List from "./pages/list";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      if (localStorage.getItem("remindme") == "false") localStorage.clear();
    });

    return window.removeEventListener("beforeunload", BeforeUnloadEvent);
  });

  useEffect(() => {
    console.log(logged)
  }, [logged])
 
  return (
    <div className="App">
      
      <Router>
        {!logged ? <Header /> : <br/>}
        <Routes>
          <Route path="/" element={<List setLogged={setLogged} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list" element={<List setLogged={setLogged} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
