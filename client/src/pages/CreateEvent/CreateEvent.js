import React, {Component} from 'react';
import Auth from '../../modules/Auth';
import {Col, Row, Container} from '../../components/Grid';
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import AddBtn from "../../components/AddBtn";
import GuestSearch from "../../components/GuestSearch";
import API from "../../utils/API";
import InfiniteCalendar, {
  Calendar,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

const MultipleDatesCalendar = withMultipleDates(Calendar);

let yourSelected = []

function defaultMultipleDateInterpolation(date, selected) {
  const selectedMap = selected.map(date => format(date, 'YYYY-MM-DD'));
  const index = selectedMap.indexOf(format(date, 'YYYY-MM-DD'));
  yourSelected = selectedMap;
  

  return (index === -1)
    ? [...selected, date]
    : [...selected.slice(0, index), ...selected.slice(index+1)];
}
class Events extends Component {
constructor(props) {
  super(props);
  this.state = {
  yourEvents: [],
  event: "",
  guests: [],
  description: "",
  creator: JSON.parse(localStorage.getItem('usrname')).name,
  };    
}

  
  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadEvents();

  }

  componentDidUpdate() {
    console.log(yourSelected)
    
      
  }

  loadEvents = () => {
    API.getEvents()
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

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault()
    console.log(this.state.dates)
        if (this.state.event && this.state.guests) {
          API.saveEvent({
            creator: this.state.creator,
            event: this.state.event,
            guests: this.state.guests,
            description: this.state.description,
            dates: yourSelected
          })
            .then(res => this.loadEvents())
            .catch(err => console.log(err));
        }

  };

  render() {
    return (
      <Container fluid>
      <form>
          <div>{JSON.parse(localStorage.getItem('usrname')).name}</div>
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
selected={[new Date()]}
/>
</Col>
            <Col size = "md-3">
            </Col>
          </Row>
<Col size = "md-12">
          <GuestSearch/>

          <Input
                value={this.state.guests}
                onChange={this.handleInputChange}
                name="guests"
                placeholder="Guests"
              />

         <Input
                value={this.state.event}
                onChange={this.handleInputChange}
                name="event"
                placeholder="Event"
              />
          <Input
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description"
              />
          </Col>  
              
              <FormBtn
                disabled={!(this.state.event && this.state.guests)}
                onClick={this.handleFormSubmit}
              >
                Submit Event
              </FormBtn>
      </form>
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

export default Events;
