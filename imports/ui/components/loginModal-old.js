import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';
import LoginWithServices from '../containers/loginWithServices';
import {Modal} from 'react-bootstrap';


export class LoginModal extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
    <Modal.Body>
           <Row>
           <Col xs={ 12 } sm={ 1 } md={ 1 }></Col>
          <Col xs={ 12 } sm={ 11 } md={ 11 }>
                   <h4>Utilisez l'un des services suivants pour vous identifier</h4>
          </Col>
    <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
      <Col xs={ 12 } sm={ 10 } md={ 10 }>

            <LoginWithServices />
  </Col>
          <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
    </Row>
    <Row>
    <Col xs={ 12 } sm={ 1 } md={ 1 }></Col>
          <Col xs={ 12 } sm={ 11 } md={ 11 }>
      <h4>Utilisez le formulaire ci-dessous</h4>
      <p>si vous ne voulez pas passer par des services externes.</p>
      </Col>
    <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
      <Col xs={ 12 } sm={ 6 } md={ 6 }>
    
        <form ref="login" className="login" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <ControlLabel>Adresse mail</ControlLabel>
            <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Adresse mail"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <span className="pull-left">Mot de passe</span>
              <Link className="pull-right" to="/recover-password" onClick={this.props.fermer}>Un oubli ?</Link>
            </ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Mot de passe"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success" className="pull-right">Connexion</Button>
        </form>
        </Col>
          <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
        </Row>
 </Modal.Body>
    )
  }
}
