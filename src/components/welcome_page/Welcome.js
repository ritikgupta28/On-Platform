import React from 'react';

import './Welcome.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'

const Welcome = ({onRouteChange}) => (
	<div className = "home">
    <Header />
    <Main onRouteChange={onRouteChange}/>
    <Footer/>
  </div>
);

export default Welcome;
