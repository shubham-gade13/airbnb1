import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {AiOutlinePlus} from "react-icons/ai";
import {FaFileUpload} from "react-icons/fa";
import {MdOutlineArrowBack} from "react-icons/md";
  
const EditPlace = () => {
    const [placeToEdit, setplaceToEdit] = useState({});
    const [loading, setloading] = useState(true);
    

    const [title, settitle] = useState("");
    const [address, setaddress] = useState("");
    const [addedPhotos, setaddedPhotos] = useState([]);
    const [description, setdescription] = useState("")
    const [photoLink, setphotoLink] = useState("")
    const [perks, setperks] = useState([]);
    const [checkIn, setcheckIn] = useState("");
    const [checkOut, setcheckOut] = useState("");
    const [maxGuests, setmaxGuests] = useState(1);
    const [extraInfo, setextraInfo] = useState("");
    const [price, setprice] = useState(0)
     const {id}=useParams();
    const getplace=async()=>
    {
        const response=await fetch(`http://localhost:4000/api/place/getplace/${id}`,
        {
            method:"GET",
              
        })
        const data=await response.json();
        if(data.status==false)
        {
            alert("data not found");
        }
       
        setplaceToEdit(data.place);
        console.log(placeToEdit)
        console.log(data);
        settitle(data.place.title);
        setdescription(data.place.description);
        setcheckIn(data.place.checkIn);
        setcheckOut(data.place.checkOut);
        setaddress(data.place.address);
        setmaxGuests(data.place.maxGuests);
        setextraInfo(data.place.extraInfo);
        setperks(data.place.perks);
        setprice(data.price);
        setloading(false);

    }
    useEffect(() => {
       getplace();

    }, []);

    const handlesubmit=async(e)=>
    {
        e.preventDefault();
     
     
       const response=await fetch("http://localhost:4000/api/place/edit",
         {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
               token:localStorage.getItem('token')
            },
            body:JSON.stringify({id:placeToEdit._id,title:title,description:description,checkIn:checkIn,checkOut:checkOut,
            maxGuests:maxGuests,address:address,extraInfo:extraInfo}),
         });
         const data=await response.json(); 
         console.log(data);

 
          
    }
    const handlechange=()=>
    {

    }
    

  return (
      <>
      {!loading && <div className="addplaceform">
      <h2 className='text-center'>Edit your Place</h2>
    <Link to="/account/places" className=" container backlogo"><MdOutlineArrowBack size={25}/></Link>
  <form className='container' onSubmit={handlesubmit}>
      <h2>Title</h2>
      <input className='in' type="text" placeholder='title' name="title" value={title} onChange={e=>settitle(e.target.value)}/>
      <h2 className='mt-3'>Addres</h2>
      <input className='in' type="text" placeholder='addres' name="address" value={address} onChange={e=>setaddress(e.target.value)}/>
      <h2 className='mt-4'>Photos</h2>
      <div>
          <input className='in' type="text" placeholder='add photos using link' value={photoLink} onChange={e=>setphotoLink(e.target.value)}/>
          <button><FaFileUpload/>Add Photo</button>
      </div>
      <div>
          <button><label for="upload"><AiOutlinePlus/> upload</label></button>
      
      <input type="file" className='d-none' id="upload"/>
      </div>    
      <h2 className='mt-4'>description</h2>
      <textarea className='in' name="" id="" cols="170" rows="2" value={description} onChange={e=>setdescription(e.target.value)}></textarea>         
       <h2 className='mt-4'>Perks</h2>
       <p>select all your perks</p>
       <div className='perks'>
             <label >
                  <input  onClick={handlechange} name='wifi' type="checkbox" />
                  <span>free wifi</span>
             </label>
             <label>
                  <input onClick={handlechange} name='parking' type="checkbox" />
                  <span>free parking</span>
              </label> 
             <label>
                  <input onClick={handlechange} name='TV' type="checkbox" />
                      <span>TV</span>
              </label> 
             <label>
                  <input onClick={handlechange} name='pets' type="checkbox" />
                      <span>Pets allowed</span>
              </label> 
             <label>
                  <input onClick={handlechange} name='pets' type="checkbox" />
                      <span>Pets allowed</span>
              </label> 
             <label>
                  <input onClick={handlechange} name='pets' type="checkbox" />
                      <span>Pets allowed</span>
              </label> 
             <label>
                  <input onClick={handlechange} name='pets' type="checkbox" />
                      <span>Pets allowed</span>
              </label> 
             <label>
                  <input onChange={handlechange} name='pets' type="checkbox" />
                      <span>Pets allowed</span>
              </label> 
          </div>
          <h2 className='mt-4'>Extra info</h2>
          <p>house rules, etc</p>
          <textarea className='in' name="" id="" cols="170" rows="2" value={extraInfo} onChange={e=>setextraInfo(e.target.value)}></textarea>   
           
          <h2 className='mt-4'>check in&iout times</h2>
          <p>add check in and check out time to clean rooms between guests</p>
           <div>
              <div>
                  <input className='in' type="text" placeholder='14:00' value={checkIn} onChange={e=>setcheckIn(e.target.value)}/>
              </div>
              <div>
                  <h3>checkout time</h3>
                  <input className='in' type="text" placeholder='15:00' value={checkOut} onChange={e=>setcheckOut(e.target.value)}/>
              </div>
              <div>
                  <h3>max guests</h3>
                  <input className='in' type="text" value={maxGuests} onChange={e=>setmaxGuests(e.target.value)} />
              </div>
              <div>
                  <h3>Price per night</h3>
                  <input className='in' type="text" value={price} onChange={e=>setprice(e.target.value)} />
              </div>
              </div> 
              <div className="submitbtn my-4">
                  <button type='submit'>Edit</button>
              </div>
             
  </form>
</div>}
</>
  )
}

export default EditPlace