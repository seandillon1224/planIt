import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'reactstrap';
import DatePicker from '../Calendar';
import {Row, Col, Container} from '../Grid';
import Events from '../../pages/CreateEvent';
import ChatContainer from '../EventChat/chats/ChatContainer';


const Dashboard = ({ secretData }) => (
  <Container>
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
 
  <ChatContainer/>

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