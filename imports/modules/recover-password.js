import $ from 'jquery';
import 'jquery-validation';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

let component;
let email;
let userExists;
let serviceIsPassword;

$.validator.addMethod( 'emailExists', (  ) => {
    return userExists;
});

$.validator.addMethod( 'passwordService', (  ) => {
  return serviceIsPassword;
});

const handleRecovery = () => {
  Accounts.forgotPassword({
    email:email,
  }, (error) => {
    if (error) {
      console.log(error.reason)
      let texteErreur="";
      if (error.reason==="User not found") {
        console.log("pif")
        texteErreur='Cette adresse n\'existe pas dans notre base.';
      } else {
        texteErreur=error.reason;
      }
      Bert.alert(texteErreur, 'warning');
    } else {
      Bert.alert('Le lien a été envoyé avec succès !', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.recoverPassword).validate({
    rules: {
      emailAddressRecover: {
        required: true,
        email: true,
        emailExists: true,
        passwordService: true
      },
    },
    messages: {
      emailAddressRecover: {
        required: 'Merci de renseigner l\'adresse mail.',
        email: 'Cette adresse ne semble pas valide',
        emailExists: 'Cette adresse n\'existe pas dans notre base.',
        passwordService: 'Votre mot de passe n\'existe pas. Vous avez dû vous enregistrer avec FaceBook, Twitter ou Github.'
      },
    },
    submitHandler() { handleRecovery(); },
  });
};

export const handleRecoverPassword = (options) => {
  component = options.component;
  email = component.refs.emailAddressRecover.getValue();
  userExists = options.userFound;
  if (userExists&&options.services.password) {serviceIsPassword =true;} else {serviceIsPassword =false;}
  validate();
};
