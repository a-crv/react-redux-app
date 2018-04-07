import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const Label = (props) => {
  const {
    name,
    ...otherProps
  } = props;

  return (
    <label
      htmlFor={name}
      {...otherProps}
    >
      Privet
    </label>
  );
};

Label.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(Label);
