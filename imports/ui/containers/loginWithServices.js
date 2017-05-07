import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { LoginWithServices } from '../components/loginWithServices';
import container from '../../modules/container.js';

const composer = (params, onData) => {
onData(null, Accounts.loginServicesConfigured());
};

export default container(composer, LoginWithServices, Loading);