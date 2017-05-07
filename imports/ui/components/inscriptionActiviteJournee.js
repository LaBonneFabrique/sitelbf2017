import React from 'react';
import {Meteor} from 'meteor/meteor';
import $ from 'jquery';
import {FormulairesInscription} from './formulairesInscriptionActivites';
import {RemoveInscriptions} from '../../modules/removeInscriptions';
//bascule vers Material-ui
import Checkbox from 'material-ui/Checkbox';


export class InscriptionActiviteJournee extends React.Component {
    
    constructor(props) {
        super();
         var listeChecked =[];
        Meteor.user().famille.map(function(membre) {
            if(membre.inscriptions.length>0)
                listeChecked[membre._id]=true;
            else 
                listeChecked[membre._id]=false;
        });
        this.state={
            membresAInscrire:[],
            etatCheckbox: listeChecked,
        };
        this.selectionMembre=this.selectionMembre.bind(this);
    }
    
    componentDidMount() {
        const self = this;
        var listeId=this.state.membresAInscrire;
        Meteor.user().famille.map(function(membre) {
        if (membre.inscriptions.length>0) {
            listeId.push(membre._id);
            self.setState({membresAInscrire: listeId});
            //$(nameCheckbox).prop('checked', true);
           
          }
        });



    }
    
    handleForm(event) {
        event.preventDefault;
    }
    
    selectionMembre(membre) {
        var listeId=this.state.membresAInscrire;
        var listeChecked = this.state.etatCheckbox;
        const nameCheckbox = "[name="+membre.prenom+"]";
        if($(nameCheckbox).is(':checked')) {
         listeId.push(membre._id);
         listeChecked[membre._id]=true;

        } else {
            const n = listeId.indexOf(membre._id);
            listeId.splice(n,1);
            const m = membre.inscriptions.indexOf(this.props.eveId);
            console.log(m)
            if (m>-1) RemoveInscriptions(this.props.eveId, membre._id);
            listeChecked[membre._id] = false;
        }
       setTimeout(() =>this.setState({membresAInscrire: listeId}));
       setTimeout(() =>this.setState({etatCheckbox: listeChecked}));
        
    }
    
    render() {
        const self = this;
        const membresFamille = Meteor.user().famille.map(function(membre) {
                return <Checkbox 
                            key={membre.prenom}
                            name={membre.prenom}
                            label={membre.prenom} 
                            onCheck={function() {self.selectionMembre(membre)}}
                            checked={self.state.etatCheckbox[membre._id]}
                            style={{width: 'auto', marginRight: 50}}
                            />;

            });
        return(
            <form className="padding" onSubmit={this.handleForm} ref="inscriptionActivites">
            {Meteor.user().adhesionFamille?
                <div>
                    <h4>Sélectionnez le ou les membres de votre famille à inscrire :</h4>
                        <div style={{width: '100%', display: 'flex', flexWrap: "wrap" ,flexDirection: 'row', justifyContent: 'flex-start'}}>
                        {membresFamille}
                        </div>
                </div>
            :null}
            
            </form>
            );
    }
}