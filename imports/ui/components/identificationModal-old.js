import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, Form } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { Bert } from 'meteor/themeteorchef:bert';
import {handleLogin} from '../../modules/login';

export class Identification extends React.Component {
  constructor(props) {
    super(props);
  }
  
    componentDidMount() {
    handleLogin({ component: this});
  }
  
  componentDidUpdate() {
    handleLogin({ component: this });
  }
  
  handleSubmit(event) {
    event.preventDefault();
  }
  
  identificationService(dataSocialLogin) {
    const options = {};
     Meteor[ dataSocialLogin ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      } else {
        Bert.alert( 'Vous êtes maintenant identifié.', 'success' );
      }
     });
  }
  
  render() {
    return (
    <Modal.Body>
    <p>Pour vous connecter, entrez tout d'abord votre adresse mail :</p>
    
    <form  onSubmit={ this.handleSubmit } ref="login" className="login">
    
        <Row className="spaceTop">
      <Col componentClass={ControlLabel} sm={3} smOffset={1}>
        Adresse Mail
      </Col>
      <Col sm={6}>
        <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Adresse mail"
            />
      </Col>
    </Row>
        <hr />
    <p>Choisissez le service pour vous connecter</p>
    <Row>
    <Col smOffset={2} sm={8}>
     <ButtonToolbar bsSize="large">
      <Button bsSize="large" onClick={this.identificationService.bind(this, "loginWithFacebook")}><FontAwesome name="facebook" /> Facebook</Button>
      <Button bsSize="large" onClick={this.identificationService.bind(this, "loginWithTwitter")}><FontAwesome name="twitter" /> Twitter</Button>
      <Button bsSize="large" onClick={this.identificationService.bind(this, "loginWithGithub")}><FontAwesome name="github" /> Github</Button>
     </ButtonToolbar>
     </Col></Row>
    <hr />
    <p>Ou identifiez-vous en entrant votre mot de passe</p>

    <Row  className="spaceTop">
      <Col componentClass={ControlLabel} sm={3} smOffset={1}>
        Mot de passe
      </Col>
      <Col sm={6}>
        <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Mot de passe"
            />
      </Col>
    </Row>
<Row ><Col smOffset={6} sm={5} className="pull-right"> <a href="oubliMDP"><b>Mot de passe oublié ?</b></a></Col></Row>
    <Row className="spaceTop">
      <Col smOffset={4} sm={7}>
        <Button type="submit" >
          Connexion
        </Button>
      </Col>
    </Row>
  </form>

     </Modal.Body>
      );
  }
}