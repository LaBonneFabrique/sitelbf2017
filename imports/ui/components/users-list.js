import React from 'react';
import { ListGroup, Alert, Row, Col, Table } from 'react-bootstrap';
import {User} from './users.js';

export const UsersList = ({ users }) => (
  users.length > 0 ? 
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th><h4>#</h4></th>
        <th><h4>Nom</h4></th>
        <th><h4>Prénom</h4></th>
        <th><h4>Adresse mail</h4></th>
        <th><h4>Role</h4></th>
        <th><h4>Actions</h4></th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => (
      <User key={ user._id } user={ user } index={index} />
    ))}
    </tbody>
  </Table> :   <Alert bsStyle="warning">Pas d'adhérent pour l'instant.</Alert>
);

UsersList.propTypes = {
  users: React.PropTypes.array,
};