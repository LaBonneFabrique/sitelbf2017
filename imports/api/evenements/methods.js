import { Evenements } from './evenements';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertEvenement = new ValidatedMethod({
  name: 'evenements.insert',
  validate: Evenements.schema.validator(),
  run(evenement) {
    Evenements.insert(evenement);
  },
})

export const removeEvenement = new ValidatedMethod({
  name: 'evenements.remove',
    validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Evenements.remove(_id);
  },
});

export const updateEvenement = new ValidatedMethod({
  name: 'evenements.update',
  validate: new SimpleSchema({
        evenementId: {
            type: String
        },
        update: {
            type: Object,
            blackbox: true
        }
    }).validator(),
  run({ evenementId, update }) {
    Evenements.update(evenementId, { $set: update });
  },
});

export const updateInscrits = new ValidatedMethod({
  name: 'evenements.updateInscrits',
  validate: new SimpleSchema({
        evenementId: {
            type: String
        },
        "update.creneaux": {
            type: Array
        },
        "update.creneaux.$._id": {
          type:String
        },
        "update.creneaux.$.horaire": {
          type: String
        },
        "update.creneaux.$.places": {
          type: Number
        },
        "update.creneaux.$.inscrits": {
          type: Array
        }
    }).validator(),
  run({ evenementId, update }) {
    Evenements.update(evenementId, { $set: update });
  },
});