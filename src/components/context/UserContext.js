import {  createContext } from "react";
import { useState } from "react";
export const usercontext=createContext();

 
export const UserContextprovider=({children})=>
{
   const [currentuser, setcurrentuser] = useState({});
   const [loading, setloading] = useState(true);
   const getuser=async()=>
   {
            const token=localStorage.getItem('token');
            if(token)
            {
            const response=await fetch("http://localhost:4000/api/auth/getuser",
            {
                method:'GET',
                headers:{
                    "content-type":"application-json",
                    "token":token
                }
            });

            const data=await response.json();
            setcurrentuser(data.user);
           }

    setloading(false);


   }
    return (
        <usercontext.Provider value={{loading,setcurrentuser,currentuser,getuser}}>
        {children}
        </usercontext.Provider>
    )
}

