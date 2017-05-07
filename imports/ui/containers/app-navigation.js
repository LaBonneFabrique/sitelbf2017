import container from '../../modules/container.js';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';

const composer = (props, onData) => {
  onData(null, { hasUser: Meteor.user()});
};

export default container(composer, AppNavigation)
