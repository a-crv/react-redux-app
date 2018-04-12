import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';
import styles from './styles';

const App = ({ classes }) => (
  <div className={classes.page}>
    <Header />
    <Sidebar />
    <Content />
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired

};

export default withStyles(styles)(App);
