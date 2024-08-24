import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./util";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("User logged-out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
        const url='http://localhost:8080/products';

        const headers={
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        }
        const response =await fetch(url,headers);
        const result=await response.json();
        console.log(result)
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>{loggedInUser}</div>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
    </>
  );
}

export default Home;
