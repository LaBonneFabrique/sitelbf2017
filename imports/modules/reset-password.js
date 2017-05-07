import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;
let token;

const handleReset = () => {
  const password = component.refs.newPassword.getValue();
  Accounts.resetPassword(token, password, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Succès du changement de mot de passe', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.resetPassword).validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6,
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: '[name="newPassword"]',
      },
    },
    messages: {
      newPassword: {
        required: 'Entrer un nouveau mot de passe',
        minlength: 'Au moins 6 caractères, s\'il vous plaît',
      },
      repeatNewPassword: {
        required: 'Entrer à nouveau votre mot de passe.',
        equalTo: 'Les deux mots de passe ne correspondent pas, essayez à nouveau',
      },
    },
    submitHandler() { handleReset(); },
  });
};

export const handleResetPassword = (options) => {
  component = options.component;
  token = options.token;
  validate();
};
