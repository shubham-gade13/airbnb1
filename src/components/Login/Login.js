import React, { useContext } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
    
import { usercontext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
import Header from '../Header/Header'
const Login = () => {
  const navigate=useNavigate();
       
  const [credentials, setcredentials] = useState({email:"",password:""});
  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    const response=await fetch("http://localhost:4000/api/auth/login",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(credentials)
    });
    const data=await response.json();
    if(data.status)
    {
      localStorage.setItem('token',data.token);
  
      navigate("/");
    }
    else
    {
      alert(data.msg);
    }
  }

  const onchange=(e)=>
  {
    setcredentials({...credentials,[e.target.name]:e.target.value});

  }
  return (
    <>
    <Header/>
    <div className='loginpage'>
        <form className='signupForm' onSubmit={handleSubmit}>
        <h2 className='text-center'>Login</h2>
            <input type="email" placeholder='youremail@gmail.com' name="email" value={credentials.email} onChange={onchange}/>
            <input type="password" placeholder='password' name="password" value={credentials.password} onChange={onchange}/>
            <span>dont have account <Link to="/signup">signup here</Link></span>
            <button type="submit">Login</button>

        </form>
    </div>
    </>
  )
}

export default Login