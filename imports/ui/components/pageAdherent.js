import React from 'react';
import { Meteor } from 'meteor/meteor';
import {AjoutMembre} from './ajoutMembre';
import FontAwesome from 'react-fontawesome';
import {ajoutMembreFamille} from '../../api/users/methods';
import { Bert } from 'meteor/themeteorchef:bert';
import {Random} from 'meteor/random';
import {getAge} from '../../modules/getAge';

//bascule vers material-ui
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

let self;

const styles = {
    smallIcon: {
    fontSize: '20px',
    margin: 0,
    padding: 0
  },
    cardText: {
        padding: 5,
        margin: 5
    },
    cardAction: {
        padding:0,
        margin: 0
    },
  noPaddingMargin: {
      padding: 0,
      margin: 0
  },
  paper: {
  width: 250,
  margin: 20,
  textAlign: 'left',
  display: 'inline-block',
  padding: 10
},
listItem: {
    padding: 5,

},
innerListItem: {
    padding: 0

},
borderTest: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'red'
},
iconMinus: {
    margin: 0,
    marginTop: -5,
    padding: 0
}
}; 

export class PageAdherent extends React.Component {
    
    constructor(props) {
    super(props);
    this.state = {
        showModalFamille:false,
        premierMembre: true
    };
    this.showModalAjoutFamille = this.showModalAjoutFamille.bind(this);
    this.removeMembreF = this.removeMembreF.bind(this);
    this.handleClose=this.handleClose.bind(this);

  }
  
  componentDidMount() {
      document.title = "La Bonne Fabrique | Page adhérent";
      if(Meteor.user().famille.length<1&&Meteor.user().adhesionFamille) {
          const nom = Meteor.user().profile.nom;
          const prenom = Meteor.user().profile.prenom;
          const inscriptions = [];
          const id = Random.id();
          const famille = [{_id: id, nom: nom, prenom: prenom, inscriptions: inscriptions}];
          const update = {famille: famille};
          const userId = Meteor.userId();
          ajoutMembreFamille.call({userId, update}, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
         }
    });
          
      }
  }
  
  showModalAjoutFamille() {
      this.setState({showModalFamille: true});
  }
  
  removeMembreF(id) {
      var prenom="";
      var i=0;
      var famille=Meteor.user().famille;

      Meteor.user().famille.map(function(membre){
          if (id==membre._id) {
            famille.splice(i, 1);
            prenom=membre.prenom;
          }
        i++;
      });
    const update = {famille: famille};
    const messageOK = prenom + " a été retiré.e";
    const userId = Meteor.userId();
      ajoutMembreFamille.call({userId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
          Bert.alert(messageOK, 'success');
      }
    });
  }
  
  handleClose() {
     this.setState({showModalFamille: false});
  }
  
  panelFamille() {
      self = this;
     var premierMembre = this.state.premierMembre;
     console.log(Meteor.user());
 const ListeFamille = Meteor.user().famille.map(function(membre) {
       
          var primaryText=<p className="noSpace spaceBottom">{membre.prenom}</p>
          if (membre.age) {
            var age=getAge(membre.age);
            primaryText = <p className="noSpace spaceBottom">{membre.prenom}<span className="couleurGrisLBF"> &nbsp;{age} ans</span></p>;
          }
            if (membre.inscriptions.length==0&&!premierMembre) {

                return (
                <ListItem
                    key={membre.prenom}
                    primaryText={primaryText}
                    disabled={false}
                    onTouchTap={() => {self.removeMembreF(membre._id)}}
                    style={styles.listItem}
                    innerDivStyle={styles.innerListItem}
                    rightIcon={<FontIcon style={styles.iconMinus} className="fa fa-minus-square" />}
                />);

            } else {
                premierMembre=false;
                return (
                <ListItem
                    key={membre.prenom}
                    primaryText={primaryText}
                    disabled={true}
                    style={styles.listItem}
                />);

                }
        });
        
    if (this.props.loggedUser.adhesionFamille) {
          return (
<div>
            <h4 className="noSpace">Membres de la famille</h4>
            <Divider />
            <List style={{width: 200, marginRight:25, marginLeft: 25, padding:0}}>
                {ListeFamille}
            </List>
            <FlatButton
                label="Ajouter un membre"
                secondary={true}
                icon={<FontIcon className="fa fa-plus" />}
                onClick={this.showModalAjoutFamille}
            />

    </div>


              
              );
      }
  }
    
    render () {
        return (

    <div ref="pageAdherent">

    <div>
  <Paper  style={styles.paper}>
    {this.panelFamille()}
    </Paper>
    <Dialog
          modal={false}
          open={this.state.showModalFamille}
        >
          <AjoutMembre fermer={this.handleClose}/>
    </Dialog>

    </div>
   </div>
    );
    }
}

PageAdherent.propTypes = {
    loggedUser: React.PropTypes.object
};
