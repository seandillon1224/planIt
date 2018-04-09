
    import React, { PropTypes } from 'react';
    import axios from 'axios';
    import {Redirect} from 'react-router-dom';

    class UserForm extends React.Component {
      constructor() {
        super();
        this.state = {
          description: '',
          selectedFile: '',
        };
      }

      onChange = (e) => {
        const state = this.state;

        switch (e.target.name) {
          case 'selectedFile':
            state.selectedFile = e.target.files[0];
            break;
          default:
            state[e.target.name] = e.target.value;
        }

        this.setState(state);
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        axios.post('/', formData)
          .then((result) => {
            // access results...
          });
      }

      render() {
        const { description, selectedFile } = this.state;
        return (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
            />
            <input
              type="file"
              name="selectedFile"
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
          </form>
        );
      }
    }

    export default UserForm;