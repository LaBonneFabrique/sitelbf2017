import $ from 'jquery';
import 'jquery-validation';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

let component;
let service;
let type;

const handleSubmit = () => {
    const email = component.refs.emailAddress.getValue();
    if(type==="password") {
        const password = component.refs.password.getValue();
        Meteor.loginWithPassword(email, password, ( error ) => {
            if ( error ) {
                Bert.alert( error, 'warning' );
            } else {
                Bert.alert( 'Vous êtes maintenant identifié.', 'success' );
            }
        });
    } else {
        var options = {
            requestPermissions: [ 'email' ]
          };
          
          if ( type === 'loginWithTwitter' ) {
            delete options.requestPermissions;
          }
    
          console.log(type)
          
        
        Meteor[ type ]( options, ( error ) => {
        if ( error ) {
            Bert.alert( error.message, 'danger' );
        } else {
            Bert.alert( 'Vous êtes maintenant identifié.', 'success' );
        }
        });
    }
};

const validate = () => {
  $(component.refs.connexion).validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: {
            depends: function(element) {
            return type==="password"?true:false;
            }
        }
      }
    },
    messages: {
      emailAddress: {
        required: 'Merci de renseigner l\'adresse mail.',
        email: 'Cette adresse ne semble pas valide'
      },
      password: {
        required: 'Merci d\'entrer un mot de passe.',
      }
    },
    submitHandler() { handleSubmit(); },
  });
};

export const handleConnexion = (options) => {
  component = options.component;
  service = options.service;
  if (service.github) type="loginWithGithub";
  if (service.facebook) type="loginWithFacebook";
  if (service.twitter) type="loginWithTwitter";
  if (service.password) type="password";
  validate();
};