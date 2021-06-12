import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {


  return (
    <AuthState>
    <ContactState>
    <AlertState>

    <BrowserRouter >
      <Fragment>
        <Navbar />
          <div className='container'>
            <Alerts />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/home' component={Home} />
              <Route exact path='/about' component={About} />

            </Switch>
          </div>
      </Fragment>
    </BrowserRouter>

    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
