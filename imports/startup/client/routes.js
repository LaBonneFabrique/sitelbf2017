import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app';
import { Index } from '../../ui/pages/index';
import { NotFound } from '../../ui/pages/not-found.js';
import { RecoverPassword } from '../../ui/pages/recover-password.js';
import { ResetPassword } from '../../ui/pages/reset-password.js';
import { planningAgenda } from '../../ui/pages/agenda';
//import testUpload from '../../ui/containers/testUpload';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import PageAdherent from '../../ui/containers/pageAdherent';
import UsersList from '../../ui/containers/users-list';
import ParticipantsList from '../../ui/containers/participants-list';
import {Roles} from 'meteor/alanning:roles';


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const requireRole = (nextState, replace) => {
  const role = Roles.userIsInRole(Meteor.userId(),['admin', 'college']);
    if ((!Meteor.loggingIn() && !Meteor.userId()) || !role) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="accueil" component={ Index } />

        <Route name="pageAdherent" path="/pageAdherent" component={ PageAdherent } onEnter={ requireAuth } />
        <Route name="UsersList" path="/listeAdherents" component={ UsersList } onEnter= {requireRole} />
        <Route name="ParticipantsList" path="/participants" component={ ParticipantsList } onEnter={requireRole} />
        <Route path="/signin" component={ Accounts.ui.LoginForm } formState={ STATES.SIGN_IN } />
        <Route name="recover-password" path="/oubliMDP" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="agenda" path="/agenda" component={ planningAgenda } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
