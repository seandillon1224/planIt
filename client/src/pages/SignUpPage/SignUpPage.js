import React, {Component } from 'react';
import SignUpForm from '../../components/SignUpForm';
import {Redirect} from 'react-router-dom';
import Header from '../../components/Header';
import UploadPage from '../Upload';
import {Container} from '../../components/Grid';
import Footer from '../../components/Footer';
 
class SignUpPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      redirect: false,
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/signup');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        console.log(xhr)

        // change the component-container state
        this.setState({
          errors: {}
        });
        
        // set a message
        localStorage.setItem('successMessage', xhr.response.message);
        this.setState({redirect: true});
        // console.log(xhr.response.message);
        // make a redirect
        // this.context.router.replace('/login');
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      // <div>
      //   signup
      // </div>
      <div>
        <Header/>
      {this.state.redirect == false ?(
        <Container>
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
      <Footer/>
      </Container>
      
      ):
      (
        <Redirect to='/login' />
      )
      }
      </div>
    );
  }

}

export default SignUpPage;