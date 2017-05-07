import React from 'react';
import {Inscription} from './inscriptionModal';
import Connexion from '../containers/connexion';
//bascule materialize-ui
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
//import couleur LBF
var couleurs = require('../themeLBF/couleurs');

var FontAwesome = require('react-fontawesome');

const styles= {
  titre: {
    padding: 5,
    margin: 0,

  },
  bouton: {
        marginTop: '5px',
    marginRight: 5,
    color: 'white'
  }
}

export const PublicNavigation = React.createClass({
      getInitialState() {
    return {
      showModalInscription: false,
      showModalIdentification: false
    };
      },
toggleModal: function (quelModal) {
  switch(quelModal) {
    case 'identification':
      this.setState({showModalIdentification: true});
      break;
    case 'inscription':
      this.setState({showModalInscription: true});
      break;
    default:
      break;
      
  }

},
close: function () {
  this.setState({showModalInscription: false, showModalIdentification: false})
},

render:function () {
  
  return (
    <div>
    <FlatButton
        onClick={() => this.toggleModal('inscription')} 
        label="S'inscrire"
        icon={<FontAwesome name="user-plus" size="2x"/>}
        backgroundColor={couleurs.jardin}
        hoverColor={couleurs.grisLBF}
        style={styles.bouton}
        />

    <FlatButton 
      onClick={() => this.toggleModal('identification')} 
      label="S'identifier"
      icon={<FontAwesome name="sign-in" size="2x"/>}
      backgroundColor={couleurs.brasserie}
      hoverColor={couleurs.grisLBF}
      style={styles.bouton}
      />

  <Dialog
          title="Connexion"
          modal={false}
          open={this.state.showModalIdentification}
          onRequestClose={this.close}
          titleStyle={styles.titre}
        >
 <Connexion fermer={this.close}/>
  </Dialog>
    
    
      <Dialog
          title="Inscription"
          modal={false}
          open={this.state.showModalInscription}
          onRequestClose={this.close}
          titleStyle={styles.titre}
        >
  <Inscription fermer={this.close} type="inscription"/>
  </Dialog>
</div>
  )
}
});
