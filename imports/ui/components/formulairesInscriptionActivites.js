import React from 'react';
import {getMembreData} from "../../modules/getMembreData";
import {getEveData, getCreneauData, getPlacesRestantes, getIndexCreneau} from "../../modules/getEveData";
import FontAwesome from 'react-fontawesome';
import {updateFamille} from '../../api/users/methods';
import {updateInscrits} from '../../api/evenements/methods';
import {envoiEmailConfirmation} from '../../modules/envoiMail';
import { Bert } from 'meteor/themeteorchef:bert';
import $ from 'jquery';
//bascule vers Material-ui
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
//import couleur LBF
var couleurs = require('../themeLBF/couleurs');
const styles= {
  bouton: {
        marginTop: '5px',
    marginRight: 5,
    color: 'white'
  }
};

let evenement;

export class FormulairesInscription extends React.Component {
    constructor(props) {
        super();
        this.state={
            nbChecked: 0
        };
        this.lesCreneaux = this.lesCreneaux.bind(this);
        this.envoiEmail = this.envoiEmail.bind(this);

    }
    
    componentDidMount() {
        evenement = getEveData(this.props.eveId);
        var nbInscriptions=0;
        this.props.liste.map(function(id) {
        evenement.creneaux.map(function(creneau){
            const n = creneau.inscrits.indexOf(id);
            if (n>-1) nbInscriptions+=1;
        });
        });
        this.setState({nbChecked: nbInscriptions});
    }
    
    shouldComponentUpdate() {
        evenement = getEveData(this.props.eveId);
        var nbInscriptions=0;
        this.props.liste.map(function(id) {
        evenement.creneaux.map(function(creneau){
            const n = creneau.inscrits.indexOf(id);
            if (n>-1) nbInscriptions+=1;
        });
        });
        this.setState({nbChecked: nbInscriptions});
        return true;
    }
    
    inscriptionCreneau(id, creneauId, horaire, rang) {
    var famille=Meteor.user().famille;
    const trouveIndexMembre = function(famille) {
        return famille._id=== id;
        };
    const index = famille.findIndex(trouveIndexMembre);
    const nom = creneauId+"-"+id;
    const checkboxName = "[name="+nom+"]";
    var messageOK="";
    const creneaux = getCreneauData(this.props.eveId);
    const m = getIndexCreneau(creneaux, creneauId);
    var nbInscriptions = this.state.nbChecked;
    if ($(checkboxName).is(':checked')) {
        famille[index].inscriptions.push(this.props.eveId);
        creneaux[m].inscrits.push(id);
        messageOK = famille[index].prenom + " est enregistré.e sur le créneau "+horaire;
        nbInscriptions++;
    } else {

        const n = famille[index].inscriptions.indexOf(this.props.eveId);
        famille[index].inscriptions.splice(n,1);
        const mm = creneaux[m].inscrits.indexOf(id);
        creneaux[m].inscrits.splice(mm,1);
        messageOK = "Annulation de l'inscription de " + famille[index].prenom + " pour le créneau "+horaire;
        nbInscriptions--;
        
    }
    
    update = {creneaux: creneaux};

    const evenementId = this.props.eveId;
    updateInscrits.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
    
    const userId = Meteor.userId();
    var update = {famille: famille};
    updateFamille.call({userId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
          Bert.alert(messageOK, 'success');
          this.setState({nbChecked: nbInscriptions});
      }
    });
    

    

    }
    
    lesCreneaux(idMembre) {
        const self = this;
        var cbChecked={};//checked ? Pas checked ?
        var cbDisabled={};//enabled ? Disabled ?
        this.props.liste.map(function(id) {
        var totalEtat = true;
        var nom="";
        evenement.creneaux.map(function(creneau){
            nom = creneau._id+"-"+id;
            if (creneau.inscrits.indexOf(id)>-1) {//si membre id est dans la liste des inscrits
                cbDisabled[nom]=false;
                cbChecked[nom]=true;//checkbox correspondante est checked
            } else {//sinon
                cbDisabled[nom]=true;
                cbChecked[nom]=false;
            }
            
            totalEtat = totalEtat&&cbDisabled[nom];//"somme" des états
            });

            if(totalEtat) {

                //tous les checkboxes sont disabled => aucune ne l'est
                evenement.creneaux.map(function(creneau){
                   const nom = creneau._id+"-"+id;
                   const places=creneau.places-creneau.inscrits.length;
                   if (places>0)
                        cbDisabled[nom]=false;
                    else
                        cbDisabled[nom]=true;
                });
            }
        });

        var index=0;
        const listeCreneaux = evenement.creneaux.map(function(creneau) {
            const rang = index;
            index++;
            const placesRestantes = getPlacesRestantes(evenement._id, creneau._id);
            const nomCheckbox = creneau._id+"-"+idMembre;
            const label=creneau.horaire+" ("+placesRestantes+" places restantes)"
            return <Checkbox 
                        key = {nomCheckbox}
                        name={nomCheckbox}
                        label={label}
                        onCheck={function() {self.inscriptionCreneau(idMembre, creneau._id,creneau.horaire, rang)}}
                        style={{width: '45%', marginRight: 10}}
                        disabled={cbDisabled[nomCheckbox]}
                        checked={cbChecked[nomCheckbox]}
                    />;
            
      
        });
        return <div style={{width: '100%', display: 'flex', flexWrap: 'wrap' ,flexDirection: 'row', justifyContent: 'flex-start'}}>
                        {listeCreneaux}
                        </div>
;
    }
    
    envoiEmail() {
        const userId = Meteor.userId();
        const eveId=this.props.eveId;
      envoiEmailConfirmation.call({userId, eveId}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
          Bert.alert("Le mail contenant le détail de votre inscription a été envoyé.", 'success')
      }
    });  
    }
    
    render() {
        
        
        const self = this;
        const formulaires = this.props.liste.map(function(id) {
        const membre = getMembreData(id);
        return(
            <div key={membre.prenom}>
            <h4 className="spaceBottom">Choisissez le créneau pour {membre.prenom}</h4>
            {self.lesCreneaux(id)}
            <hr />
            </div>
            );
        });
        
        const validation = 
                    <div>
                        <p>En cliquant sur le bouton ci-dessous, un mail de confirmation vous sera envoyé. Il comporte des indications sur la participation aux frais.
                        Vous pouvez revenir à cette page à tout moment pour modifier ou annuler vos inscriptions. </p>
                            <FlatButton 
                              label="Envoyer la confirmation"
                              icon={<FontAwesome name="paper-plane" size="2x"/>}
                              backgroundColor={couleurs.coworking}
                              hoverColor={couleurs.grisLBF}
                              style={styles.bouton}
                              onClick={() => this.envoiEmail()}
                              />
                    </div>;
        
        return (
            <div>
                <div>
                {formulaires}
                </div>
                {validation}
                </div>
            );
    }
    
}