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
  results: [],
  guestEvents: []
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
    console.log(this.state.guestEvents)
    
    
      
  }
  getInfo = () => {
    if (Auth.isUserAuthenticated() == true){
      axios.get(`/api/users/${JSON.parse(localStorage.getItem('usrname')).name}`)
        .then(res =>
          this.loadEvents(res.data[0]._id)
        )
            // this.loa
          // console.log(res.data[0]._id)
        
        .catch(err => console.log(err));
      //  Events(this.state.results._id)
    }
  };


  loadEvents = id => {
    API.getUserEvents(id)
      .then(res =>
        this.setState({ yourEvents: res.data }),
    API.getGuestEvents(id)
        .then(
        res =>
        this.setState({guestEvents: res.data}))
        // console.log(res.data))
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
  deleteGuest = id => {
    API.deleteGuest(id)
      .then(res => this.getInfo())
      .catch(err => console.log(err));
  };

  
  // Deletes a book from the database with a given id, then reloads books from the db
  deleteEvent = id => {
    API.deleteEvents(id)
      .then(res => this.getInfo())
      .catch(err => console.log(err));
  };


 render() {
    return (
      <div>
    
      {Auth.isUserAuthenticated() == false ? (
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
       </Container>
    ):
    (
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
    <Col size = "md-6">
    <Jumbotron>
              <h1>Created Events</h1>
            </Jumbotron>
            {this.state.yourEvents.length ? (
              <List>
                {this.state.yourEvents.map(event => {
                  return (
                      <ListItem key={event._id}>
                       <a href={"/event/" + event._id}>
                         <strong>
                        <div>Creator: {event.creator.name}</div>
                           <div>Description:  {event.description}</div>
                           <div>Dates: {event.dates}</div>

                          {event.guests.map(r => (
                          <div key={r._id} >Guest : {r.guest.name}
                           <DeleteBtn onClick={() => this.deleteGuest(r.guest._id)} /></div>
                        
                          ))}

                          



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
     <Col size = "md-6">
     <Jumbotron>
               <h1>Guest Events</h1>
             </Jumbotron>
             {this.state.guestEvents.length ? (
               <List>
                 {this.state.guestEvents.map(event => {
                   return (
                     <ListItem key={event._id}>
                       <a href={"/event/" + event._id}>
                         <strong>
                        <div>Creator: {event.creator.name}</div>
                           <div>Description:  {event.description}</div>
                           <div>Dates: {event.dates}</div>

                          {event.guests.map(r => (
                          <div key={r._id} >Guest : {r.guest.name}</div>
                        
                          ))}
                           <div>Event: {event.event}</div>
                         </strong>
                       </a>
                      {/* <DeleteBtn onClick={() => this.deleteEvent(event._id)} /> */}
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
    )}
    </div>
    );
}
}
export default DashboardPage;
