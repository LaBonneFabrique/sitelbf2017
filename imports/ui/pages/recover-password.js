import React from 'react';

//import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '../../modules/recover-password';
//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
//couleur LBF
var couleurs = require('../themeLBF/couleurs');
//style formulaire
const styles = {
  bouton: {
    marginTop: '5px',
    marginRight: 5,
    color: 'white'
  },
  page: {
    padding: 10
  }
};
export class RecoverPassword extends React.Component {
  constructor(props) {
    super();
       this.mailExists=this.mailExists.bind(this);
   this.state={
     foundUser: false,
     foundUserServices:{},
   };
   Meteor.subscribe("utilisateurs");
  }
  
  componentDidMount() {
   //handleRecoverPassword({ component: this });
  }
  
  componentDidUpdate() {
    handleRecoverPassword({ component: this, userFound: this.state.foundUser, services: this.state.foundUserServices });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  mailExists(event) {
  const emailAddress = event.target.value;
  const userExists = Meteor.users.findOne({ 'emails.address': emailAddress });
  if(userExists) {
       this.setState({foundUserServices: userExists.services, foundUser:true});
  } else {this.setState({foundUser: false})}
}
  
  render() {
    return  <form ref="recoverPassword" className="recover-password" onSubmit={ this.handleSubmit }>
        <h4 className="page-header">Ré initialisation du mot de passe.</h4>
        <p>
          Entrez votre adresse mail ci-dessous. Vous recevrez un mail vous permettant de ré-initialiser votre mot de passe.
        </p>

            <TextField
                type="email"
                ref="emailAddressRecover"
                name="emailAddressRecover"
                placeholder="Adresse Mail"
                className="pull-left"
                onBlur={this.mailExists}
                />
            <FlatButton 
                label="Envoyer le lien" 
                type="submit"
                className="pull-left"
                backgroundColor={couleurs.jardin}
                hoverColor={couleurs.grisLBF}
                style={styles.bouton}
              />
        </form>;
  }
} 
