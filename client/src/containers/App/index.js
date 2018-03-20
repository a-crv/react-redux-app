import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import styles from './styles';

const App = ({ classes }) => (
  <div className={classes.page}>
    <Header />
    <Sidebar />
    <Main />
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired

};

export default withStyles(styles)(App);
