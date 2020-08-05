import React from 'react';
import './welcome.css';
import Header from './header';
import Main from './main';
import Footer from './footer'

export default class welcome extends React.Component {
	render() {
        return (
            <div className = "home">
                 <Header/>
                 <Main />
                 <Footer/>
            </div>
        );
    }
}