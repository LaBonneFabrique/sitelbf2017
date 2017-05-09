import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import $ from 'jquery';
import 'jquery-validation';
import {ajoutMembreFamille} from '../api/users/methods';
import { Bert } from 'meteor/themeteorchef:bert';
var moment = require('moment');

let component;
var ageDate=new Date();

$.validator.addMethod( 'dateFormat', ( age ) => {
        let retour = true;
  if (age!="") {
      ageDate = moment(age, ["D/MM/YYYY", "DD/MM/YYYY", "D/M/YYYY", "DD/M/YYYY", "D/MM/YY", "DD/MM/YY", "D/M/YY", "DD/M/YY"]).toDate();
      if (ageDate=="Invalid Date") retour=false;
  }
return  retour;
});


$.validator.addMethod( 'prenomExiste', ( prenom ) => {
    let retour = true;
    Meteor.user().famille.map(function(membre) {
    prenom = prenom.substring(0,1).toLocaleUpperCase() + prenom.substring(1);
    var prenomRef = membre.prenom.substring(0,1).toLocaleUpperCase() + membre.prenom.substring(1);
    if (prenom==prenomRef) retour=false;
});
return  retour;
});


const handleSubmit = () => {
    var id = Random.id();
    var nom = component.refs.nom.getValue();
    nom = nom.substring(0,1).toLocaleUpperCase() + nom.substring(1);
      if (nom=="") 
        nom = Meteor.user().profile.nom;
      var prenom = component.refs.prenom.getValue();
      prenom = prenom.substring(0,1).toLocaleUpperCase() + prenom.substring(1);
      const age=component.refs.age.getValue();
      const userId = Meteor.userId();
      var famille = Meteor.user().famille;
      console.log(famille)
       /*  if (age!="") {
        famille.push({_id: id, nom: nom, prenom: prenom, age: ageDate, inscriptions:[]});
         } else { famille.push({_id: id,nom: nom, prenom: prenom, inscriptions:[]});}*/
         famille = [{_id:id}];
    console.log(famille)
      //const update = famille; //{famille: famille};
      //console.log(update)
     const messageOK = prenom + " a été ajouté.e";
      ajoutMembreFamille.call({userId, famille}, (error) => {
      if (error) {
          console.log(error)
        Bert.alert(error.reason, 'danger');
      } else {
          Bert.alert(messageOK, 'success');
          component.props.fermer();
      }
    });
};



const validate = () => {
    $(component.refs.formAjoutMembre).validate({
        rules: {
        nom: {
            required: false
        },
      prenom: {
        required: true,
        prenomExiste: true
      },
      age: {
          required: false,
          dateFormat: true
      }
        },
        messages: {
            prenom: {
               required: "Merci d'entrer au moins un prénom",
               prenomExiste: "Vous avez déjà enregistré cette personne"
            },
            age: {
                dateFormat: "Le format de la date de naissance doit être jj/mm/aa"
            }
        },
        submitHandler() { handleSubmit(); },
        });
};
    
    
export const handleAjoutMembre = (options) => {
  component = options.component;
  validate();
};