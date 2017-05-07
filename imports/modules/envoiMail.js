import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Users } from '../api/users/users.js';
import { Evenements } from '../api/evenements/evenements.js';
import { Email } from 'meteor/email';
var moment = require('moment');
moment.updateLocale('fr', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        LTS : "HH:mm:ss",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dans %s",
        past : "il y a %s",
        s : "quelques secondes",
        m : "une minute",
        mm : "%d minutes",
        h : "une heure",
        hh : "%d heures",
        d : "un jour",
        dd : "%d jours",
        M : "un mois",
        MM : "%d mois",
        y : "une année",
        yy : "%d années"
    },
    ordinalParse : /\d{1,2}(er|ème)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

export const envoiEmailConfirmation = new ValidatedMethod({
  name: 'inscriptions.mailConfirmation',
    validate: new SimpleSchema({
    userId: { type: String },
    eveId: {type:String},
  }).validator(),
  run({ userId, eveId }) {
    if (Meteor.isServer) {
  var recapCreneaux="";
  const userData = Users.findOne({_id: userId});
  const famille = userData.famille;
  const mail = userData.emails;

  const evenement = Evenements.findOne({_id: eveId});
  const creneaux = evenement.creneaux;

  famille.map(function(membre) {

    creneaux.map(function(creneau) {
      if (creneau.inscrits.length>0) {
      const trouveMembre = function(inscrit) {
        return inscrit === membre._id;
        };
     const indexInscrit = creneau.inscrits.findIndex(trouveMembre);
      if (indexInscrit>=0) {
        recapCreneaux+="<p>"+membre.prenom+" est inscrit-e sur le creneau "+creneau.horaire+"</p>";
      }
      }
    });
  });

const leTexte = Assets.getText('emailRecapInscriptions.html');
const html = leTexte.replace("{{lesInscriptions}}",recapCreneaux);
const htmlTmp1=html.replace("{{evenementTitre}}", "<b>"+evenement.titre+"</b>");
var laDate = moment(evenement.start).format('dddd D MMMM');
const htmlTmp = htmlTmp1.replace('{{dateEvenement}}', "<b>"+laDate+"</b>");
let htmlFinal;
if(evenement.lienBilleterie) {
  const paf = Assets.getText('paf.html');
  const pafFinal = paf.replace("{{lienBilleterie}}", evenement.lienBilleterie);
  htmlFinal=htmlTmp.replace('{{paf}}', pafFinal);
} else {
  htmlFinal=htmlTmp.replace('{{paf}}', "");
}

Email.send({
  to: userData.emails[0].address,
  from: "lasalledesmachines@labonnefabrique.fr",
  subject: "Détails de vos inscriptions",
  html: htmlFinal,
});

}

  },
});
