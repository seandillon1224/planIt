import React, { Component } from 'react'
import axios from 'axios'

import { Input, TextArea, FormBtn } from "../../components/Form";
// import Suggestions from './Suggestions'


class Search extends Component {
  state = {
    query: '',
    results: [],
    guests: []
  }

  getInfo = () => {
    axios.get(`/api/users/${this.state.query}`)
      .then(({ data }) => {
        console.log(data)
        this.setState({
          results: data
        })
      })
  }

  handleInputChangez = event => {
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


 
  render() {
    return (
      
      


      <form>
        <Input
          placeholder="Search for..."
          value={this.state.event}
          onChange={this.handleInputChangez}
          name="query"
        />

        <ul>
          {this.state.results.map(r => (
        <li key={r._id}>
          {r.name} --  {r.email}
      
          </li>
        ))}
        </ul>
      
      </form>
    )
  }
}

export default Search


