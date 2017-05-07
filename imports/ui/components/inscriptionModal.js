import React from 'react';
import handleInscription from '../../modules/inscription.js';
import FontAwesome from 'react-fontawesome';
//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//inlinegrid
//import { Grid, Row, Cell } from 'react-inline-grid';
//muicss table
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

const optionsGrid = {
  columns: 12,
  gutter: 16,
  margin: 0
};
//style formulaire
const styles = {
checkbox: {
  display:"inline-block",
  width: '30%',
  marginRight: '3%'
},
  centPourCent: {
    width: '100%',
    padding: '0px',
    margin: '0px'
  }
};

export class Inscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: true,
      donnees: {}
    };
    this.toggleChekboxService=this.toggleChekboxService.bind(this)
  }
  
  componentDidMount() {
    handleInscription({ component: this, type: this.props.type });
  }
  
  componentDidUpdate() {
    handleInscription({ component: this, type: this.props.type });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  toggleChekboxService(event, value) {
    var etat = !this.state.services;
    setTimeout(() =>this.setState ({services: etat}));
  }
  
  render() {
   
      const  renderTypeFormulaire =  this.state.services ?
      <div>
      <p>Choisissez l'un des services suivants pour vous inscrire :</p>
      <RadioButtonGroup name="service">
          <RadioButton
            value="loginWithFacebook"
            label="Facebook"
            style={styles.checkbox}
            uncheckedIcon={<FontAwesome name="facebook" size="2x"/>}
          />
          <RadioButton
            value="loginWithTwitter"
            label="Twitter"
            style={styles.checkbox}
            uncheckedIcon={<FontAwesome name="twitter" size="2x"/>}
          />
          <RadioButton
            value="loginWithGithub"
            label="Github"
            style={styles.checkbox}
            uncheckedIcon={<FontAwesome name="github" size="2x"/>}
          />
          
          </RadioButtonGroup>
     </div>
        : 
        <div>
        <Row>
          <Col xs="12">
        <TextField
            style={styles.centPourCent}
            type="password"
            ref="password"
            name="password"
            placeholder="Mot de passe"
            floatingLabelStyle={styles.floatingLabel}
          /></Col></Row>
          <Row>
          <Col xs="12">
        <TextField
            style={styles.centPourCent}
            type="password"
            ref="passwordVerif"
              name="passwordVerif"
              placeholder="Vérification du mot de passe"
            floatingLabelStyle={styles.floatingLabel}
          /></Col></Row>
         </div>;

    
    
    return (
        <Container >
        <form ref="inscription" className="inscription" onSubmit={ this.handleSubmit }>
          <Row>
          <Col md="6" xs="12">
          <TextField
                style={styles.centPourCent}
                type="text"
                ref="prenom"
                name="prenom"
                placeholder="Prénom"
              />
          </Col>
          <Col md="6" xs="12">
             <TextField
                style={styles.centPourCent}
                type="text"
                ref="nom"
                name="nom"
                placeholder="Nom"
              />
          </Col></Row>
        <Row><Col xs="12">
        <TextField
            style={styles.centPourCent}
            type="email"
            ref="emailAddress"
            name="emailAddress"
            placeholder="Adresse Mail"
          />
          </Col></Row>
          <Row><Col xs="12">
        <Checkbox
          label="Ne pas utiliser Facebook, Twitter ou Github"
          style={styles.centPourCent}
          onCheck={this.toggleChekboxService}
          ref="choix"
          name="choix"
        />
        </Col></Row>

          {renderTypeFormulaire}

          <Row><Col xs="12">
        <FlatButton
          type="submit"
          label="S'inscrire"
          labelPosition="before"
          primary={true}
          style={styles.button}
                  />
        </Col></Row>
        </form>
      </Container>


    );
  }
}
