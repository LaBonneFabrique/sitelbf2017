import container from '../../modules/container.js';
import { Loading } from '../components/loading.js';
import {CreateDropzone} from   '../components/dropzone.js';
import { Images } from '../../api/images/images.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('images');
  if (subscription.ready()) {
  const images = Images.find().fetch();
  onData(null, { images });

  }
};

export default container(composer, CreateDropzone, Loading);