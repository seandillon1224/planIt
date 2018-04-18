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
                <strong>(ReactJS) New York Times Article Scrubber</strong>
              </h1>
              <h2 className="text-center">
                Search for and save articles of interest.
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Panel title="Saved Articles" icon="download">
            </Panel>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Information;
