import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Card, CardText } from 'reactstrap';
import {Button} from 'reactstrap';
import {Input} from 'reactstrap';
import UploadPage from '../../pages/Upload';


const SignUpForm = ({onSubmit,onChange,errors,user}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <Input
          placeholder="Name"
          name="name"
          onChange={onChange}
          value={user.name}
        />
      </div>

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
      <div>
        <UploadPage/>
      </div>

      <div className="button-line">
        <Button type="submit" label="Create New Account" />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
