import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ImageSave from './pages/Upload';
import {Container} from './components/Grid';
import DashboardPage from './pages/DashboardPage';
import Events from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';


const App = () => (
  <Container>
  <Router>
    <Switch>
      <Route exact path='/' component = {DashboardPage}/>    
      <Route exact path='/login' component={LoginPage}/>
      <Route exact path='/signup' component={SignUpPage}/>
      <Route exact path='/addevent' component={Events}/>
      <Route exact path='/eventdetails' component={EventDetails}/>
    </Switch>
</Router>
</Container>
);

export default App;
