import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Label from '../Label';
import styles from './styles';

const Search = ({
  classes
}) => (
  <div className={classes.container}>
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <Field
          component={Label}
          label="Имя"
          name="title"
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          component={Label}
          label="Количество запросов"
          name="pagesize"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="raised"
          color="primary"
          className={classes.searchButton}
        >
          Найти
        </Button>
      </Grid>
    </Grid>
  </div>
);

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  reduxForm({
    form: 'Stackoverflow'
  }),
  withStyles(styles)
)(Search);
