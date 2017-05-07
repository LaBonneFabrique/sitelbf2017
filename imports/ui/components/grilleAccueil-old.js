import React from 'react';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';
import{Modal, Button, ButtonToolbar} from 'react-bootstrap';
import {InscriptionActivite} from "./inscriptionActivite";
import {couleurIcones} from "../../modules/couleurIcones";

var Masonry = require('masonry-layout');
var moment = require('moment');
let premier = true;
var tableClassement = ["gauche", "droit", "gauche", "droit"];

var LesCartes = React.createClass({
    render() {
        const eveId = this.props.carte._id;
        const position = this.props.rang % 4;
        const classGlobale = premier ? "grid-item reglageCarteDouble": "grid-item reglageCarte";
        const classImage = premier ? "reglageImageCarteDouble "+tableClassement[position] : "reglageImageCarte "+tableClassement[position];
        const classTexte = premier ? "texteCarteDouble "+tableClassement[position]  : "texteCarte "+tableClassement[position]  ;
        tableClassement[position] = tableClassement[3-position];
                premier = false;
                const laDate = moment(this.props.carte.start).format("D MMMM");
                const couleur = couleurIcones(this.props.carte.type);
                return (
                    <div className={classGlobale}>
                        <div className={classImage}><img src="assets/placeholder.png" /></div>
                    <div className={classTexte}>
                       <h1 className="headerCarte" >{laDate}</h1>
                       <div className="corpsCarte" >
                       <h3>{this.props.carte.titre}</h3>
                       </div>
                       <div className="icones piedsCarte">
                            {this.props.carte.inscription&&Meteor.userId()?<a className="spaceRight" onClick={() => {this.props.toggle(eveId)}}><FontAwesome className={couleur} name="check-circle" size="2x"/></a>:null}
                            <a className="spaceRight"><FontAwesome className={couleur} name="comments" size="2x"/></a>
                            <a className="spaceRight"><FontAwesome className={couleur} name="arrow-circle-up" size="2x"/></a>
                            </div>
                    </div>
                    </div>
            );
            }

        });

export class Grille extends React.Component {
    
constructor(props) {
    super();
    this.state = {
        showModalInscription: false,
        eveId: ""
    };
    this.modalInscription = this.modalInscription.bind(this);
    this.close=this.close.bind(this);
  }
  
componentDidMount() {
    var $grid = new Masonry('.grille', {
            // options
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            gutter: 7
        });
        
$grid.layout;
  }
  
modalInscription(eveId) {
    this.setState({showModalInscription: true});
    this.setState({eveId: eveId});
}

close() {
  this.setState({showModalInscription: false});
}


    
render () {
    const cards = this.props.evenements;
    var i=0;
    const self = this;
    const children = cards.map(function(card) {
        var key = "key"+i;
            i++;
            return (
                <LesCartes carte={card} key={key} rang={i-1} toggle={self.modalInscription}/>
                    );
        });
    return(
        <div>
    	<div className="grille">
            <div className="grid-sizer"></div>
            {children}
        </div>
            <Modal show={this.state.showModalInscription} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>S'inscrire</Modal.Title>
          </Modal.Header>
        <InscriptionActivite fermer={this.close} eveId={this.state.eveId} />
            </Modal>
  </div>
        );
}
}
   