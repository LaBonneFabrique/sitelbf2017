import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import {Random} from 'meteor/random';
//import {FormGroup, ControlLabel, FormControl, Button, ButtonToolbar} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import {insertEvenement, updateEvenement, removeEvenement} from '../../api/evenements/methods.js';
//import { getInputValue } from '../../modules/get-input-value';
import CreateDropzone from '../containers/dropzone.js';
import ListeImagesEvenement from '../containers/listeImagesEvenement';

//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
//inlinegrid
//import { Grid, Row, Cell } from 'react-inline-grid';
//muicss table
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
//import couleur LBF
var couleurs = require('../themeLBF/couleurs');

var FontAwesome = require('react-fontawesome');
var moment = require('moment');
moment.locale('fr');

const optionsGrid = {
  columns: 12,
  gutter: 20,
  margin: 0
};

const styles = {
  floatingLabel: {
    margin: '0px',
    padding: '0px',
  },
  marginTop5: {
    marginTop: '5px'
  },
  marginTop10: {
    marginTop: '10px'
  },
 marginTop15: {
    marginTop: '15px'
  },
  centPourCent: {
    width: '100%',
    padding: '0px',
    margin: '0px'
  },
  border: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    padding: '0px',
    margin: '0px'
  },
  borderTextArea: {
    borderStyle: 'dashed',
    borderColor: 'rgb(92,92,92)',
    borderWidth: '1px'
  },
  noMargin: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    padding: '0px',
    margin: '0px'
  },
  blanc: {
    color: 'white',
    width: '100%', 
    margin: '5px'
  }
};

var ListeCreneaux = React.createClass(
  {
    handleClickMoins: function (i) {
      this.props.siRetraitCreneau(i);
    },
    handleClickPlus: function () {
      this.props.siAjoutCreneau();
    },
    handleChangeCreneau: function () {
      var lesNouveauxCreneaux=[];
      var totalPlaces=0;
      const self=this;
      this.props.creneaux.map(function(creneau, index) {
        const refId = creneau._id;
        const refHoraire = 'horaire'+index;
        const refPlaces = 'places'+index;
        const horaires=self.refs[refHoraire].getValue();
        const places = Number(self.refs[refPlaces].getValue());
        totalPlaces += places;
        const inscrits = creneau.inscrits;
        lesNouveauxCreneaux.push({_id: refId, horaire: horaires, places: places, inscrits: inscrits });
      });
      this.props.siChangeCreneau(lesNouveauxCreneaux, totalPlaces);
    },
    render: function()  {

    var self = this;
    var liste = this.props.creneaux.map(function(creneau, index) {
    const refHoraire = 'horaire'+index;
    const refPlaces = 'places'+index;
    if(index>=1) {
       var bouton = <Col xs="1" md="1">
          <FlatButton onClick={() => self.handleClickMoins(index)}><FontAwesome name='minus' /></FlatButton>
        </Col>;
     } else {
       var bouton = <Col xs="12" md="1">
          <FlatButton onClick={() => self.handleClickPlus()}><FontAwesome name='plus' /></FlatButton>
        </Col>;
     }
      return (
      <Row key={index}>
      <Col xs="12" md="3">
          <TextField
            style={styles.centPourCent}
            type='text'
            name='creneauHoraire'
            defaultValue={creneau.horaire} 
            key = 'horaire-{index}'
            ref = {refHoraire}
            onBlur = {self.handleChangeCreneau}
            />
      </Col>
        <Col xs="12" md="2">
          <TextField
            style={styles.centPourCent}
            type='text' 
            defaultValue={creneau.places} 
            key = 'places-{index}'
            ref= {refPlaces}
            name={refPlaces}
            onChange = {self.handleChangeCreneau}
            />
      </Col>
        <Col xs="12" md="2">
          <TextField
            style={styles.centPourCent}
            type='text'
            defaultValue={creneau.inscrits.length} 
            key = 'inscrits-{index}'
            ref='inscrits-{index}'
            name='inscrits-{index}'
            onChange = {self.changeCreneau}
            disabled
            />
      </Col>
    
      {bouton}
      
      </Row>

        );
      
    });

    return (
      <div>
        {liste}
      </div>
      );
    }
  });
  
