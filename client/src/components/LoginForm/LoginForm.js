import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import { Card, CardText } from 'reactstrap';
import {Button} from 'reactstrap';
import {Input} from 'reactstrap';


const LoginForm = ({onSubmit,onChange,errors,successMessage,user}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2> 

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <Input
          placeholder="Email"
          name="email"
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <Input
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <Button type="submit" label="Log in" />
      </div>

      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
