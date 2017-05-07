import { Meteor } from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';

Meteor.publish('utilisateurs', function () {
  return Meteor.users.find({}, {fields: {'profile': 1, 'services': 1, 'emails': 1, 'reglageService': 1, 'adhesionFamille': 1, 'famille':1, 'roles': 1}});
});