export const FormulaireEvenement = React.createClass({
getInitialState() {
  var journee =this.props.evenement.allDay;
  var nbTotalPlaces=0;
      if (typeof this.props.evenement.allDay != 'undefined'&&!this.props.evenement.allDay) {
        this.props.evenement.creneaux.map(function(creneau) {
          nbTotalPlaces+=creneau.places;
        }
          );
      }
      if (this.props.evenement.allDay) {
          nbTotalPlaces+=this.props.evenement.nbTotalPlaces;
      }
      if (typeof this.props.evenement.allDay == 'undefined') 
        journee = false;
      
     return {
     creneaux: this.props.evenement.creneaux,
     journee: journee,
     nbTotalPlaces: nbTotalPlaces,
     titreEve: this.props.evenement.titre,
     start:  this.props.evenement.start,
     jours: this.props.evenement.jours,
     inscription: this.props.evenement.inscription,
     par: this.props.evenement.par,
     choixImage:this.props.evenement.lienImage,
     frequence: this.props.evenement.frequence,
     nbSeances: this.props.evenement.nbSeances,
     publie: this.props.evenement.publie
    };
  },
  
componentDidMount() {
},
  
onClic: function () {
  this.handleAjoutEve(event);

},

handleAjoutEvePublie: function() {
  this.setState({publie:true}, () => {this.handleAjoutEve(event);});

},
handleAjoutEveBrouillon: function() {
  this.setState({publie:false}, () => {this.handleAjoutEve(event);});
  
},


handleAjoutEve: function(event) {
  let nbJours = 1;
  const titre = this.refs.titreEve.getValue();
  if (this.state.journee) {
    nbJours = Number(this.refs.nbJours.getValue());
  }
  const lienBilleterie = this.refs.lienBilleterie.getValue();

  const type = this.state.par;
  const lieu = this.refs.lieu.getValue();
  const description = this.refs.descriptionEve.getValue();
  var nbTotalPlaces = 0;
  if (this.state.inscription&&this.state.journee)
    nbTotalPlaces = this.refs.nbTotalPlaces.getValue();
  if(!this.state.journee) {
        this.state.creneaux.map(function(creneau) {
          nbTotalPlaces+=creneau.places;
        }
          );
  }
  
  const allDay = this.state.journee;
  const inscription = this.state.inscription;
  const lienImage = this.state.choixImage;
  const frequence = this.state.frequence;
  const nbSeances = Number(this.refs.nbSeances.getValue());
  const publie = this.state.publie;
  console.log("publication : "+publie)

  
  let start = moment().toDate();
  let end = moment().toDate();
  
  const creneaux = this.state.creneaux;
  nbTotalPlaces = Number(nbTotalPlaces);
  switch (this.props.operation) {
    case 'add':
      start = this.state.start.toDate();
      const duree = moment.duration({'days' : nbJours});
      end = allDay ? moment(this.state.start).add(duree).toDate() : start;
      
      let evenement;
      if (lienBilleterie=="") {
        evenement = {titre, start, end, allDay, nbJours, nbTotalPlaces, type, lieu, description, creneaux, inscription, lienImage, frequence, nbSeances, publie,};
        } else {
          evenement = {titre, start, end, allDay, nbJours, nbTotalPlaces, type, lieu, description, creneaux, inscription, lienImage, lienBilleterie, frequence, nbSeances, publie,};
        }
        
      insertEvenement.call(evenement, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Evénement créé avec succès.', 'success');
              this.props.fermer();
            }
        });
      break;
    case 'edit':
      start = this.props.evenement.start;
      end = this.props.evenement.end;
      let evenementId = this.props.eveId;
        let update;
        if (lienBilleterie=="") {
          update = {titre, start, end, allDay, nbJours, nbTotalPlaces, type, lieu, description, creneaux, inscription, lienImage, frequence, nbSeances, publie,};
        } else {
          update = {titre, start, end, allDay, nbJours, nbTotalPlaces, type, lieu, description, creneaux, inscription, lienImage, lienBilleterie, frequence, nbSeances, publie,};
        }
      updateEvenement.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Evénement modifié avec succès.', 'success');
          this.props.fermer();
      }
    });
    
      break;
    default:
      break;
  }

},

