import React from 'react';
import logo from './logo.svg';
import './App.css';
import history from "./config/history";
import Navbar from './component/Navbar/Navbar';
import Login from './component/login/login';
import Signup from './component/signup/signup';
import { Route, Router, Switch } from 'react-router-dom';
import Home from './component/Home/Home';
import ContactPage from './component/contact/contact';
import {Provider} from 'react-redux';
import store from './redux/store';


function App() {
  return (
  <Provider store={store}>
  <React.Fragment>
    <Router history={history}>
      <Navbar />
      <Switch> 
        <Route exact path="/" render={()=><Home/>}/>
        <Route exact path="/contact" render={()=><ContactPage/>}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    </Router>
  </React.Fragment>
 </Provider>
  );
}

export default App;
