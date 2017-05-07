import container from '../../modules/container.js';
import { Loading } from '../components/loading.js';
import {ListeImagesEvenement} from   '../components/listeImagesEvenement.js';
import { Images } from '../../api/images/images.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('images');
  if (subscription.ready()) {
  const images = Images.find({"meta.structure": params.structure}).fetch();
  onData(null, { images });

  }
};

export default container(composer, ListeImagesEvenement, Loading);