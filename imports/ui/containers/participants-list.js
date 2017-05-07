import container from '../../modules/container.js';
import { Loading } from '../components/loading.js';
import {ParticipantsList} from   '../components/participants-list.js';
//import { Users } from '../../api/users/users.js';
import { Evenements } from '../../api/evenements/evenements.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  //const subscriptionUsers = Meteor.subscribe('utilisateurs');
  const subscription = Meteor.subscribe('evenements');
  if (subscription.ready()) {
  const evenements = Evenements.find({inscription: true}, { sort: { start: 1 } }).fetch();
 
  //const users = Users.find().fetch();
  if (evenements.length>0) {
    onData(null, { evenements });
  }
  }
};

export default container(composer, ParticipantsList, Loading);
