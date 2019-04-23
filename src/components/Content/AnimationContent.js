import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Animation from '../Animation';
import styles from './styles';

const AnimationContent = ({ classes }) => (
  <div className={classes.content}>
    <h2 className={classes.title}>Animation</h2>
    <Animation />
  </div>
);

AnimationContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AnimationContent);
