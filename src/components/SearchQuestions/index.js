import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import styles from './styles';

const Search = ({
  classes
}) => (
  <div className={classes.container}>
    <input type="text" className={classes.searchField} />
    <Button
      variant="raised"
      color="primary"
      className={classes.searchButton}
    >
      Найти
    </Button>
  </div>
);

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
