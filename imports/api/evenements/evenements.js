import SimpleSchema from 'simpl-schema';

export const Evenements = new Meteor.Collection( 'evenements' );

Evenements.schema = new SimpleSchema({
  "titre": {
    type: String,
    label: "Le titre de l'activité"
  },
  "start": {
    type: Date,
    label: "Date à laquelle l'activité est prévue"
  },
  "end": {
    type: Date,
    label: "Date à laquelle l'activité se termine"
  },
  "allDay": {
    type: Boolean,
    label: "Evénement à la journée",
  },
  "nbJours": {
    type: Number,
    label: "le nombre de jours de l'activité si en jours entiers"
  },
  "nbTotalPlaces": {
    type: Number,
    label: "Le nombre de places total disponibles"
  },
  "type": {
    type: String,
    label: "Quelle structure propose l'activité ?",
    allowedValues: ['La-Bonne-Fabrique', 'Le-Coworking', 'La-brasserie','La-Salle-des-Machines','Autres']
    },
  "places": {
    type: Number,
    label: "Le nombre de places de l'activité",
    optional: true
  },
  "lieu": {
    type: String,
    label: "Lieu où se déroule l'évènement"
  },
  "description": {
    type: String,
    label: "Description de l'évènement",
  },
  "creneaux": {
    type: Array,
    label: "Horaire, nombre de places et d'inscrits",
    optional: true
  },
  "creneaux.$._id": {
    type: String,
    label: 'id du creneaux'
  },
  "creneaux.$.horaire": {
    type: String,
    label: "Le créneau horaire"
  },
  "creneaux.$.places": {
    type: Number,
    label: "Le nombre de places dans le créneau"
  },
  "creneaux.$.inscrits": {
    type: Array,
    label: "La table des inscrits",
    optional: true
  },
  "inscription": {
    type:Boolean,
    label: "Inscriptions nécessaires ?",
    optional: true
  },
  "lienImage": {
    type:String,
    label:"Lien de l'image pour l'accueil",
    optional: true
  },
  "lienBilleterie": {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true
  },
  "frequence":{
    type: String,
    optional: true,
    allowedValues: ['une-fois', 'hebdomadaire', 'bimensuelle']
  },
  "nbSeances":{
    type: Number,
    optional: true
  },
  "publie":{
    type:Boolean,
    optional: true
  }
});

Evenements.attachSchema( Evenements.schema );