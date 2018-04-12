import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Users from '../Users';
import styles from './styles';

const Posts = ({ classes }) => (
  <div className={classes.content}>
    <h2 className={classes.title}>Posts</h2>
    <Users />
  </div>
);

Posts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Posts);
