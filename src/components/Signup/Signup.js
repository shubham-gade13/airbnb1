import React from 'react'
import "./signup.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header/Header';
const Signup = () => {

  const [credentials, setcredentials] = useState({name:"",email:"",password:""});
  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    // fetch data from signup route by sending credentials
    const response=await fetch("http://localhost:4000/api/auth/signup",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(credentials)
    });
    const data=await response.json();
    if(data.status)
    {
      alert("user created");
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
    <h2 className='text-center'>Signup</h2>
        <input type="text" placeholder='John Doe' name="name" value={credentials.name} onChange={onchange}/>
        <input type="email" placeholder='youremail@gmail.com' name="email"  value={credentials.email} onChange={onchange}/>
        <input type="password" placeholder='password'  value={credentials.password} name="password" onChange={onchange}/>
        <span>dont have account <Link to="/login">login here</Link></span>
        <button type='submit'>Signup</button>

    </form>
</div>
    </>
  )
}

export default Signup