handleChangeForm: function(e, nomState) {
  switch (nomState) {
    case "titreEve": 
    this.setState({ titreEve: e.target.value });
    break;
    default:
      break;
  }

},
  
calculPlaces: function(listeCreneaux) {
    var nbPlaces = 0
    listeCreneaux.forEach(function(creneau) {
      nbPlaces=nbPlaces+creneau.places;
    })

    return nbPlaces;
  },

handleRetraitCreneau: function(i) {
  var listeCreneaux =this.state.creneaux;
  var creneauRetire = listeCreneaux.splice(i,1);
  var nbPlaces = this.calculPlaces(listeCreneaux)
  this.setState({creneaux:listeCreneaux, journee: this.state.journee, totalPlaces: nbPlaces});
  },
  
handleAjoutCreneau: function() {
    var placeRandom = Math.floor((Math.random() * 10) + 1);
    var listeCreneaux =this.state.creneaux;
    var creneauId = Random.id();
    var nbCreneaux = listeCreneaux.push({_id: creneauId, horaire: "14h01-18h00",
                places: placeRandom,
                inscrits: []});
    var nbPlaces = this.calculPlaces(listeCreneaux);
    this.setState({creneaux:listeCreneaux, journee: this.state.journee, totalPlaces: nbPlaces});
  },
  
checkBoxChangedJournee: function() {
    var change=true;
    this.state.journee?change=false:change=true;
    setTimeout(() => this.setState({journee: change}));
    //this.setState({journee: change}, function(){});
  },
  
checkBoxChangedInscription: function() {
    var change=true;
    change = this.state.inscription?false:true;
     setTimeout(() =>this.setState({ inscription: change}));
  },
  
remove: function() {
  const _id = this.props.evenement._id;
  removeEvenement.call({_id}, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('L\'événement a été effacé.', 'success');
              this.props.fermer();
            }
        });
},

handleChangeCreneau: function(lesCreneaux, nbPlaces) {
this.setState({creneaux: lesCreneaux}, function() {});
this.setState({nbTotalPlaces: nbPlaces});
$('[name="nbTotalPlaces"]').val(nbPlaces);
},

handleChangePar: function(event, index, value) {
this.setState({par: value});
},

handleChangeFrequence: function(event, index, value) {
this.setState({frequence: value});
},

retourChoix: function(id) {
  this.setState({choixImage: id});
},
  
