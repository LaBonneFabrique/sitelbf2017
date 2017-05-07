import {FormulaireUpload} from '../components/formulaireUpload.js';
import container from '../../modules/container.js';
import { Loading } from '../components/loading.js';
import { Images } from '../../api/images/images.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('files.images.all');
  if (subscription.ready()) {
  const listeImages = Images.find();
  if (listeImages) {
    onData(null, { listeImages });
  }
  }
};

export default container(composer, FormulaireUpload, Loading)();