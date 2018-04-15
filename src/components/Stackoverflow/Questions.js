import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import get from 'lodash/get';
import { withStyles } from 'material-ui/styles';
import {
  FETCH_QUESTIONS_STACKOVERFLOW,
  FETCH_AUTHOR_QUESTIONS_STACKOVERFLOW
} from '../../constants/actions';
import getStackoverflow from '../../actions/stackoverflow';
import ReactTable from '../ReactTable';
import TableButton from '../TableButton';
import styles from './styles';

/* eslint-disable */
const createCustomCellWithLink = ({
  value,
  original: {
    question_id: id
  }
}) => (
  <Link to={`/question?id=${id}`} title={value}>
    {value}
  </Link>
);

const createCustomCellWithButton = param => dispatch => ({
  value,
  original,
  ...otherProps
}) => {
  const authorID = get(original, param, null);

  return (
    <TableButton
      onClick={() => dispatch(
        FETCH_AUTHOR_QUESTIONS_STACKOVERFLOW,
        `/users/${authorID}/questions`
      )}
    >
      {value}
    </TableButton>
  );
};
/* eslint-enable */

const createColumns = dispatch => [{
  Header: 'Автор вопроса',
  accessor: 'owner.display_name',
  Cell: createCustomCellWithButton('owner.user_id')(dispatch)
}, {
  Header: 'Тема вопроса',
  accessor: 'title',
  Cell: createCustomCellWithLink
}, {
  Header: 'Кол-во ответов',
  accessor: 'answer_count',
  Cell: createCustomCellWithLink
}, {
  Header: 'Тэги',
  accessor: 'tags',
  Cell: ({
    value: tags
  }) =>
    tags.map((tag, i) => (
      <span
        className="slack"
        key={`${tag}_${`${i}`.padStart(3, '00')}`}
      >
        #{tag}
      </span>
    ))
}];

const Questions = ({
  classes,
  columns,
  questions
}) => (
  <div className={classes.container}>
    <ReactTable
      data={questions}
      columns={columns}
      defaultPageSize={10}
      getTdProps={(state, rowInfo, column, instance) => ({
        onClick: (event, handleOriginal) => {
          console.log('state', state);
          console.log('it produced this event:', event);
          console.log('It was in this column:', column);
          console.log('It was in this row:', rowInfo);
          console.log('It was in this table instance:', instance);

          if (handleOriginal) {
            handleOriginal();
          }
        }
      })}
    />
  </div>
);

Questions.defaultProps = {
  columns: [],
  questions: []
};

Questions.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array,
  questions: PropTypes.array
};

const mapStateToProps = ({ stackoverflow: { questions } }) => ({
  questions
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchQuestions: getStackoverflow
  }),
  lifecycle({
    componentWillMount() {
      const {
        location: { search },
        fetchQuestions
      } = this.props;
      const params = new URLSearchParams(search);
      // const filter = params.get('filter');
      const pagesize = params.get('pagesize');

      fetchQuestions(
        FETCH_QUESTIONS_STACKOVERFLOW,
        '/questions', { pagesize }
      );
    }
  }),
  withProps(({ fetchQuestions }) => ({
    columns: createColumns(fetchQuestions)
  })),
  withStyles(styles)
)(Questions);
