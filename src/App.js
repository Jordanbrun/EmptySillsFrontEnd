import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import {Route, Switch} from 'react-router-dom';
import MainContainer from './MainContainer';
import Search from './SearchBar';
import Sills from './Sills';
import { Container } from 'semantic-ui-react';

const my404 = () => {
  return(
    <div>
      <h3>Error!</h3>
    </div>
  )
}


function App() {
  return (
    <main>
      <Switch>
        <Route exact path='/' render={(props) => <Login {...props} />} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/home' component={MainContainer} />
        <Route exact path='/sill/' component={Sills} />
        <Route exact path='/search/' component={Search} />
        <Route component={my404} />
      </Switch>
    </main>
  );
}

export default App;