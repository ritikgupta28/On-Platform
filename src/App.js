import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Welcome from './components/welcome_page/welcome';
import Admin from './components/admin_page/Admin'
import Ide from './components/user_page/User'
import Developers from './components/developers/Developers'


class App extends React.Component {
  render() {
    return (
    	<Router>
    	<div>
    	<Route path='/' exact component={Welcome}/>
    	<Route path='/Admin' exact component={Admin}/>
    	<Route path='/Ide' exact component={Ide}/>
        <Route path='/Developers' exact component={Developers} />
    	</div>
    	</Router>
    );
  }
}

export default App;
