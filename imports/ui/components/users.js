import React from 'react';
import { FormControl } from 'react-bootstrap';
import {updateRoles} from '../../api/users/methods';
import { Bert } from 'meteor/themeteorchef:bert';
import {Roles} from 'meteor/alanning:roles';

export class User extends React.Component {
  constructor(props) {
    super(props);
    this.listeRole = this.listeRole.bind(this);
    this.handleChangeRole = this.handleChangeRole.bind(this);
  }
  
  handleChangeRole(event) {
    event.preventDefault();
    const userId=this.props.user._id;
    var newRoles = [String(event.target.value)];
    const messageOK="Role modifié";
    updateRoles.call({userId, newRoles}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
          Bert.alert(messageOK, 'success');
      }
    });
  }
  
  listeRole() {
    const userId=this.props.user._id;
    const loggedId = Meteor.userId();
    if(Roles.userIsInRole(loggedId, 'admin')&&userId!=loggedId) 
    {
      return (
        <FormControl 
          componentClass="select" 
          placeholder="Choisir"
          onChange={this.handleChangeRole}
          defaultValue={Roles.getRolesForUser(userId)[0]}
          >
        <option value="adherent">Adherent</option>
        <option value="college">College</option>
        <option value="admin">Administrateur</option>
      </FormControl>
      );} else {
        return (Roles.getRolesForUser(userId)[0]);
      }
  }
  
  render() {
    return(
        <tr >
    <td>{this.props.index}</td>
    <td>{this.props.user.profile.nom?this.props.user.profile.nom:'pas de nom !'}</td>
    <td>{this.props.user.profile.prenom?this.props.user.profile.prenom:'pas de prénom !'}</td>
    <td>{this.props.user.emails[0].address}</td>
    <td>{this.listeRole()}</td>
    <td>~</td>
  </tr>
      );
    
  }
  
}


User.propTypes = {
    user: React.PropTypes.object,
    index: React.PropTypes.number
};