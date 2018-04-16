import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { compose, withHandlers } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { clearQuestions } from '../../actions/stackoverflow';
import Label from '../Label';
import styles from './styles';

const FORM_NAME = 'Stackoverflow';

const lower = value => value && value.toLowerCase();
const lessThan = minValue => (value, previousValue) => {
  if (value > minValue) return value;
  return previousValue;
};

const Search = ({
  classes,
  handleFetchQuestionsClick
}) => (
  <div className={classes.container}>
    <Grid container spacing={24}>
      <Grid item xs={6}>
        <Field
          label="Фильтр"
          component={Label}
          name="body"
          type="text"
          normalize={lower}
        />
      </Grid>
      <Grid item xs={3}>
        <Field
          label="Количество вопросов"
          component={Label}
          name="pagesize"
          type="number"
          normalize={lessThan(0)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="raised"
          color="primary"
          className={classes.searchButton}
          onClick={handleFetchQuestionsClick}
        >
          Найти
        </Button>
      </Grid>
    </Grid>
  </div>
);

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFetchQuestionsClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const formValues = getFormValues(FORM_NAME)(state);

  return {
    formValues
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    dispatchClearQuestions: clearQuestions
  }),
  reduxForm({
    form: FORM_NAME,
    initialValues: {
      body: '',
      pagesize: 1
    }
  }),
  withStyles(styles),
  withHandlers({
    handleFetchQuestionsClick: ({
      formValues,
      dispatchClearQuestions,
      history: { push }
    }) => () => {
      const { pagesize, body } = formValues;
      dispatchClearQuestions();
      push(`/stackoverflow/questions?body=${body}&pagesize=${pagesize}`);
    }
  })
)(Search);
