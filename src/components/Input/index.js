import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const Input = (props) => {
  const {
    classes,
    ...otherProps
  } = props;

  return (
    <input
      className={classes.main}
      {...otherProps}
    />
  );
};

Input.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Input);
