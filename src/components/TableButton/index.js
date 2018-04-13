import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const TableButton = ({
  classes,
  children,
  ...otherProps
}) => (
  <button className={classes.button} {...otherProps}>
    {children}
  </button>
);

TableButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(TableButton);
