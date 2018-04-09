import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from '../Input';
import styles from './styles';

const Label = (props) => {
  const {
    type,
    input,
    classes,
    className,
    label: labelText
  } = props;

  return (
    <label className={className}>
      <span
        className={classes.label}
        title={labelText}
      >
        {labelText}
      </span>
      <Input input={input} type={type} />
    </label>
  );
};

Label.defaultProps = {
  type: null,
  className: null
};

Label.propTypes = {
  type: PropTypes.string,
  className: PropTypes.object,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Label);
