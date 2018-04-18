import React, {Component} from 'react';
import Auth from '../../modules/Auth';
import {Col, Row, Container} from '../../components/Grid';
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import API from "../../utils/API";
import Header from '../../components/Header';
import axios from "axios";



class DashboardPage extends Component {
constructor(props) {
  super(props);
  this.state = {
  yourEvents: [],
  results: []
  };    
}

  
  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.getInfo()
    // this.loadEvents(this.state.results._id);
   

  }

  componentDidUpdate() {
    // this.getInfo()
    // this.loadEvents(this.state.results._id);
    console.log(this.state.yourEvents)
    
      
  }
  getInfo = () => {
    axios.get(`/api/users/${JSON.parse(localStorage.getItem('usrname')).name}`)
      .then(res =>
        this.loadEvents(res.data[0]._id)
        // console.log(res.data[0]._id)
      )
      .catch(err => console.log(err));
      // this.loadEvents(this.state.results._id)
  };


  loadEvents = id => {
    API.getUserEvents(id)
      .then(res =>
        this.setState({ yourEvents: res.data })
        
      )
      .catch(err => console.log(err));
  };

  // addUser = (id) => {
  //   API.addUser(id)
  //   .then(res => this.getUsers())
  //     .catch(err => console.log(err));
  // };



  //load users
  // componentDidMount() {
  //   this.loadUsers();
  // }

  // get all users
  // loadUsers = () => {
  //   API.getUsers()
  //     .then(res =>
  //       this.setState({ guests: res.data, name: "", email: ""})
        
  //     )
  //     .catch(err => console.log(err));
  // };

  
  // Deletes a book from the database with a given id, then reloads books from the db
  deleteEvent = id => {
    API.deleteEvents(id)
      .then(res => this.loadEvents())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Header/>
        <Jumbotron>
            <h1 className="text-center">
               <strong>PlanIt</strong>
             </h1>
            <h2 className="text-center">
              The World's Number One Planning App
            </h2>
         </Jumbotron>
    <Row>
    <Col size = "md-12">
    <Jumbotron>
              <h1>Saved Events</h1>
            </Jumbotron>
            {this.state.yourEvents.length ? (
              <List>
                {this.state.yourEvents.map(event => {
                  return (
                    <ListItem key={event._id}>
                      <a href={"/event/" + event._id}>
                        <strong>
                        <div>Creator: {event.creator}</div>
                          <div>Description:  {event.description}</div>
                          <div>Dates: {event.dates}</div>
                          <div>Guests: {event.guests}</div>
                          <div>Event: {event.event}</div>
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteEvent(event._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </Col>
    </Row>
      </Container>
    );
  }
}

export default DashboardPage;
