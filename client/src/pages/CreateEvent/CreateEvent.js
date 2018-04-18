import React, {Component} from 'react';
import Auth from '../../modules/Auth';
import Header from '../../components/Header';
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
import axios from "axios";

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
  event: "",
  guests: [],
  description: "",
  creator: JSON.parse(localStorage.getItem('usrname')).name,
  results:[],
  query: ''
  };    
  this.onClick = this.onClick.bind(this);
}

  
  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    // this.loadEvents();

  }

  componentDidUpdate() {
    // console.log(yourSelected)
    
      
  }


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
            .then(
              this.setState({
                event: "",
                guests: [],
                description: "",
                creator: JSON.parse(localStorage.getItem('usrname')).name,
                results:[],
                query: ''
              })


            )
            .catch(err => console.log(err));
        }

  };


  getInfo = () => {
    axios.get(`/api/users/${this.state.query}`)
      .then(({ data }) => {
        console.log(data)
        this.setState({
          results: data
        })
      })
  }

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    }, () => {

      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } else if (!this.state.query) {
      }
    })
  }

  onClick(e) {
    
    let Data=e.target.getAttribute('data')
    
    let guestData={guest: Data}

    console.log(guestData)
    
    this.setState({
      guests: [...this.state.guests, guestData]
    })

    console.log(this.state.guests)

    



  }


  render() {
    return (
      <Container fluid>
      <Header/>
      <form>
          {/* <div>{JSON.parse(localStorage.getItem('usrname')).name}</div> */}
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

          <Input
          placeholder="Search for Guest..."
          value={this.state.query}
          onChange={this.handleInputChange}
          name="query"
          />

        <ul>
          {this.state.results.map(r => (
        <li key={r._id}>         
        <p>name: {r.name}</p>
        <p>email: {r.email}</p>
        <AddBtn data={r._id} onClick={this.onClick}> Up</AddBtn>
        </li>
        ))}
        </ul>
          </Col>  
              
              <FormBtn
                disabled={!(this.state.event && this.state.guests)}
                onClick={this.handleFormSubmit}
              >
                Submit Event
              </FormBtn>
      </form>
      </Container>
    );
  }
}

export default Events;
