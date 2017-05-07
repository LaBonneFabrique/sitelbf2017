import {getEveData} from './getEveData';
import {Meteor} from 'meteor/meteor';
import {updateFamille} from '../api/users/methods';
import {updateInscrits} from '../api/evenements/methods';
import { Bert } from 'meteor/themeteorchef:bert';

export const RemoveInscriptions = function(evenementId, membreId) {

    //mise à jour de l'utilisateur
    const famille = Meteor.user().famille;
    var prenom = "";
    famille.map(function(membre){
        const n = membre.inscriptions.indexOf(evenementId);
        if ((n>-1)&&membre._id===membreId) {
            membre.inscriptions.splice(n,1);
            prenom = membre.prenom;
            }
    });
    
    const userId = Meteor.userId();
    var update = {famille: famille};
    const messageOK = prenom+" a été désinscrit.e";
    
     updateFamille.call({userId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
          Bert.alert(messageOK, 'success');
      }
    });
    
    //mise à jour de l'évènement
    const evenement= getEveData(evenementId);
    var creneaux = evenement.creneaux;
    creneaux.map(function(creneau){
        const n = creneau.inscrits.indexOf(membreId);
        if (n>-1)
            creneau.inscrits.splice(n,1);
    });
    
    update = {creneaux: creneaux};
     updateInscrits.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
    
};