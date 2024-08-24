import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Home from "./Components/Home";
import 'react-toastify/ReactToastify.css';
import { useState } from "react";
import RefreshHandler from "./Components/RefreshHandler";

function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(false);

  const PrivateRoute=({element})=>{
    return isAuthenticated ? element :<Navigate to="/login" />
  }

  return (
    <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
        <Route path="/" element={<Navigate to="/login" /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
    </div>
  );
}

export default App;
