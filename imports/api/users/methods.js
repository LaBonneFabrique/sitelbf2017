import { Users } from './users';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import {Roles} from 'meteor/alanning:roles';

export const updateProfile = new ValidatedMethod({
  name: 'user.updateProfile',
  validate: new SimpleSchema ({
    usereId: {
      type: String
    },
    update: {
      type: Object
    },
    'update.profile': {
      type:Object
    },
    'update.profile.nom': {
      type: String
    },
    'update.profile.prenom': {
      type: String
    },
    'update.emails': {
       type: Array,
    },
    "update.emails.$": {
      type: Object
    },
    "update.emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "update.emails.$.verified": {
      type: Boolean
    },
    "update.adhesionFamille": {
      type:Boolean
    },
    "update.famille": {
      type: Array
    },
    "update.famille.$": {
      type: Object
    },
    "update.reglageService": {
      type: Boolean
    },
    "update.roles": {
      type: Array
    },
    "update.roles.$": {
      type:String
    }
  }).validator(),
  run({ usereId, update }) {
  Users.update(usereId, { $set: update });
  },
});

export const updateReglageService = new ValidatedMethod({
  name: 'user.updateReglageProfile',
  validate: new SimpleSchema({
    userId: {
      type: String
    },
    'update.reglageService': {
      type: Boolean
    }
  }).validator(),
  run({userId, update}) {
    Users.update(userId, {$set: update});
  }
});

export const ajoutMembreFamille = new ValidatedMethod({
  name: 'user.ajoutMembreFamille',
  validate: new SimpleSchema({
    "userId": {
      type: String,
      optional: true
    },
    "update.famille": {
      type: Array,
      optional: true
    },
    
    "update.famille.$": {
      type: Object,
      optional: true
    },
    "update.famille.$._id": {
      type: String
    },
    "update.famille.$.nom": {
      type: String,
      optional: true
    },
    "update.famille.$.prenom": {
      type: String,
      optional: true
    },
    "update.famille.$.age": {
      type: Date,
      optional: true
    },
    "update.famille.$.inscriptions": {
      type: Array,
      optional: true
    },
    "update.famille.$.inscriptions.$": {
      type: String,
      optional: true
    },
}).validator(),
  run({userId, update}) {
    Users.update(userId, {$set: update});
  }
  
});

export const updateFamille = new ValidatedMethod({
  name: 'user.updateFamille',
  validate: new SimpleSchema ({
    userId: {
      type: String
    },
    update: {
      type: Object
    },
    'update.famille': {
      type: Array
    },
    'update.famille.$': {
      type: Object
    },
    'update.famille.$._id': {
        type: String
    },
    'update.famille.$.prenom': {
        type: String,
        optional: true
    },
    'update.famille.$.nom': {
        type: String,
        optional: true
    },
    'update.famille.$.age': {
      type: Date,
      optional: true
    },
    'update.famille.$.inscriptions': {
        type: Array,
        optional: true
    },
    'update.famille.$.inscriptions.$': {
        type: String,
        optional: true
    }
  }).validator(),
  run({ userId, update }) {
  Users.update(userId, { $set: update });
  },
})

export const updateRoles = new ValidatedMethod({
  name: 'user.updateRoles',
  validate: new SimpleSchema({
    userId: {
      type: String
    },
    newRoles: {
      type: Array
    },
    "newRoles.$": {
      type: String
    }
  }).validator(),
  run({userId, newRoles}) {
    Roles.setUserRoles(userId, newRoles);
  }
})