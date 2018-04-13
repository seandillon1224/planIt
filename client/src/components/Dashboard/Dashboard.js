import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'reactstrap';
import DatePicker from '../Calendar';
import {Row, Col, Container} from '../Grid';
import Events from '../../pages/CreateEvent';


const Dashboard = ({ secretData }) => (
  <Container>
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
  <Row>
  <Col size = "md-3"/>
  <Col size = "md-6">
  <DatePicker/>
  </Col>
  <Col size = 'md-3'/>
  </Row>
  <Row>
  
  <Col size = "md-12">
  <Events/>
  </Col>

  </Row>
  </Container>
  
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;