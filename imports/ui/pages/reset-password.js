import React from 'react';
import { handleResetPassword } from '../../modules/reset-password';
//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
//couleur LBF
var couleurs = require('../themeLBF/couleurs');
//style formulaire
const styles = {
  bouton: {
    marginTop: '5px',
    marginRight: 5,
    color: 'white'
  },
  page: {
    padding: 10
  },
  marginRight: {
    marginRight: 20
  }
};

export class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({
      component: this,
      token: this.props.params.token,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <form ref="resetPassword" className="reset-password" onSubmit={ this.handleSubmit }>
        <h4 className="page-header">Changement de mot de passe</h4>
        <p>
          Entrez un nouveau mot de passe ci-dessous (6 caractère au moins). A l'issue de la procédure, vous serez connecté avec le nouveau mot de passe.
        </p>
            <TextField
                type="password"
                ref="newPassword"
                name="newPassword"
                placeholder="Nouveau mot de passe"
                className="pull-left"
                style={styles.marginRight}
                onBlur={this.mailExists}
                />
            <TextField
                type="password"
                ref="repeatNewPassword"
                name="repeatNewPassword"
                placeholder="Répéter le nouveau mot de passe"
                className="pull-left"
                onBlur={this.mailExists}
                />
            <FlatButton 
                label="Changer le mot de passe &amp; se connecter" 
                type="submit"
                className="pull-left"
                backgroundColor={couleurs.jardin}
                hoverColor={couleurs.grisLBF}
                style={styles.bouton}
              />
        </form>;

  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
