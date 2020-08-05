import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Welcome from './components/welcome_page/welcome';
import Admin from './components/admin_page/Admin'
import Ide from './components/user_page/User'
import Developers from './components/developers/Developers'
import PCON from './components/admin_page/PCON'
import Addques from './components/admin_page/feed/Addques'
import AdminFeed from './components/admin_page/feed/AdminFeed'


class App extends React.Component {
  render() {
    return (
    	<Router>
    	<div>
    	<Route path='/' exact component={Welcome}/>
    	<Route path='/Admin' exact component={Admin}/>
    	<Route path='/Ide' exact component={Ide}/>
        <Route path='/Developers' exact component={Developers} />
        <Route path='/PCON' exact component={PCON} />
        <Route path='/Addques' exact component={Addques} />
        <Route path='/AdminFeed' exact component={AdminFeed} />
    	</div>
    	</Router>
    );
  }
}

export default App;
