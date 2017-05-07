import React from 'react';
import { Users } from '../../api/users/users.js';
//import { ListGroup, Alert, Row, Col, Table } from 'react-bootstrap';
//import {User} from './users.js';
//material-ui
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  carte:{
    margin: 20
  },
  header: {
    margin: 0,
    padding: 0,
    width: "100%"
  }
}

export class LesInscrits extends React.Component {
  constructor(props) {
    super();
  }
  
  render() {
        const { inscritsCreneau, listeInscrits, idCreneau, ...otherProps } = this.props
        console.log(otherProps)
        const self = this;
        let lesMembres=[];
        inscritsCreneau.map(function(membreId) {
        listeInscrits.map(function(inscrit) {
          inscrit.famille.map(function(membre) {
            if (membre._id==membreId) {
                const n=lesMembres.push(membre);
            }
          })
          
        })
        });
        const laListe = lesMembres.length>0 ? lesMembres.map(function(membre, index){
          //const striped = index%2==0 ? false:true;
          return <TableRow key={index} displayBorder={false} {...otherProps}>
                  {otherProps.children[0]} //afficher checkbox
                  <TableRowColumn>{membre.prenom}</TableRowColumn>
                  <TableRowColumn>{membre.nom}</TableRowColumn>
                </TableRow>
        }):<TableRow><TableRowColumn>Pas d'inscrit pour ce créneau</TableRowColumn></TableRow>;
  return(<div>{laListe}</div>)
  }
}

export class ListeParticipants extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    const subscriptionUsers = Meteor.subscribe('utilisateurs');
  }
  
  render() {
    const inscrits = Users.find(
      {
        famille: {
          $elemMatch: {
            inscriptions: this.props.evenement._id
          }
        }
      }
      ).fetch();
      

    const lesCreneaux = this.props.evenement.creneaux.map(function(creneau) 
    {
      const texte="Créneau "+creneau.horaire;
      
      const self = this;
        let lesMembres=[];
        creneau.inscrits.map(function(membreId) {
        inscrits.map(function(inscrit) {
          inscrit.famille.map(function(membre) {
            if (membre._id==membreId) {
                const n=lesMembres.push(membre);
            }
          })
          
        })
        });
        const laListe = lesMembres.length>0 ? lesMembres.map(function(membre, index){
          //const striped = index%2==0 ? false:true;
          return <TableRow key={index} displayBorder={false}>
                  <TableRowColumn>{membre.prenom}</TableRowColumn>
                  <TableRowColumn>{membre.nom}</TableRowColumn>
                </TableRow>
        }):<TableRow><TableRowColumn>Pas d'inscrit pour ce créneau</TableRowColumn></TableRow>;
      
      
      
      return(<Card style={styles.carte}>
        <CardTitle title={texte} />
        <CardText>
        <Table>
          <TableBody 
            showRowHover={true}
            displayRowCheckbox={false}
            stripedRows={false}>
            
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow style={styles.header}>
                  <TableHeaderColumn >Prénom</TableHeaderColumn>
                  <TableHeaderColumn >Nom</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            {laListe}
          </TableBody>
        </Table>
        </CardText>
        </Card>);
    }
    );
    return <div>{lesCreneaux}</div>;
  }
}

export class ParticipantsList extends React.Component {
    constructor(props) {
        super();
        this.state = {
          eveId:""
        };
        this.handleChange=this.handleChange.bind(this);
    }
    
    componentDidMount() {
      this.setState({eveId: this.props.evenements[0]._id})
    }
    
    handleChange(event, index, value) {
      this.setState({eveId: value});
    }
    
    render() {
      const self = this;
      const trouveEve = function(evenement) {
        return evenement._id=== self.state.eveId;
    };
      const evenement = this.props.evenements.find(trouveEve);
      const dropDownList = this.props.evenements.map(function(evenement) {
        return <MenuItem value={evenement._id} primaryText={evenement.titre} />;
      });
      const selectionEvenement = this.props.evenements.length > 0 ?
        <SelectField value={this.state.eveId} onChange={this.handleChange}>
          {dropDownList}
        </SelectField>
        :null;
      return (
        <div>
        <h3>Sélectionner un événement :</h3> {selectionEvenement}
        {evenement?<ListeParticipants evenement={evenement}/>:null}
        </div>
        );
    }

}


ParticipantsList.propTypes = {
  evenements: React.PropTypes.array
};