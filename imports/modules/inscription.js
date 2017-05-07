import $ from 'jquery';
import 'jquery-validation';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import {updateProfile} from '../api/users/methods.js';
import { browserHistory } from 'react-router';

let component;
let type;

$.validator.addMethod( 'mailExists', ( emailAddress ) => {
 const userExists = Meteor.users.findOne({ 'emails.address': emailAddress });
  if (type=="inscription") {return userExists ? false : true;} else {return true;}
});

const mailExists = (emailAddress) => {
  const userExists = Meteor.users.findOne({ 'emails.address': emailAddress });
  return userExists ? userExists : false;
};

const handleSubmit = () => {
  const email = component.refs.emailAddress.getValue();
  let update={};
    let roles=[];
  if (email=="luchier@gmail.com") 
    roles=['admin']

  //préparation de la mise à jour du profil en cas de nouvelle inscription
  if (type=='inscription') {
  const prenom = component.refs.prenom.getValue();
  const nom = component.refs.nom.getValue();

  update = {profile: {
          nom: nom,
          prenom: prenom
        },
        emails:[{
          address: email,
          verified: false
        }],
        adhesionFamille: true,
        famille:[],
        reglageService: false,
        roles:roles
        };
  } 
  
if ($("[name='choix']").is(":checked")) {
// pas d'utilisation des services extérieurs
        const password = component.refs.password.getValue();
        if (type=='inscription') {
           Accounts.createUser({
        email: email,
        password: password,
        profile: update.profile
      }, function (error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Merci pour votre inscription.', 'success');
          
        if (Object.keys(update).length!=0) {
          let usereId = Meteor.userId();
          updateProfile.call({usereId, update}, (error) => {
            if (error) {
              Bert.alert(error.reason, 'danger');
              }
          });
        }
          
          if (!Meteor.user().reglageService) {
            browserHistory.push('/pageAdherent');
            }
        }
      });
        } else {
          Meteor.loginWithPassword({email: email}, password, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'warning' );

    } else {
      Bert.alert( 'Vous êtes maintenant identifié.', 'success' );
        if (!Meteor.user().reglageService) {
            browserHistory.push('/pageAdherent');
            }
    }
    });
        }
  } else {
//utilisation d'un service extérieur
   let options = {
            requestPermissions: [ 'email' ]
          };
  let dataSocialLogin = $("[name='service']:checked").val();
      Meteor[ dataSocialLogin ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      } else {
        Bert.alert( 'Vous êtes maintenant identifié.', 'success' );
        if (Object.keys(update).length!=0) {

        let usereId = Meteor.userId();
        updateProfile.call({usereId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
      }
      
      if (!Meteor.user().reglageService) {
            browserHistory.push('/pageAdherent');
            }
      
      }
        
      });
    
  }

};

const validate = () => {
  $(component.refs.inscription).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true,
        mailExists: true
      },
      password: {
        required: {
            depends: function(element) {
            return $("[name='choix']").is(":checked");
            }
        }
      },
      passwordVerif: {
        required: {
            depends: function(element) {
            return $("[name='choix']").is(":checked");
            }},
        equalTo: "[name='password']"
        
      },
      nom: {
        required: {
            depends: function(element) {
            return $("[name='choix']").is(":checked");
            }}
      },
      prenom: {
        required: {
            depends: function(element) {
            return $("[name='choix']").is(":checked");
            }}
      },
      service: {
        required: {
            depends: function(element) {
            return !$("[name='choix']").is(":checked");
            }
      }
    }
    },
    messages: {
      emailAddress: {
        required: 'Merci de renseigner l\'adresse mail.',
        email: 'Cette adresse ne semble pas valide',
        mailExists: 'Cette adresse existe déjà. Identifiez-vous.'
      },
      password: {
        required: 'Merci d\'entrer un mot de passe.',
      },
      passwordVerif: {
        equalTo: 'Les deux mots de passe ne sont pas identiques'
      },
      nom: {
        required: 'Merci d\'entrer votre nom'
      },
      prenom: {
        required: 'Merci d\'entrer votre prénom'
      },
      service: {
        required: 'Choisissez l\'un des services ci-dessus'
      }
    },
        errorPlacement: function(error, element) 
        {
            if ( element.is(":radio") ) 
            {
                error.appendTo( element.parents("[name='groupeRadio']") );
            }
            else 
            { // This is the default behavior 
                error.insertAfter( element );
            }
         },
    submitHandler() { handleSubmit(); },
  });
};

export const handleInscription = (options) => {
  component = options.component;
  type = options.type;
  validate();
};
