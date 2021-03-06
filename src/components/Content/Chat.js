import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Chat = ({ classes }) => (
  <div className={classes.content}>
    <h2 className={classes.title}>Chat</h2>
  </div>
);

Chat.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chat);
