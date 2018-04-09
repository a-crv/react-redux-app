import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const Input = (props) => {
  const {
    type,
    input,
    classes
  } = props;

  return (
    <input
      {...input}
      type={type}
      className={classes.main}
    />
  );
};

Input.defaultProps = {
  classes: null
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(Input);
