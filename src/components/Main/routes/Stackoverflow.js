import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Search as SearchStackoverflowQuestions } from '../../Stackoverflow';
import style from './styles';

const Stackoverflow = ({
  classes
}) => (
  <div className={classes.container}>
    <h2 className={classes.title}>Stackoverflow</h2>
    <SearchStackoverflowQuestions />
  </div>
);

Stackoverflow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Stackoverflow);
