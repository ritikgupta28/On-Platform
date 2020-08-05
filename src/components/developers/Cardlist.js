import React from 'react';
import Card from './Card';
import './Card.css'

import logo from '../images/logo1.jpeg'

const Cardlist = () => {
	 return (
	    <div className='clist'>
	    	<Card name="Sahil Goyal" email="sahilgoyals1999@gmail.com" src={logo} ext='abc'/>
	    	<Card name="Ritik Gupta" email="ritikgupta28@gmail.com" src={logo} ext='abc'/>
	    </div>
	 );
}

export default Cardlist;