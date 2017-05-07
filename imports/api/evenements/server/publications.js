import { Meteor } from 'meteor/meteor';
import { Evenements } from '../evenements';

Meteor.publish('evenements', () => Evenements.find());
