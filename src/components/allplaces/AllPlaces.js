import React from 'react'
import Header from '../Header/Header'
import "./AllPlaces.css"
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const AllPlaces = () => {

    const [loading, setloading] = useState(true);
    const [allPlaces, setallPlaces] = useState([]);

    const getallplaces=async()=>
    {
        const response=await fetch("http://localhost:4000/api/place/getallplaces",
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data=await response.json();
        setallPlaces(data.places);
        setloading(false);
    }
  useEffect(() => {
    getallplaces();
  }, [])
  
console.log(allPlaces)

  return (
    < >
        <Header/>
        <div style={{"width":"100%"}}>

        <div className="allplaces container">
            {
                !loading && allPlaces.map((el)=>
                {
                    return <Link to={`/place/${el._id}`} className='newcard cursor-pointer'>
                           <div className="image">
                            <img src={el.photos[1]} alt="" />
                            </div>
                            <h6 className='mx-2 mt-2'>{el.title}</h6>
                                <p className='mx-2 lh-1'>{el.address}</p>
                                <p className='mx-2 lh-1 text-danger'>${el.price}/per night</p>
                             
                    </Link>
                }
                )
            }  
        </div>
            </div>
    </>
  )
}

export default AllPlaces