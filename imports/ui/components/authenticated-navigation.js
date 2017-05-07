import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
//bascule materialize-ui
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
//import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
//inlinegrid
//import { Grid, Row, Cell } from 'react-inline-grid';
//muicss table
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

var FontAwesome = require('react-fontawesome');

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

const userName = () => {
  const user = Meteor.user();
  const nom = user && user.profile ? user.profile.nom : '';
  const prenom = user && user.profile ? user.profile.prenom : '';
  return user && nom!='' && prenom!=''? `${prenom} ${nom}`:'bib';//`${name.first} ${name.last}` : '';
};




export  class AuthenticatedNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      autorisation: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    const etatAutorisation = this.trouveAutorisations();
    this.setState({autorisation: etatAutorisation});
  }
  
  shouldComponentUpdate() {
    const etatAutorisation = this.trouveAutorisations();
    this.setState({autorisation: etatAutorisation});
    return true;
  }
  
  trouveAutorisations() {
     const user = Meteor.user();
  const isLocalAdmin = (role) => {
      return role==="admin";
    };

  const isLocalCollege = (role) => {
      return role==="college";
    };
  let autorisationAdmin = false;
  let autorisationCollege = false;
  
  if (user&&user.roles) {
  autorisationAdmin = user.roles.findIndex(isLocalAdmin)>-1?true:false;
  autorisationCollege = user.roles.findIndex(isLocalCollege)>-1?true:false;
  }
    const autorisation = autorisationAdmin||autorisationCollege;
    return autorisation;
  }
  
  handleChange(event, index, value) {
   this.setState({value});
  }
  
  handleLogout() {
    Meteor.logout(() => browserHistory.push('/'));
    } 
    
  render() {
    let agenda;
    let listeAdherents;
    let listeParticipants;
    
    if (this.state.autorisation) {

    
  agenda = <MenuItem 
              containerElement={<Link to="/agenda" />}
              linkButton={true}
              primaryText='Agenda' 
              leftIcon={
                <FontAwesome name='calendar' size="2x" />
              }
              />;
    
    listeAdherents =<MenuItem 
              containerElement={<Link to="/listeAdherents" />}
              linkButton={true}
              primaryText='Liste des adhérents' 
              leftIcon={
                <FontAwesome name='users' size="2x" />
              }
              />;
    listeParticipants = <MenuItem 
              containerElement={<Link to="/participants" />}
              linkButton={true}
              primaryText='Liste des participants' 
              leftIcon={
                <FontAwesome name='user-secret' size="2x" />
              }
              />
    };

    return(
    <Toolbar className="">
    <Container className="marginTop10">
    <Row >
    <Col xs="2" xs-offset="10">
          <IconMenu
            iconButtonElement={
              <FontAwesome name='gears' size="2x"/>
            }
          >
            <MenuItem
              containerElement={<Link to="/" />}
              linkButton={true}
              primaryText='Accueil'
              leftIcon={
                <FontAwesome name='home' size="2x" />
              }
            />
            <MenuItem 
              containerElement={<Link to="/pageAdherent" />}
              linkButton={true}
              primaryText='Tableau de bord' 
              leftIcon={
                <FontAwesome name='dashboard' size="2x" />
              }
              />
            {agenda}
            {listeAdherents}
            {listeParticipants}
            <MenuItem 
                onClick={ this.handleLogout }
                primaryText='Se déconnecter' 
                leftIcon={
                  <FontAwesome name='sign-out' size="2x" />
                }
                />
          </IconMenu>
          </Col></Row>
      </Container>
    </Toolbar>

      );
    
  }

}
