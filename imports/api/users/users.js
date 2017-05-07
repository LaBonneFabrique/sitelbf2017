import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Users = Meteor.users;

Users.UserProfile = new SimpleSchema({
    prenom: {
        type: String,
        optional: true
    },
    nom: {
        type: String,
        optional: true
    },
    dateAdhesion: {
        type: Date,
        optional: true
    }
});

Users.Famille = new SimpleSchema({
    _id: {
        type: String
    },
    prenom: {
        type: String,
        optional: true
    },
    nom: {
        type: String,
        optional: true
    },
    age: {
      type: Date,
      optional: true
    },
    inscriptions: {
        type: Array,
        optional: true
    }
}); 

Users.User = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Users.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Array,
        optional: true,
        blackbox: true
    },
    reglageService: {
        type: Boolean,
        optional: true
    },
    //La table des id des activités passées et à venir auxquelles l'utilisateur s'est inscrit
    inscriptions: {
        type: Array,
        optional: true
    },
    adhesionFamille: {
        type: Boolean,
        optional: true
    },
    famille: {
        type:Array,
        optional: true
    },
    "famille.$": {
        type: Users.Famille
    }
});

Meteor.users.attachSchema(Users.User);
