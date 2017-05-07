import React from 'react';
//import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import {PublicNavigation} from './public-navigation';
import { AuthenticatedNavigation } from './authenticated-navigation';
// bascule vers material-ui
import {Toolbar} from 'material-ui/Toolbar';

export class AppNavigation extends React.Component {
  renderNavigation(hasUser) {
    return hasUser ? <AuthenticatedNavigation /> : <PublicNavigation />;
  }

  render() {
    return (
    <header>
    <Toolbar>
    <Link to="/"><img className="logo" src="assets/logoBF.png" /></Link>

        { this.renderNavigation(this.props.hasUser) }

    </Toolbar>
    </header>
    
    );
  }
}

AppNavigation.propTypes = {
  hasUser: React.PropTypes.object,
};
