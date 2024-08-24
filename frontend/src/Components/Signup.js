import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./util";


function SignUp(){

    const [signInfo,setSignInfor]=useState({
        name:"",
        email:"",
        password:"",
    })

    const navigate=useNavigate()

    const handleChange=(e)=>{
        const {name,value}=e.target;
        const copySignInfo={...signInfo};
        copySignInfo[name]=value;
        setSignInfor(copySignInfo);
    }

    const handleSignup=async (e)=>{
        e.preventDefault();
        const {name,email,password}=signInfo
        if(!name || !email || !password){
            return handleError('name, email and password are require')
        }
        console.log("ROHIT CHECK" , signInfo)
        try{
            const url="http://localhost:8080/auth/singUp";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(signInfo)
            })
            const result=await response.json();

            const {success, message,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate("/login")
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
            <h1>Sign-Up</h1>   
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input value={signInfo.name} onChange={handleChange} type="text" name="name" autoFocus placeholder="Enter your name..."></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={signInfo.email} onChange={handleChange} type="text" name="email"  placeholder="Enter your emai..."></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input value={signInfo.password} onChange={handleChange} type="password" name="password"  placeholder="Enter your password..."></input>
                </div>
                <button type="submit">signUp</button>
                <span>
                    Already have an account ? <Link to={"/login"}>Login</Link>
                </span>
                <ToastContainer />
            </form>
        </div>
    )
}

export default SignUp