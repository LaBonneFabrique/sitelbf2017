import container from '../../modules/container.js';
import { Loading } from '../components/loading.js';
import {Connexion} from   '../components/connexionModal.js';
import { Users } from '../../api/users/users.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('utilisateurs');
  if (subscription.ready()) {

 
  const users = Users.find().fetch();
  if (users.length>0) {
    onData(null, { users });
  }
  }
};

export default container(composer, Connexion, Loading);
