import React from 'react';

import './Welcome.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'

const Welcome = props => (
	<div className = "home">
    <Header/>
    <Main />
    <Footer/>
  </div>
);

export default Welcome;