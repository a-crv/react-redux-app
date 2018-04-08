import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from '../Input';
import styles from './styles';

const Label = (props) => {
  const {
    classes,
    label: labelText,
    input: {
      name: fieldName
    }
  } = props;

  return (
    <label
      htmlFor={fieldName}
      className={classes.label}
    >
      {labelText}
      <Input id={fieldName} />
    </label>
  );
};

Label.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired
};

export default withStyles(styles)(Label);
