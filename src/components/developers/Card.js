import React from 'react';

const Card = ({ name, email, src, ext }) => {
	
	return (
       <div className='card'>
         <img src={src} alt='Developer'/>
         <div className='ne'>
         <h2>{name}</h2>
         <p>{email}</p>
         <p>{ext}</p>
         </div>
       </div> 
	);
}

export default Card;