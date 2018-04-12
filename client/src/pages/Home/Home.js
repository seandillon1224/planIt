

import React, {Component} from 'react';
import { Card, CardTitle } from 'reactstrap';
import Auth from '../../modules/Auth';
import DashboardPage from '../../pages/DashboardPage';
import Header from '../../components/Header'
import {Row, Col, Container} from '../../components/Grid'
import Jumbotron from "../../components/Jumbotron";
import Panel from "../../components/Panel";
import Footer from "../../components/Footer";

const loggedIn = Auth.isUserAuthenticated();


class Home extends React.Component {

  render() {

    return (
      <Container>
        <Header/>
        <Jumbotron>
            <h1 className="text-center">
               <strong>PlanIt</strong>
             </h1>
            <h2 className="text-center">
              The World's Number One Planning App
            </h2>
         </Jumbotron>
        <Row>
          <Col size = "md-12">
{Auth.isUserAuthenticated() == false ? (
          
  <Panel>
    Login to Monitor Events
  </Panel>):
  (
    <DashboardPage/>
  )}

          </Col>
        </Row>
    
        
      </Container>  
    
    )
  }  
}

// render() {
//   return (
//     <Container>
//       <Row>
//         <Col size="md-12">
//           <Jumbotron>
//             <h1 className="text-center">
//               <strong>(ReactJS) New York Times Article Scrubber</strong>
//             </h1>
//             <h2 className="text-center">
//               Search for and save articles of interest.
//             </h2>
//           </Jumbotron>
//         </Col>
//       </Row>
//       <Row>
//         <Col size="md-12">
//           <Panel title="Saved Articles" icon="download">
//             {this.state.articles.length ? (
//               <List>
//                 {this.state.articles.map(article => (
//                   <Article
//                     key={article._id}
//                     _id={article._id}
//                     title={article.title}
//                     url={article.url}
//                     date={article.date}
//                     handleClick={this.handleArticleDelete}
//                     buttonText="Delete Article"
//                     saved
//                   />
//                 ))}
//               </List>
//             ) : (
//               <h2 className="text-center">No Saved Articles</h2>
//             )}
//           </Panel>
//         </Col>
//       </Row>
//       <Footer />
//     </Container>
//   );
// }
// }

export default Home;