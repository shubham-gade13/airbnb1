import React from 'react'
import Header from '../Header/Header'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./View_Place.css"
import { Link } from 'react-router-dom'
import {IoMdPhotos} from 'react-icons/io'
import { differenceInCalendarDays } from 'date-fns'
import { Navigate } from 'react-router-dom'
const View_Place = () => {
   const [OpenedPage, setOpenedPage] = useState({});
   const {id}=useParams();
   const [loading, setloading] = useState(true);
   const navigate=useNavigate();

   const [name, setname] = useState("");
   const [phone, setphone] = useState("");
   const [checkIn, setcheckIn] = useState();
   const [checkOut, setcheckOut] = useState();
   const [price, setprice] = useState(0);
   const [guests, setguests] = useState("")



   useEffect(() => {
       const getplace=async()=>
       {
           const response=await fetch(`http://localhost:4000/api/place/getplace/${id}`,
           {
               method:'GET',
           });
           const data=await response.json();
           setOpenedPage(data.place);
           setloading(false);
       }
      getplace();

   }, [id]);

  
   let numberOfDays=0;
   if(checkIn && checkOut)
   {
    numberOfDays=differenceInCalendarDays(new Date(checkIn),new Date(checkOut));
   }
   
   const handleBook=async(e)=>
   {
     e.preventDefault();

    const response=await fetch("http://localhost:4000/api/book/booking",
    {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,price,checkIn,checkOut,guests,place:OpenedPage._id,phone})
    });
    const data=await response.json();
    if(data.status)
    {
        navigate("/");
    
    }
    else
    {
        alert("please login to book place")
    }
 

   }


   return (
    <>
       <Header/>
       <div className="openedPage container">
            {!loading && <div className="nameLoction">
                        <h2>{OpenedPage.title}</h2>
                        <h6>{OpenedPage.address}</h6>
                        <div className="photos">
                            <div className="firstSection">
                             <img src={OpenedPage.photos[1]} alt="" />
                            </div>
                            <div className="secondSection">
                                    <img src={OpenedPage.photos[2]} alt="" />
                                    <img src={OpenedPage.photos[3]} alt="" />
                            </div>
                        <button className='showPhotos'><IoMdPhotos/>  Show More Photos</button>
                        </div>
                        <div className="desc-price-checkin-out">
                            <div className="leftPart my-4">
                                <h2>Description</h2>
                               <p>{OpenedPage.description}</p>
                               <strong>Check in :-</strong>{OpenedPage.checkIn}<br/>
                               <strong>Check out :-</strong>{OpenedPage.checkOut}
                            </div>
                     <form onSubmit={handleBook}>

                            <div className="rightPart">
                                         <div className='text-center my-4 mx-4'><span className='price'>${100}</span><span style={{"color":"red"}}>/per night</span></div>
                                        <h6 className='my-1 mx-4'>Check in :- <input className='my-1 mx-4' type="date" value={checkIn} onChange={ev=>setcheckIn(ev.target.value)} /></h6>
                                        <h6 className='my-1 mx-4'>Check out :- <input className='my-1 mx-4' type="date" value={checkOut} onChange={ev=>setcheckOut(ev.target.value)} /></h6>
                                        <h6 className='my-2 mx-4'>Select number of people</h6>
                                        <input className='input mx-4' type="text" value={guests} onChange={ev=>setguests(ev.target.value)}/>
                                        <h6 className='my-2 mx-4'>Name</h6>
                                        <input className='input mx-4' type="text" placeholder='John Doe' value={name} onChange={ev=>setname(ev.target.value)}/>
                                        <h6 className='my-2 mx-4'>Mobile Number</h6>
                                        <input className='input mx-4' type="text" placeholder='1234567890' value={phone} onChange={ev=>setphone(ev.target.value)}/>
                                        <h6 className='mx-4 mt-4 text-center'>Total price :- {numberOfDays*Number(OpenedPage.price)}</h6>
                                        <br />
                                        <div className='bookButton'>
                                        <button type='submit'>Book Place</button>

                                        </div>
                            </div>
                    </form>
                        </div>
                        <div className="extra-info">
                            <h4>Extra Info</h4>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consequuntur praesentium cum, reprehenderit molestiae esse corporis iste quibusdam quas sit harum atque, pariatur laudantium ullam voluptatibus est dolor. Optio debitis quo enim aut a, error dolorum distinctio facere eos tempora.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure consequuntur praesentium cum, reprehenderit molestiae esse corporis iste quibusdam quas sit harum atque, pariatur laudantium ullam voluptatibus est dolor. Optio debitis quo enim aut a, error dolorum distinctio facere eos tempora.
                             {OpenedPage.extraInfo}
                        </div>
                </div>
                    
            }
        </div>   
    </>
  )
}

export default View_Place

//  <img src="https://a0.muscache.com/im/pictures/miso/Hosting-902874877805496675/original/f35e98e7-7a0b-40c1-a566-610ba8ac4f4a.jpeg?im_w=1200" alt="" />
// <img src="https://a0.muscache.com/im/pictures/miso/Hosting-902874877805496675/original/f35e98e7-7a0b-40c1-a566-610ba8ac4f4a.jpeg?im_w=1200" alt="" />



 