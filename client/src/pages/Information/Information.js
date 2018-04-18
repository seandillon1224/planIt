import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Panel from "../../components/Panel";
import Article from "../../components/Article";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import Header from '../../components/Header';

class Information extends Component {
  state = {
    articles: []
  };

  render() {
    return (
      <Container>
        <Header/>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>About Us</strong>
              </h1>
              <h2 className="text-center">
                PlanIt - Planning Made Easy
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Panel title="Lorem Ipsum">
            Davy Jones' Locker driver chantey red ensign ahoy keelhaul rope's end booty hail-shot lugger. Booty draught Brethren of the Coast bucko maroon hail-shot spike piracy jack dance the hempen jig. Strike colors galleon loaded to the gunwalls jack handsomely lugsail run a rig heave to Jolly Roger Cat o'nine tails.

Provost barque quarter tack Davy Jones' Locker Chain Shot long clothes Admiral of the Black weigh anchor six pounders. Buccaneer bowsprit fire in the hole pressgang Gold Road gangplank pirate dance the hempen jig sheet case shot. Handsomely pressgang run a rig hornswaggle Spanish Main scuppers barkadeer shrouds doubloon overhaul.

Lateen sail poop deck Spanish Main scallywag pressgang cog grapple yo-ho-ho skysail driver. Haul wind gaff blow the man down black jack list log main sheet wench hands Privateer. Maroon brig barkadeer jack pinnace salmagundi to go on account gibbet barque Arr.
            </Panel>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Information;
