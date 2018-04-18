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
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import Footer from '../../components/Footer';
import Panel from '../../components/Panel';

const MultipleDatesCalendar = withMultipleDates(Calendar);
let theDates = [new Date()]

class DashboardPage extends Component {
constructor(props) {
  super(props);
  this.state = {
  yourEvents: [],
  results: [],
  guestEvents: [],
  dates: ["None"]
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

  onClick = (e) => {
    this.getInfo()
      
    let Data=e.target.getAttribute('data')
    
    let guestData={guest: Data}
  
    const mappedData = this.state.yourEvents.filter(x => x._id === guestData.guest)
    const mappedDates = mappedData.dates
    console.log(mappedData[0].dates)
    theDates=mappedData[0].dates
    this.setState({dates: theDates})
  
  }

  onClickGuest = (e) => {
    this.getInfo()
    console.log(this.state.guestEvents)
    let Data=e.target.getAttribute('data')
    
    let guestData={guest: Data}
    console.log(guestData)
  
    const mappedData = this.state.guestEvents.filter(x => x._id === guestData.guest)
    const mappedDates = mappedData.dates
    console.log(mappedData[0].dates)
    theDates=mappedData[0].dates
    this.setState({dates: theDates})
  
  }


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
          <br/>
        <Jumbotron>
          Login to start planning!
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
            <Panel>
            <Col size = "md-6">
            
                    <InfiniteCalendar
                  displayOptions={{
                        layout: 'portrait',
                      showOverlay: false,
                      shouldHeaderAnimate: true,
                    }}
          Component={MultipleDatesCalendar}
          min={new Date(2018, 1, 18)} // Minimum month to render
          minDate={new Date(2018, 2, 18)} // Minimum selectable date
          width={585}
          height={500}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={theDates}
          max={new Date(2020, 1, 18)}
          />
          
          </Col>
          <Col size = "md-6">
          <Jumbotron>
          Dates for this Event:
          <br/>
          <List>
                 {this.state.dates.map(event => {
                   return (
                     <ListItem key={event._id}>
                      Dates: {event}
                    </ListItem>
                  );
                })}
          </List>          
          </Jumbotron>
          </Col>
          </Panel>
          
          </Row>
    <Row>
    <Col size = "md-6">
              <h1 className = "bg-primary">Created Events</h1>
            {this.state.yourEvents.length ? (
              <List>
                {this.state.yourEvents.map(event => {
                  return (
                      <ListItem key={event._id}>
                      <AddBtn data={event._id} onClick={this.onClick}> Check out Dates</AddBtn>
                      
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
               <h1 className = "bg-primary">Guest Events</h1>

             {this.state.guestEvents.length ? (
               <List>
                 {this.state.guestEvents.map(event => {
                   return (
                     <ListItem key={event._id}>
                     <AddBtn data={event._id} onClick={this.onClickGuest}> Check out Dates</AddBtn>
                         <strong>
                        <div>Creator: {event.creator.name}</div>
                           <div>Description:  {event.description}</div>
                           <div>Dates: {event.dates}</div>

                          {event.guests.map(r => (
                          <div key={r._id} >Guest : {r.guest.name}</div>
                        
                          ))}
                           <div>Event: {event.event}</div>
                         </strong>
                       
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
    <Footer/>
      </Container>
    )}
    </div>
    );
}
}
export default DashboardPage;
