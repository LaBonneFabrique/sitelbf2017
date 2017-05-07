import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {handleAjoutMembre} from '../../modules/handleAjoutMembre';
var ReactDOM = require('react-dom');
//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  textField: {
    width: '28%',
    margin: 0,
    marginLeft: '2%',
    marginRight: '2%',
    padding: 0,
    borderWidth: 1
  } ,
  noPaddingMargin: {
      padding: 0,
      margin: 0
  },
  droit: {
    float: 'right'
  }
};

export class AjoutMembre  extends React.Component {
    constructor(props) {
        super();
        //this.handleAjoutMembre=this.handleAjoutMembre.bind(this);
    }
    
  componentDidMount() {
    handleAjoutMembre({ component: this });
    ReactDOM.findDOMNode(this.refs.prenom).focus();
  }
  
  componentDidUpdate() {
    handleAjoutMembre({ component: this });
  }
  submitAjoutMembre(e) {
      e.preventDefault();
  }
  
  render() {
      return (

          <form className="padding" onSubmit={this.submitAjoutMembre} ref="formAjoutMembre">
            <h4 style={styles.noPaddingMargin}>Ajouter un membre à la famille</h4>
            <TextField
              style={styles.textField}
              hintText="Prénom"
              type="text"
              ref="prenom"
              name="prenom"
            />
            <TextField
              style={styles.textField}
              hintText="Nom"
              type="text"
              ref="nom"
              name="nom"
            />
            <TextField
              style={styles.textField}
              hintText="Date de naissance si enfant, jj/mm/aa"
              type="text"
              ref="age"
              name="age"
            />
        <FlatButton
                label="Ajouter"
                secondary={true}
                type="submit"
                style={styles.droit}
            />
        <FlatButton
                label="Annuler"
                secondary={true}
                onTouchTap = {this.props.fermer}
                style={styles.droit}
            />


          </form>
          );
  }
}