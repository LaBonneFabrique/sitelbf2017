import {Images} from './images';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const supprimeImage = new ValidatedMethod({
  name: 'images.supprime',
    validate: new SimpleSchema({
    id: { type: String },
  }).validator(),
  run({ id }) {
    Images.remove(id);
  },
});

export const newVersion = new ValidatedMethod({
  name: 'images.subversion',
  validate: new SimpleSchema({
    fileId: {type: String},
    update: {type: Object, blackbox: true},
    
  }).validator(),
  run({fileId, update}) {
    //const versions = Images.findOne({id}).fetch().versions;
  
    Images.update(fileId,{$set: {versions: update} });
  }
});


