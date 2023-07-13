import React from 'react'
import "./MyPlaces.css";
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {AiOutlinePlus} from "react-icons/ai";
import {FaFileUpload} from "react-icons/fa";
import {MdOutlineArrowBack} from "react-icons/md";
import { Link } from 'react-router-dom';
import PlaceCard from './placeCard/PlaceCard';
import axios from 'axios';
const MyPlaces = () => {
       const [page, setpage] = useState(1);
       const [title, settitle] = useState("");
       const [address, setaddress] = useState("");
       const [addedPhotos, setaddedPhotos] = useState([]);
       const [description, setdescription] = useState("")
       const [photoLink, setphotoLink] = useState("")
    const [perks, setperks] = useState([]);
    const [checkIn, setcheckIn] = useState("");
    const [checkOut, setcheckOut] = useState("");
    const [maxguests, setmaxguests] = useState(1);
    const [extraInfo, setextraInfo] = useState("");
    const [price, setprice] = useState(0);

    const [places, setplaces] = useState([]);
    const [loading, setloading] = useState(true);

 

        
    

    const getallplaces=async()=>
    {
       const response=await fetch("http://localhost:4000/api/place/getUserAddedPlaces",
       {
        method:'GET',
        headers:{
            token:localStorage.getItem('token'),
        }

       });
       const data=await response.json();
       setplaces(data.allPlaces);
       setloading(false);
    }
    useEffect(() => {
          getallplaces();
    }, [places])
    

    const handlesubmit=async(e)=>
    {
          e.preventDefault();
          const response=await fetch("http://localhost:4000/api/place/createplace",
          {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                 token:localStorage.getItem('token')
            },
            body:JSON.stringify({
                title:title,
                address:address,
                photos:addedPhotos,
                description:description,
                perks:perks,
                checkIn,checkOut,maxGuests:maxguests,
                price
            })
          });
          const data=await response.json();
          console.log(data);
          setpage(1);
      setaddedPhotos([]);

    }

    const handlechange=(e)=>
    {
       if(e.target.checked)
       {
          setperks([...perks,e.target.name]);
        }
        else
        {
           setperks([...perks.filter(i=>i!=e.target.name)]);

       }
       console.log(perks[0]);
       console.log(perks[1]);
        
    
    }
    const addPhotoByLink=(ev)=>
    {
        ev.preventDefault();
        setaddedPhotos([])
        if(photoLink)
        {
            setaddedPhotos([...addedPhotos,photoLink]);
        }
        else{
            alert("please enter valid photo string")
        }

        setphotoLink("");
        console.log(addedPhotos);
    }

    /*async function addPhotoByLink(ev){
        ev.preventDefault();
        const response=await axios.post("http://localhost:4000/uploadBYLink",{link:photoLink});
         console.log(response);
    }
    */
   return (
    <>
    
    {page===1 && <div className="addplacediv">
           <Link onClick={()=>{setpage(2)}} to="/account/places/new" className="addplace"><AiOutlinePlus/>add new place</Link>

           
    </div>
    }
    {
        page==1 && <div className="list" style={{"margin":"auto"}}>
                        {!loading && places.map((p)=>
                                {
                                    return <PlaceCard p={p}/>    

                                })
                        }
                </div>
    }
    {
        page==2 && <div className="addplaceform">
              <div onClick={()=>setpage(1)} className=" container backlogo"><MdOutlineArrowBack size={25}/></div>
            <form className='container' onSubmit={handlesubmit}>
                <h2>Title</h2>
                <input className='in' type="text" placeholder='title' name="title" value={title} onChange={e=>settitle(e.target.value)}/>
                <h2 className='mt-3'>Addres</h2>
                <input className='in' type="text" placeholder='addres' name="address" value={address} onChange={e=>setaddress(e.target.value)}/>
                <h2 className='mt-4'>Photos</h2>
                <div>
                    <input className='in' type="text" placeholder='add photos using link' value={photoLink} onChange={e=>setphotoLink(e.target.value)}/>
                    <button onClick={addPhotoByLink}><FaFileUpload/>Add Photo</button>
                    <div className='Allphotos'>
                         {
                                addedPhotos.length>0 && addedPhotos.map((link)=>
                                {
                                    return <div className="pic"><img className='bookImage' src={link} alt="" /></div>
                                })
                        }
                    </div>
                   
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
                            <input className='in' type="text" value={maxguests} onChange={e=>setmaxguests(e.target.value)} />
                        </div>
                        <div>
                            <h3>Price per night</h3>
                            <input className='in' type="text" name="price" value={price} onChange={e=>setprice(e.target.value)} />
                        </div>
                        </div> 
                        <div className="submitbtn my-4">
                            <button type='submit'>Save</button>
                        </div>
                       
            </form>
        </div>
    }
    </>
  )
}

export default MyPlaces