import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Evenements } from './evenement.js';

export const EvenementsList = ({ evenements }) => (
  evenements.length > 0 ? <ListGroup className="evenements-list">
    {evenements.map((doc) => (
      <Evenements key={ doc._id } evenement={ doc } />
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">L'agenda est vide...</Alert>
);

EvenementsList.propTypes = {
  evenements: React.PropTypes.array,
};