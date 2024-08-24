import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";


function Login(){

    const [loginInfo,setLogInfo]=useState({
        email:"",
        password:"",
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLogInfo(copyLoginInfo);
    }

    const handleLogin=async (e)=>{
        e.preventDefault();
        const {email,password}=loginInfo
        if(!email || !password){
            return handleError('email and password are require')
        }

        try{
            const url="http://localhost:8080/auth/login";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            })
            const result=await response.json();

            const {success, message,jwtToken,name,error}=result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken)
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{
                    navigate("/home")
                },1000)
            }else if(error){
                const details= error?.details[0]?.message;
                handleError(details)
            }else if(!success){
                handleError(message)
            }
            console.log("ROHIT result",result)
        }catch (err){
            handleError(err)
        }
    }
     
    return(
        <div className="container">
            <h1>Login</h1>   
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={loginInfo.email} onChange={handleChange} type="text" name="email"  placeholder="Enter your emai..."></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={loginInfo.password} onChange={handleChange} type="password" name="password"  placeholder="Enter your password..."></input>
                </div>
                <button type="submit">Login</button>
                <span>
                    Don't have account ? <Link to={"/signup"}>SignUp</Link>
                </span>
                <ToastContainer />
            </form>
        </div>
    )
}

export default Login