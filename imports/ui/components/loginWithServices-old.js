import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import FontAwesome from 'react-fontawesome';

import { browserHistory } from 'react-router'

var services = [{
  service: 'github',
  texte: 'Github',
  dataSocialLogin: 'loginWithGithub'
},
{
  service: 'facebook',
  texte: 'Facebook',
  dataSocialLogin: 'loginWithFacebook'
},
{
  service: 'twitter',
  texte: 'Twitter',
  dataSocialLogin: 'loginWithTwitter'
}
]

export const LoginWithServices = React.createClass({
  onClic: function(dataSocialLogin) {
    const options = {};
   
    Meteor[ dataSocialLogin ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      } else {browserHistory.push('/agenda');}
    });
    

  
  },
  render: function() {
    return (<Row>
     
    {services.map((service) => (
    <Button  bsStyle="primary" className="btn-space" key={service.service} onClick={() => (this.onClic(service.dataSocialLogin))}><FontAwesome name={service.service} size='2x'/> {service.texte} </Button>
    ))}
  
    </Row>
    );
  }
  
})

