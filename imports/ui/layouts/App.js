import React from 'react';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; // bascule vers materialize
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/app-navigation';

//theme de base material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    Session.set("Mongol_settings_display", true);
    return  <MuiThemeProvider>
    
    <div className="wrapper">

    <AppNavigation />
    <nav>
      menu principal
    </nav>
      <Grid className="containerLBF">
        { this.props.children }
      </Grid>

        </div></MuiThemeProvider>;
  },
});
