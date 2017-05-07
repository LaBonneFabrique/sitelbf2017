import container from '../../modules/container.js';
import { Loading } from '../components/loading.js';
import {PageAdherent} from   '../components/pageAdherent.js';
import { Users } from '../../api/users/users.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('utilisateurs');
  if (subscription.ready()) {
  let IdUtilisateur = Meteor.userId();

  const loggedUser = Users.findOne({_id: IdUtilisateur},{});

  if (loggedUser) {
    onData(null, { loggedUser });
  }
  }
};

export default container(composer, PageAdherent, Loading);
