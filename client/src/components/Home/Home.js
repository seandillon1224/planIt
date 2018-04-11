import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'reactstrap';
import Auth from '../../modules/Auth';
import DashboardPage from '../../pages/DashboardPage';
import Header from '../../components/Header';


class Home extends React.Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      currentLanguage: 'Eng',
      cardtitle: "Website Title",
      cardsubtitle: "This is the home page. Log in to see the hidden content",
      
    };

    //this.cardtitleP = "";

  }


  render() {

    return (
      <div>
    
        {Auth.isUserAuthenticated() == false ? (
          
      <Card className="container">

          <CardTitle title={this.state.cardtitle} subtitle={this.state.cardsubtitle} />  

        
        
      </Card>):
      (
        <DashboardPage/>
      )}
      </div>    
    
    )


  }  



}



export default Home;