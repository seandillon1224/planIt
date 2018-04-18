import React, {Component} from 'react';
import {Col, Row, Container} from '../../components/Grid';
import { List, ListItem } from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from '../../components/AddBtn';
import API from "../../utils/API";
import Header from '../../components/Header';
// import Layout from "../../components/EventChat/Layout";
import InfiniteCalendar, {
    Calendar,
    defaultMultipleDateInterpolation,
    withMultipleDates,
  } from 'react-infinite-calendar';
  import 'react-infinite-calendar/styles.css';
  import format from 'date-fns/format';
  import parse from 'date-fns/parse';
  import axios from "axios";
  import Auth from '../../modules/Auth';
  
  const MultipleDatesCalendar = withMultipleDates(Calendar);
  
  let theDates = [new Date()]


class EventDetails extends Component {
constructor(props) {
  super(props);
  this.state = {
  yourEvents: [],
  guestEvents: [],
  results: [],
  dates: []
  };    
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

onClick = (e) => {
  this.getInfo()
    
  let Data=e.target.getAttribute('data')
  
  let guestData={guest: Data}

  const mappedData = this.state.yourEvents.filter(x => x._id === guestData.guest)
  const mappedDates = mappedData.dates
  console.log(mappedData[0].dates)
  theDates=mappedData[0].dates

}

  
  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    // this.loadEvents();
    this.getInfo()
    // this.something()
    
    // this.loadEvents(results._id)
  
  }

  componentDidUpdate() {
   
    // const selectedMap = this.state.yourEvents.dates.map(date => format(date, 'YYYY-MM-DD'));
    
    // console.log(this.state.yourEvents)
    // let dated = []
    // const dateArray = this.state.yourEvents.map(mapped => dated.push(mapped.dates))
    // console.log(dated)
    // console.log(selectedMap)
    
      
  }
  // loadEvents = id => {
  //   API.getUserEvents(id)
  //     .then(res =>
  //       this.setState({ yourEvents: res.data })
        
  //     )
  //     .catch(err => console.log(err));
  // };

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
            <Col size = "md-3">
            </Col>
            <Col size = "md-6">
            
                    <InfiniteCalendar
                  displayOptions={{
                        layout: 'portrait',
                      showOverlay: false,
                      shouldHeaderAnimate: true,
                    }}
          Component={MultipleDatesCalendar}
          width={585}
          height={500}
          interpolateSelection={defaultMultipleDateInterpolation}
          selected={theDates}
          />
          </Col>
            <Col size = "md-3">
            </Col>
          </Row>
    <Row>
    <Col size = "md-12">
    <Jumbotron>
    {/* <img className="img-responsive" src={"C:/Users/seand/Desktop/planit6/planIt/routes\uploads\funny-Earth-Day-happy-face-space1.jpg"} alt="logo"/> */}
    <h1>Created Events</h1>
            </Jumbotron>
            {this.state.yourEvents.length ? (
              <List>
                {this.state.yourEvents.map(event => {
                  return (
                      <ListItem key={event._id}>
                      <AddBtn data={event._id} onClick={this.onClick}> Check out Dates</AddBtn>
                       <a href={"/event/" + event._id}>
                         <strong>
                        <div>Creator: {event.creator.name}</div>
                           <div>Description:  {event.description}</div>
                           <div>Dates: {event.dates}</div>

                          {event.guests.map(r => (
                          <div key={r._id} >Guest : {r.guest.name}
                          </div>
                        
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
    </Row>
      </Container>
    );
  }
}

export default EventDetails;
