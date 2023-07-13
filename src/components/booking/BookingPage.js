import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./BookingPage.css"
import { differenceInCalendarDays } from 'date-fns';

const BookingPage = () => {

  const [userBookings, setuserBookings] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
     const getbookings=async()=>
     {
       const response=await fetch(`http://localhost:4000/api/book/getuserbookings`,
       {
         method:'GET',
         headers:{
           "Content-Type":"application/json",
           token:localStorage.getItem('token')
          }
        });
        
        const data=await response.json();
          
        if(!data.status)
        {
         alert(data.error);
      }
      else{
        setuserBookings(data.allUersBookings);
      }
         console.log(data);
      setloading(false);
     }
     getbookings();
  }, [])
  
  return (
    <>
    <div className="booking container">
        {
          !loading && userBookings.length>0 && userBookings.map((book)=>
          {
            return (
              <div className="bookingcard">
                 <div className="bookingImage">
                     <img src={book.place.photos[1]} alt="" />
                 </div>
                 <div className="bookingInfo">
                     <h4>{book.place.title}</h4>
                     <p>{differenceInCalendarDays(new Date(book.checkIn),new Date(book.checkOut))} Nights ({book.checkIn} to {book.checkOut})</p>
                     <h6>{book.price}</h6>
                 </div>
              </div>
            )
         })
        }
        </div>
    </>
  )
}

export default BookingPage