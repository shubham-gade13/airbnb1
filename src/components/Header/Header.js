import React from 'react'
import "./Header.css"
import { FaAirbnb } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { usercontext } from '../context/UserContext';
import { useContext } from 'react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
const Header = () => {
  
 
   const [islogin, setislogin] = useState(false);
   const [loading, setloading] = useState(true);
   
  const {currentuser,setcurrentuser}=useContext(usercontext);
  

  useEffect(() => {
        
    const getuser=async()=>
   {
            const token=localStorage.getItem('token');
            if(token)
            {
            const response=await fetch("http://localhost:4000/api/auth/getuser",
            {
                method:'GET',
                headers:{
                    "Content-Type":"application/json",
                    token:token
                }
            });

            const data=await response.json();
            setcurrentuser(data.user);
               setislogin(true);
           }

    setloading(false);


   }
   getuser();
     
  }, [localStorage.getItem('token')])
  
  return (
    <>
    {loading ? null :<div className='header'>
        <div className="logo-name">
            <Link to="/" style={{"marginRight":"10px"}}>
              <FaAirbnb color='#FF385C' size={40}/>
            </Link>
            <span style={{"color":"#FF385C"}}><strong>airbnb</strong></span>
        </div>
        <div className="middle">
            <div>Anywhere</div>
            <span style={{"border":"1px solid rgb(185, 181, 181)","height":"30px"}}></span>
            <div>Anyweek</div>
            <span style={{"border":"1px solid rgb(185, 181, 181)","height":"30px"}}></span>
            <div>Add Guests  <span className='mx-1' style={{"backgroundColor":"white","border-radius":"50%"}}><FiSearch/></span></div>
        </div>
        <div className="profil">
            <Link to={!islogin ? "/login" : "/account"} className="logos">
            <div style={{"color":"black"}}><AiOutlineMenu size={15}/></div>
            <div><CgProfile size={30} color='rgb(68, 67, 67)'/></div>
            <h5 style={{"textDecorationLine":"none","color":"black"}}>{islogin && currentuser.name}</h5> 
            </Link>
           
        </div>
            
    </div>}
    </>
  )
}

export default Header