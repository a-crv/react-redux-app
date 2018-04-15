import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { FETCH_ANSWERS_FOR_QUESTIONS_STACKOVERFLOW } from '../../constants/actions';
import getStackoverflow from '../../actions/stackoverflow';
import ReactTable from '../ReactTable';
import styles from './styles';

const columns = [{
  Header: 'Автор вопроса',
  accessor: 'owner.display_name'
}, {
  Header: 'Тема вопроса',
  accessor: 'title'
}, {
  Header: 'Кол-во ответов',
  accessor: 'answer_count'
}, {
  Header: 'Тэги',
  accessor: 'tags'
}];

const Question = ({
  classes,
  answeres
}) => (
  <div className={classes.container}>
    <ReactTable
      data={answeres}
      columns={columns}
      defaultPageSize={10}
    />
  </div>
);

Question.defaultProps = {
  answeres: []
};

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  answeres: PropTypes.array
};

const mapStateToProps = ({ stackoverflow: { answeres } }) => ({
  answeres
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchAnswersForQuestion: getStackoverflow
  }),
  lifecycle({
    componentWillMount() {
      const {
        location: { search },
        fetchAnswersForQuestion
      } = this.props;
      const params = new URLSearchParams(search);
      const id = params.get('id');

      console.log('123123213213');

      fetchAnswersForQuestion(
        FETCH_ANSWERS_FOR_QUESTIONS_STACKOVERFLOW,
        `/questions/${id}/answeres`
      );
    }
  }),
  withStyles(styles)
)(Question);
