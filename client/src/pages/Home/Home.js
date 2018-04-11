

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'reactstrap';
import Auth from '../modules/Auth';
import DashboardPage from '../../pages/DashboardPage';
import Header from '../../components/Header'


class Home extends Component {

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

    // var maintitle = localStorage.getItem('currentLanguage') == 'Eng' ? 'Website title':'网站标题';
    // var subtitle = localStorage.getItem('currentLanguage') == 'Eng' ?  'This is the home page. Log in to see the hidden content':
    // '这里是主页，请登录查看更多内容';


    return (
      <div>
    
        {Auth.isUserAuthenticated() == false ? (
         
      
      <Card className="container">

          <CardTitle title={this.props.cardtitleP} subtitle={this.props.cardsubtitleP} />  

        
        
      </Card>
      ):
      (
        
        <DashboardPage/>
        
      )}
     </div>
    
    )


  }  



}

Home.propTypes = {
  cardtitleP: PropTypes.string.isRequired,
  cardsubtitleP: PropTypes.string.isRequired
};



export default Home;