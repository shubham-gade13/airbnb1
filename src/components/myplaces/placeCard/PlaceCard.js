import React from 'react'
import "./PlaceCard.css";
import { Link } from 'react-router-dom';

const PlaceCard = ({p}) => {
  return (
    <Link to={`/account/places/new/${p._id}`} className='placeCard'>
        <div className="images">
                <img src={p.photos[1]} alt="" />
        </div>
        <div className="info">
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <p>{p.address}</p>
        </div>
       
    </Link>
  )
}

export default PlaceCard