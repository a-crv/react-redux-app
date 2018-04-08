import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const Input = (props) => {
  const {
    id,
    classes
  } = props;

  return (
    <input
      id={id}
      type="text"
      className={classes.main}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Input);
