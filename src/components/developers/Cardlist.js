import React from 'react';

import Card from './Card';
import './Card.css'
import logo from '../images/logo1.jpg'

const Cardlist = () => {
	 return (
	    <div className='clist'>
	    	<Card name="Sahil Goyal" email="sahilgoyals1999@gmail.com" src={logo} ext='FrontEnd + BackEnd'/>
	    	<Card name="Ritik Gupta" email="ritikgupta2003@gmail.com" src={logo} ext=' FrontEnd + BackEnd'/>
	    </div>
	 );
}

export default Cardlist;