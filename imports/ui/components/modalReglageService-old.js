import React from 'react';
import {Modal, Col, Row, Checkbox, FormGroup, Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import $ from 'jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import {updateReglageService} from '../../api/users/methods.js';

export class ModalReglageService extends React.Component {
    constructor(props) {
    super();
    this.state = { showModal: false, verifFacebook: false, verifTwitter: false, verifGithub: false };
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEtatCheckboxes  = this.setEtatCheckboxes.bind(this);
    this.finReglage = this.finReglage.bind(this);
  }

componentDidMount() {
this.toggleModal();
this.setEtatCheckboxes();
}

toggleModal () {
    this.state.showModal? this.setState({showModal:false}) : this.setState({showModal:true});
}

handleSubmit(event) {
    event.preventDefault();
    var servicesLogin=[];
    const options = {};
    
    if ($("[name='Github']").is(":checked")) {
        servicesLogin.push("loginWithGithub");
    }
    
    if ($("[name='Facebook']").is(":checked")) {
        servicesLogin.push("loginWithFacebook");
    }
        /*
    if ($("[name='Twitter']").is(":checked")) {
        servicesLogin.push("loginWithTwitter");
    }
    
    servicesLogin.forEach(function (value) {
        Meteor[ value ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      }
    });
    });

        Meteor[ "loginWithTwitter" ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      } else {
          this.toggleModal();
      }
    });
    */
  }
  
setEtatCheckboxes() {
    const user=Meteor.user();
    
    if (user.services.github)
        this.setState({verifGithub: true});
    
    if (user.services.facebook)
        this.setState({verifFacebook: true});
    
    if (user.services.twitter)
        this.setState({verifTwitter: true});
}
  
disableCheckboxes(etat) {
 $("[name='Facebook']").prop("disabled",etat);
 $("[name='Twitter']").prop("disabled",etat);
 $("[name='Github']").prop("disabled",etat);
}
  
ajoutService(service) {
    const options={};
   this.disableCheckboxes(true);
    Meteor[ service ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      }
      
    this.disableCheckboxes(false)
    this.setEtatCheckboxes();
    });

}

finReglage() {
    const update = {reglageService: true};
    const userId = Meteor.userId();
    updateReglageService.call({userId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
    
    this.toggleModal();
}

    render () {
                return(
<Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Réglage des services d'identification</Modal.Title>
          </Modal.Header>
        <form ref="reglageService" className="reglageService" onSubmit={ this.handleSubmit }>  
        <Modal.Body>
            <p>Afin d'éviter les doublons dans votre compte, merci de cocher ci-dessous les services avec lesquels vous êtes susceptible de vous logger.</p>
         
            <FormGroup name="groupeCheckbox" ref="loginWithService">
            <Row>
       <Col xs={ 12 } sm={ 12 } md={ 4 }> 
      <Checkbox name="Facebook" value="loginWithFacebook" ref="Facebook" onClick={ this.ajoutService.bind(this,'loginWithFacebook')} checked={this.state.verifFacebook} disabled={this.state.verifFacebook}><FontAwesome name="facebook" /> Facebook</Checkbox>
      </Col>
      <Col xs={ 12 } sm={ 12 } md={ 4 }> 
      <Checkbox name="Twitter" value="loginWithTwitter" ref="Twitter" onClick={ this.ajoutService.bind(this,'loginWithTwitter')} checked={this.state.verifTwitter} disabled={this.state.verifTwitter}><FontAwesome name="twitter" /> Twitter</Checkbox>
      </Col>
      <Col xs={ 12 } sm={ 12 } md={ 4 }> 
      <Checkbox name="Github" value="loginWithGithub" ref="Github" onClick={ this.ajoutService.bind(this,'loginWithGithub')} checked={this.state.verifGithub} disabled={this.state.verifGithub}><FontAwesome name="github" /> Github</Checkbox>
      </Col>
      </Row>
      </FormGroup>
</Modal.Body>
<Modal.Footer>
        <Button bsStyle="primary" onClick={this.finReglage}>Terminé</Button>
</Modal.Footer>
       </form>

  </Modal>
            )
    }
}