render: function() {
  console.log(this.state.publie)
    var metaImage = {structure: this.state.par, utilisation: 'accueil'};
    let affichageCreneaux;
   if(!this.state.journee) {
     affichageCreneaux =     
      <div>
      <Row className="spaceTop10">
      <Col xs="2" md="3">
        <b>Créneau</b>
      </Col>
      <Col md="2">
        <b>Places</b>
      </Col>
      <Col xs="12" md="2">
        <b>Inscrits</b>
      </Col>
      </Row>
        <ListeCreneaux 
          creneaux={this.state.creneaux} 
          siRetraitCreneau={this.handleRetraitCreneau} 
          siAjoutCreneau={this.handleAjoutCreneau} 
          siChangeCreneau={this.handleChangeCreneau}
        />
        </div>;
   } else if (this.state.inscription) {
     affichageCreneaux = <Row >
          <Col xs="12" md="5">
       <TextField
          style={styles.centPourCent}
            type="text"
            ref="nbJours"
            name="nbJours"
            defaultValue={this.props.evenement.jours}
            disabled={!this.state.journee}
            floatingLabelText="Nb de jour(s)"
          />
        </Col>
        <Col xs="12" md="5" md-offset="2">
        <TextField
            style={styles.centPourCent}
            type="text"
            ref="nbTotalPlaces"
            name="nbTotalPlaces"
            defaultValue={this.state.nbTotalPlaces}
            floatingLabelStyle={styles.floatingLabel}
            floatingLabelText="Nb de places"
          /></Col></Row>;
   } else{
     affichageCreneaux = <Row >
          <Col xs="12" md="5">
       <TextField
          style={styles.centPourCent}
            type="text"
            ref="nbJours"
            name="nbJours"
            defaultValue={this.props.evenement.jours}
            disabled={!this.state.journee}
            floatingLabelText="Nb de jour(s)"
          />
        </Col></Row>;
   }
   let boutonEnvoie;
    switch(this.props.operation) {
       case 'add':
         boutonEnvoie = 
              <Row >
              <Col xs="3" xs-offset="2">
                <FlatButton
                  label="Annuler"
                  labelPosition="after"
                  backgroundColor={couleurs.atelier}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.props.fermer}
                  icon={
                    <FontIcon
                        className="fa fa-ban"
                      />}
                />
                </Col>
                           <Col xs="3">
                  <FlatButton
                  label="Brouillon"
                  labelPosition="after"
                  backgroundColor={couleurs.coworking}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.handleAjoutEveBrouillon}
                  icon={
                    <FontIcon
                        className="fa fa-pencil-square-o"
                      />}
                />
              </Col>
              <Col xs="4">
                  <FlatButton
                  label="Créer & Publier"
                  labelPosition="after"
                  backgroundColor={couleurs.jardin}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.handleAjoutEvePublie}
                  icon={
                    <FontIcon
                        className="fa fa-pencil-square-o"
                      />}
                />
              </Col>
              </Row>;
         break;
      case 'edit':
          boutonEnvoie = 
              <Row is="nospace">
              <Col xs="3" xs-offset="0">
                    <FlatButton
                        label="Annuler"
                        labelPosition="after"
                        backgroundColor={couleurs.atelier}
                        hoverColor={couleurs.grisLBF}
                        style={styles.blanc}
                        onClick={this.props.fermer}
                        icon={
                          <FontIcon
                              className="fa fa-ban"
                            />}
                      />
              </Col>
              <Col xs="3">
                <FlatButton
                  label="Effacer"
                  labelPosition="after"
                  backgroundColor={couleurs.brasserie}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.remove}
                  icon={
                    <FontIcon
                        className="fa fa-trash-o"
                      />}
                />
              </Col>
              <Col xs="3">
                  <FlatButton
                  label="Brouillon"
                  labelPosition="after"
                  backgroundColor={couleurs.coworking}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.handleAjoutEveBrouillon}
                  icon={
                    <FontIcon
                        className="fa fa-pencil-square-o"
                      />}
                />
              </Col>
              <Col xs="3">
                  <FlatButton
                  label="Publier"
                  labelPosition="after"
                  backgroundColor={couleurs.jardin}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.handleAjoutEvePublie}
                  icon={
                    <FontIcon
                        className="fa fa-pencil-square-o"
                      />}
                />
              </Col>
              </Row>;
        break;
     }

   
    return (

     <form className="noSpace">
      <Container  fluid={true}>
      <Row>
      <Col xs="12" md="7">
       <TextField
            style={styles.centPourCent}
            type="text"
            ref="titreEve"
            name="titreEve"
            defaultValue={this.props.evenement.titre}
            placeholder="Titre de l'événement"
            floatingLabelText="Titre"
            floatingLabelStyle={styles.floatingLabel}
          />
      </Col>
      <Col xs="12" md="5">
        <SelectField 
          style={styles.centPourCent}
          value={this.state.par} 
          onChange={this.handleChangePar} 
          floatingLabelText="Proposé par"
          floatingLabelStyle={styles.floatingLabel}
          ref="structure">
          <MenuItem value={"La-Bonne-Fabrique"} primaryText="La Bonne Fabrique" />
          <MenuItem value={"Le-Coworking"} primaryText="L'espace coworking" />
          <MenuItem value={"La-brasserie"} primaryText="La brasserie" />
          <MenuItem value={"La-Salle-des-Machines"} primaryText="La Salle des Machines" />
          <MenuItem value={"Autres"} primaryText="Autres" />
        </SelectField>
        </Col>
      </Row>
        <Row>
        <Col xs="12" md="7">
       <TextField
          style={styles.centPourCent}
            type="text"
            ref="lieu"
            name="lieu"
            defaultValue={this.props.evenement.lieu}
            placeholder="Lieu où se tient l'événement"
            floatingLabelText="Lieu"
            floatingLabelStyle={styles.floatingLabel}
          />
        </Col>
        <Col xs ="12" md="5">
          <Checkbox
          style={styles.marginTop15}
            label="sur inscription ?"
            labelPosition="right"
            id="besoinInscription" 
            onCheck={this.checkBoxChangedInscription}
            checked={this.state.inscription}
          />
        </Col>
        </Row>
        <Row>
        <Col xs="12" md="5">
        <SelectField 
          style={styles.centPourCent}
          value={this.state.frequence} 
          onChange={this.handleChangeFrequence} 
          floatingLabelText="Fréquence"
          floatingLabelStyle={styles.floatingLabel}
          ref="frequence">
          <MenuItem value={"une-fois"} primaryText="une fois" />
          <MenuItem value={"hebdomadaire"} primaryText="hebdomadaire" />
          <MenuItem value={"bimensuelle"} primaryText="bimensuelle" />
        </SelectField>
        </Col>
                <Col xs="12" md="7">
       <TextField
          style={styles.centPourCent}
            type="text"
            ref="nbSeances"
            name="nbSeances"
            defaultValue={this.props.evenement.nbSeances}
            placeholder="Nombre de séances"
            floatingLabelText="Nombre de séances"
            floatingLabelStyle={styles.floatingLabel}
          />
        </Col>
        </Row>
        <Row className="spaceTop10">
        <Col xs="12" md="5">
          <Checkbox
            label="Journée(s) entière(s) ?"
            labelPosition="left"
            id="journee"
            onCheck={this.checkBoxChangedJournee}
            style={styles.marginTop10}
            checked = {this.state.journee}
          />
        </Col>

      </Row>
      {affichageCreneaux}
      
            <Row>
      <Col xs="12" md="12">
       <TextField
            style={styles.centPourCent}
            type="text"
            ref="lienBilleterie"
            name="lienBilleterie"
            defaultValue={this.props.evenement.lienBilleterie}
            floatingLabelText="Lien vers la billeterie"
            floatingLabelStyle={styles.floatingLabel}
          />
      </Col></Row>
      
      <Row>
            <Col xs="12" md="12">
        <TextField
          style={styles.centPourCent}
            type="text"
            ref="descriptionEve"
            name="descriptionEve"
            multiLine={true}
            rows={3}
            rowsMax={5}
            floatingLabelText="description"
            floatingLabelFixed={true}
            textareaStyle={styles.borderTextArea}
            defaultValue={this.props.evenement.description}
          />

      </Col>
      </Row>
      <Row>
      <Col xs="12" md="4" >
        <CreateDropzone meta={metaImage}/>
      </Col>
      <Col xs="12" md="6">
      <ListeImagesEvenement structure={this.state.par} retourChoix={this.retourChoix} choixImg={this.state.choixImage}/>
      </Col>
      </Row>
      {boutonEnvoie}
      </Container>
      </form>

    );
  }
})