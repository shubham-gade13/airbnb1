import React from 'react'
import { useState, useContext,useEffect} from 'react'
import { usercontext } from '../../context/UserContext'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./Account.css"
import { Navigate } from 'react-router-dom'
import MyPlaces from '../../myplaces/MyPlaces'
import Header from '../../Header/Header'
import {AiOutlineMenu} from 'react-icons/ai';
import {FaUserAlt} from 'react-icons/fa';
import {AiFillHome} from 'react-icons/ai';
import BookingPage from '../../booking/BookingPage'
    
const Account = () => {
    const navigate=useNavigate();
    const {currentuser,setcurrentuser}=useContext(usercontext);
    const [loading, setloading] = useState(true);
    const [islogin, setislogin] = useState(false)
      const [page, setpage] = useState(1);
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
    }, []);

        const logout=()=>
        {
            localStorage.clear();
            setcurrentuser({});
            navigate("/login");
              
        }
   console.log(page);
  return (
    <>
    <Header/>
    <div className='accountpage'>
        <nav>
            <Link onClick={()=>{setpage(1)}} className={page===1 ? "linkActive" : "link"} to="/account"><FaUserAlt size={14}/>  My Profil</Link>
            <Link onClick={()=>{setpage(2)}} className={page===2 ? "linkActive" : "link"} to="/account/booking"><AiOutlineMenu/> My Booking</Link>
            <Link onClick={()=>{setpage(3)}} className={page===3 ? "linkActive" : "link"} to="/account/places"><AiFillHome size={18}/>  My Accomodations</Link>
        </nav>
        {page===1 && <div className='account'>
                <h4>welcome {islogin && currentuser.name} </h4>
                <button className="logoutButton" onClick={logout}>logout</button>
                
        </div>}
        {
          page==2 && <BookingPage/>
        }
        {
          page==3 && <MyPlaces/>
        }
    </div>
        </>
  )
}

export default Account