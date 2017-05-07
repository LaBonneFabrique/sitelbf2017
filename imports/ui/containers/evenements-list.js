import container from '../../modules/container.js';
import { Evenements } from '../../api/evenements/evenements.js';
import { EvenementsList } from '../components/evenements-list.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('evenements');
 if (subscription.ready()) {
   const evenements = Evenements.find().fetch();
    onData(null, { evenements });
  }
};

export default container(composer, EvenementsList, Loading);
