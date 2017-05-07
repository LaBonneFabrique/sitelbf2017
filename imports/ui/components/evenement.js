import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button, Panel } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeEvenement } from '../../api/evenements/methods.js';
var moment = require('moment');


const handleRemoveEvenement = (evenementId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Pas de retour en arrière possible. Confirmation ?')) {
    removeEvenement.call({
      _id: evenementId,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Evénement effacé !', 'success');
      }
    });
  }
};

const setTitre = (chaine) => {
  const retour = "<h3>"+chaine+"</h3>";
  return retour;
};

export const Evenements = ({ evenement }) => (
  <Panel header={setTitre(evenement.titre)} key={ evenement._id }>
      { moment(evenement.start).format('dddd D MMMM YYYY') }
    </Panel>
  
  
);
