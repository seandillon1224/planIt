import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Auth from '../../modules/Auth';
import "./Neptune_Full.jpg";

class Header extends React.Component {

  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      SiteText:  <image src = "./Neptune_Full.jpg" alt = "Neptune"></image>,
      loginText: 'Log In',
      signupText: 'Sign up',
      userWelcomeText: 'Hello ',
      redirect: false,
 
    };

    this.onLogOutClicked = this.onLogOutClicked.bind(this);
  }    

  onLogOutClicked()
  {
    Auth.deauthenticateUser();
    
  }


  render() {
    return (

    <div className="top-bar bg-primary">

      

        <div className="top-bar-left">
                <image src = "./Neptune_Full.jpg" alt = "Neptune"></image>
        </div>


        <div>
        {Auth.isUserAuthenticated() == true ? (

            <div className="top-bar-left">

                  {this.state.userWelcomeText} {JSON.parse(localStorage.getItem('usrname')).name}!

            </div>  
            ):
            (

            <div>
            </div>  

            )}

        </div>


        {Auth.isUserAuthenticated() == false ? (
        <div className="top-bar-right">
                 <Link to="/login">{this.state.loginText}</Link> 
                <Link to="/signup">{this.state.signupText}</Link> 
        </div>
        ):
        (
        <div className="top-bar-right">
                 <Link to ="/">Home</Link>
                 <Link to="/login" onClick={this.onLogOutClicked}>Log out</Link>
                 <Link to="/addevent">Add Event</Link>  
        </div>
        )
        }



    </div>
    




    );
  }


}



export default Header   