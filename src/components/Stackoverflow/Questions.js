import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withProps, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import get from 'lodash/get';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {
  FETCH_QUESTIONS_STACKOVERFLOW,
  FETCH_AUTHOR_QUESTIONS_STACKOVERFLOW
} from '../../constants/actions';
import { getStackoverflow } from '../../actions/stackoverflow';
import ReactTable from '../ReactTable';
import TableButton from '../TableButton';
import QuickToolbar from '../QuickToolbar';
import styles from './styles';

/* eslint-disable */
const createCustomCellWithLink = ({
  value,
  original: {
    question_id: id
  }
}) => (
  <Link to={`/stackoverflow/answers?id=${id}`} title={value}>
    {value}
  </Link>
);

const createCustomCellWithButton = param => dispatch => ({
  value,
  original,
  ...otherProps
}) => {
  console.log('otherProps', otherProps);
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
        key={`${tag}_${`${i}`.padStart(3, '00')}`}
      >
        #{tag}
      </span>
    ))
}];

const Questions = ({
  classes,
  columns,
  questions,
  isQuickToolbarVisible,
  handleToggleQuickToolbar
}) => (
  <div className={classes.container}>
    <ReactTable
      data={questions}
      columns={columns}
      defaultPageSize={10}
      getTdProps={(state, rowInfo, column, instance) => {
        console.log('A Td Element was clicked!')
        console.log('It was in this column:', column)
        console.log('It was in this row:', rowInfo)
        console.log('It was in this table instance:', instance)
        return {
          test: 'PREVED',
          onClick: (e, handleOriginal) => {

    
            // IMPORTANT! React-Table uses onClick internally to trigger
            // events like expanding SubComponents and pivots.
            // By default a custom 'onClick' handler will override this functionality.
            // If you want to fire the original onClick handler, call the
            // 'handleOriginal' function.
            if (handleOriginal) {
              handleOriginal()
            }
          }
        }
      }}
    />
    <Button
      className={classes.button}
      onClick={handleToggleQuickToolbar}
    >
      Open quick toolbar
    </Button>
    <QuickToolbar
      isOpen={isQuickToolbarVisible}
      handleClose={handleToggleQuickToolbar}
    />
  </div>
);

Questions.defaultProps = {
  columns: [],
  questions: []
};

Questions.propTypes = {
  columns: PropTypes.array,
  questions: PropTypes.array,
  classes: PropTypes.object.isRequired,
  isQuickToolbarVisible: PropTypes.bool.isRequired,
  handleToggleQuickToolbar: PropTypes.func.isRequired
};

const mapStateToProps = ({ stackoverflow: { questions } }) => ({
  questions
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchQuestions: getStackoverflow
  }),
  withState('isQuickToolbarVisible', 'setQuickToolbar', false),
  withHandlers({
    handleToggleQuickToolbar: ({
      isQuickToolbarVisible,
      setQuickToolbar
    }) => () =>
      setQuickToolbar(!isQuickToolbarVisible)
  }),
  lifecycle({
    componentWillMount() {
      const {
        location: { search },
        fetchQuestions,
        questions
      } = this.props;

      if (questions.length === 0) {
        const params = new URLSearchParams(search);
        const body = params.get('body');
        const pagesize = params.get('pagesize');

        fetchQuestions(
          FETCH_QUESTIONS_STACKOVERFLOW,
          '/search/advanced', { body, pagesize }
        );
      }
    }
  }),
  withProps(({ fetchQuestions }) => ({
    columns: createColumns(fetchQuestions)
  })),
  withStyles(styles)
)(Questions);
