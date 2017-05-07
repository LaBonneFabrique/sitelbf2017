import { Accounts } from 'meteor/accounts-base';

const name = 'La Bonne fabrique';
const email = '<atelier@labonnefabrique.fr>';
const from = `${name} ${email}`;
const emailTemplates = Accounts.emailTemplates;

emailTemplates.siteName = name;
emailTemplates.from = from;

emailTemplates.resetPassword = {
  subject() {
    return `[${name}] Changement du mot de passe`;
  },
  text(user, url) {
    const userEmail = user.emails[0].address;
    const urlWithoutHash = url.replace('#/', '');

    return `Un changement de mot de passe a été demandé pour ce compte, lié à cette adresse mail (${userEmail}). Pour changer de mot de passe, cliquer sur le lien suivant :
    \n${urlWithoutHash}\n\n Si vous n'avez pas demandé à changer de mot de passe, merci d'ignorer ce mail. Si vous pensez qu'il y a un problème, merci de nous contacter à
    ${email}.`;
  },
};
