import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Home = ({ classes }) => (
  <div className={classes.content}>
    <h2 className={classes.title}>Home</h2>
    Hello! This is test page. If you want to see other links, you must registration on this site.
  </div>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
