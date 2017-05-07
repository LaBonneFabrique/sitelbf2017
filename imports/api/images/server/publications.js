import { Meteor } from 'meteor/meteor';
import {Images} from '../images.js';

//Images.denyClient();
/*
Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });*/
  
  
Meteor.publish('images', () => Images.find().cursor);