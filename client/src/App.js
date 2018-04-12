import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ImageSave from './pages/Upload';
import {Container} from './components/Grid';

const App = () => (
  <Container>
  <Router>
    <Switch>
      <Route exact path='/' component = {Home}/>    
      <Route exact path='/login' component={LoginPage}/>
      <Route exact path='/signup' component={SignUpPage}/>
      <Route exact path= '/upload' component={ImageSave}/>
    </Switch>
</Router>
</Container>
);

export default App;
