import React from 'react';
import moment from 'moment';
//import {Modal} from 'react-bootstrap';
import { FormulaireEvenement } from '../components/formulaireEvenement';
import {updateEvenement} from '../../api/evenements/methods.js';
import {Random} from 'meteor/random';

//bascule vers materialize-ui
import Dialog from 'material-ui/Dialog';

import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import 'fullcalendar/dist/locale/fr';
import { Bert } from 'meteor/themeteorchef:bert';

var aujourdhuiDate = moment();
const styles= {
  titre: {
    padding: '5px',
    margin: '0px'
  }
}

let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};


const Calendar = React.createClass({
      getInitialState() {
    const creneauId = Random.id();
    return {
        eveId: '',
        showModal: false,
        render:false,
        operation: 'add',
        NEWEVE: {
      titre: 'Nouvel évènement',
      par: 'La-Bonne-Fabrique',
      lieu: 'La Bonne Fabrique',
      nbTotalPlaces: 8,
      jours: 1,
      date: aujourdhuiDate,
      creneaux: [{_id:creneauId,
                horaire: "14h00-18h00",
                places: 8,
                inscrits: []}
                ],
      inscription: false,
      lienImage:"",
      lienBilleterie:"",
      frequence:"une-fois",
      nbSeances:1,
      publie:false
    }
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },
  componentDidMount() {
    const { calendar } = this.refs;
    const evenements = this.props.evenements;

    const self = this;
    $(calendar).fullCalendar({
      lang: 'fr',
      editable: true,
      eventDurationEditable: true,
      events( start, end, timezone, callback ) {
      let data = evenements.map( ( event ) => {
        event.editable = !isPast( event.start );
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },
    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
        `<h6>${ event.titre }</h6>`
      );
    },
    dayClick( date ) {

      self.setState({operation: 'add'});
        if (!isPast(date)) {
          const creneauId = Random.id();
   const nouveau = {
      titre: 'Nouvel événement',
      par: 'La-Bonne-Fabrique',
      lieu: 'La Bonne Fabrique',
      nbTotalPlaces: 8,
      jours: 1,
      start: date,
      end: date,
      description: 'une description de l\'événement',
      creneaux: [{_id: creneauId,
                horaire: "14h00-18h00",
                places: 8,
                inscrits: []}
                ],
      inscription: false,
      lienImage:"",
      lienBilleterie:"",
      frequence:"une-fois",
      nbSeances:1,
      publie:false
    };
     self.setState({NEWEVE: nouveau});
     self.open();
        } else {
          Bert.alert("Impossible de créer un évènement dans passé.", 'warning')
        }
    },
    eventClick( event ) {
      self.setState({operation: 'edit'})
      self.setState({eveId: event._id})
      let nouveau = {};
      self.props.evenements.forEach(function (evenement) {
        if (evenement._id==event._id) {
          var nbTotalPlaces = evenement.nbTotalPlaces ? evenement.nbTotalPlaces:8;
      nouveau = {
      _id: evenement._id,
      titre: evenement.titre,
      par: evenement.type,
      lieu: evenement.lieu,
      nbTotalPlaces: nbTotalPlaces,
      jours: evenement.nbJours,
      allDay: evenement.allDay,
      start: evenement.start,
      end: evenement.end,
      description: evenement.description,
      creneaux: evenement.creneaux,
      inscription: evenement.inscription,
      lienImage: evenement.lienImage,
      lienBilleterie: evenement.lienBilleterie,
      frequence:evenement.frequence,
      nbSeances:evenement.nbSeances,
      publie:evenement.publie
    };
        }
        })
    self.setState({NEWEVE: nouveau});
     self.open();
     },
    eventResize (event, delta, revert) {
     let evenementId = event._id;
      let update = {
      end: event.end.toDate(),
      };
      
      updateEvenement.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Durée modifiée avec succès.', 'success');
      }
      
    });
    },
    eventDrop( event, delta, revert ) {
      let evenementId = event._id;
      let start = event.start.toDate();
      let end = event.end ? event.end.toDate(): event.start.toDate() ;
      if ( !isPast( start ) ) {
       let update = {start, end};

        updateEvenement.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Modification de la date effectué avec succès.', 'success');
      }
        });
      
      } else {
        revert();
        Bert.alert( 'Désolé, vous ne pouvez déplacer un événement dans le passé !', 'danger' );
      }
    },
    
    
    });

  },
  nouveauRendu() {

  },
  render() {
        const { calendar } = this.refs;
         $(calendar).fullCalendar('removeEvents');
        $(calendar).fullCalendar( 'removeEventSources' );
         $(calendar).fullCalendar('addEventSource', this.props.evenements);         
         $(calendar).fullCalendar('rerenderEvents' );
      
    return(
        <div>
      <div ref="calendar"></div>
        <Dialog
          title={this.state.operation=='edit'?'Modifier l\'événement':'Créer un nouvel événement'}
          modal={false}
          open={this.state.showModal}
          onRequestClose={this.close}
          titleStyle={styles.titre}
          autoScrollBodyContent={true}
        >
  <FormulaireEvenement evenement={this.state.NEWEVE} fermer={this.close} operation={this.state.operation} eveId = {this.state.eveId}/>
  </Dialog>

      </div>
      );
      
  }
})

export const Agenda = ({ evenements }) => (
 <Calendar evenements={ evenements } />
);

Agenda.propTypes = {
  evenements: React.PropTypes.array,
};


