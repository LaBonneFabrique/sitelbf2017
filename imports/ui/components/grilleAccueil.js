import React from 'react';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';
import {InscriptionActivite} from "./inscriptionActivite";
import {InscriptionActiviteJournee} from "./inscriptionActiviteJournee";
import {Images} from "../../api/images/images";
import {couleurIcones} from "../../modules/couleurIcones";
//bascule material-ui
import {GridList, GridTile} from 'material-ui/GridList';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';


var moment = require('moment');

var styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    overflowY: 'visible',
    margin: 0,
    padding: 0
  },
  border: {
    borderColor: 'black',
    borderWidth: '1px',
    borderStyle: 'Solid'
  },
  tile: {
    width: 387,
    margin: 0,
    padding: 0,
    borderColor: 'green',
    borderWidth: '0px',
    borderStyle: 'Solid'
  },
  smallIcon: {
    width: 40,
    height: 40,
    color: 'white'
  },
  small: {
    width: 40,
    height: 40,
    padding: 0,
    margin: 0,
    marginLeft: '10px'
  },
  titre: {
    padding: '5px',
    margin: '0px'
  }
};

var LesCartes = React.createClass({
    render() {
        const isPair = Math.round(this.props.rang/2)%2==0?true:false;
        var nbPlacesrestantes=0;
        this.props.carte.creneaux.map(function(creneau){
            nbPlacesrestantes += creneau.places-creneau.inscrits.length;
        });
        const self =this;
        let afficheImage;
        const couleur = couleurIcones(this.props.carte.type);
        Images.find({"meta.utilisation": 'accueil'}).map(function(image) {
            
            if (image._id===self.props.carte.lienImage) {
                afficheImage=Images.link(image, 'taille190');
                }
            });
        const laDate = moment(self.props.carte.start).format("D MMM");
        return (
            <div className="carte">
                {isPair?<img src={afficheImage} className="pair"/>:<img src={afficheImage} className="impair"/>}
                <div className="data">
                    <div className="corps">
                    <h1>{laDate}</h1>
                    <h3>{self.props.carte.titre}</h3>
                        <div>{this.props.carte.description}</div>
                        
                    </div>
                    <div className ="footer">
                    {!this.props.carte.allDay&&this.props.carte.inscription&&nbPlacesrestantes>1?<div className="couleurGrisLBF">{nbPlacesrestantes} places restantes</div>:null}
                    {!this.props.carte.allDay&&this.props.carte.inscription&&nbPlacesrestantes==1?<div className="couleurGrisLBF">Dernière place !</div>:null}
                    
                    {!this.props.carte.allDay&&this.props.carte.inscription&&Meteor.userId()?
                        <FloatingActionButton 
                            mini={true} 
                            backgroundColor={couleur}
                            style={styles.small}
                            iconClassName="fa fa-pencil-square-o petit"
                            iconStyle={styles.smallIcon}
                            zDepth={0}
                            onClick={() => {this.props.toggle(this.props.carte._id, this.props.carte.allDay)}}
                            />
                            :null}
                            
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
        eveId: "",
        journee: false
    };
    this.modalInscription = this.modalInscription.bind(this);
    this.close=this.close.bind(this);
  }
  
componentDidMount() {

  }
  
modalInscription(eveId, journee) {
    this.setState({showModalInscription: true});
    this.setState({eveId: eveId});
    this.setState({journee: journee});
    
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
                <GridTile key={key} style={styles.tile}>
                    <LesCartes carte={card} rang={i} toggle={self.modalInscription}/>
                </GridTile>
                    );
        });
        
    return(
        <div style={styles.root}>
    <GridList
      cols={2}
      cellHeight={190}
      padding={7}
      style={styles.gridList}
    >
        {children}
    </GridList>
    	
    <Dialog
      title="Inscription"
      modal={false}
      open={this.state.showModalInscription}
      onRequestClose={this.close}
      titleStyle={styles.titre}
    >
   {!this.state.journee? <InscriptionActivite fermer={this.close} eveId={this.state.eveId} />:null}
  </Dialog>

  </div>
        );
}
}

/* icone des commentaires 
                           <FloatingActionButton 
                            mini={true} 
                            backgroundColor={couleur}
                            style={styles.small}
                            iconClassName="fa fa-comments"
                            iconStyle={styles.smallIcon}
                            zDepth={0}
                            />
                            */
   