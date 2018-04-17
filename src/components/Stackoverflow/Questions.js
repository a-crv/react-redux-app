import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers, setStatic } from 'recompose';
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

const createCustomCellWithButton = param => ({
  value,
  original,
  tdProps: {
    rest: {
      props: {
        fetchQuestions,
        toggleQuickToolbar
      }
    }
  }
}) => {
  const authorID = get(original, param, null);

  return (
    <TableButton
      onClick={() => fetchQuestions(
        FETCH_AUTHOR_QUESTIONS_STACKOVERFLOW,
        `/users/${authorID}/questions`,
        toggleQuickToolbar
      )}
    >
      {value}
    </TableButton>
  );
};
/* eslint-enable */

const columns = [{
  Header: 'Автор вопроса',
  accessor: 'owner.display_name',
  Cell: createCustomCellWithButton('owner.user_id')
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
  questions,
  fetchQuestions,
  isQuickToolbarVisible,
  handleToggleQuickToolbarClick
}) => (
  <div className={classes.container}>
    <ReactTable
      data={questions}
      columns={columns}
      defaultPageSize={10}
      getTdProps={() => ({
        props: {
          fetchQuestions,
          toggleQuickToolbar: handleToggleQuickToolbarClick
        }
      })}
    />
    <Button
      className={classes.button}
      onClick={handleToggleQuickToolbarClick}
    >
      Open quick toolbar
    </Button>
    <QuickToolbar
      isOpen={isQuickToolbarVisible}
      handleClose={handleToggleQuickToolbarClick}
    />
  </div>
);

Questions.defaultProps = {
  columns: [],
  questions: []
};

Questions.propTypes = {
  questions: PropTypes.array,
  classes: PropTypes.object.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  isQuickToolbarVisible: PropTypes.bool.isRequired,
  handleToggleQuickToolbarClick: PropTypes.func.isRequired
};

const mapStateToProps = ({ stackoverflow: { questions } }) => ({
  questions
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchQuestions: getStackoverflow
  }),
  setStatic('getDerivedStateFromProps', (nextProps, prevState) => {
    const {
      location: { search },
      fetchQuestions,
      questions
    } = nextProps;

    if (questions.length === 0) {
      const params = new URLSearchParams(search);
      const body = params.get('body');
      const pagesize = params.get('pagesize');

      fetchQuestions(
        FETCH_QUESTIONS_STACKOVERFLOW,
        '/search/advanced', { body, pagesize }
      );
    }

    return null;
  }),
  withState('isQuickToolbarVisible', 'setQuickToolbar', false),
  withHandlers({
    handleToggleQuickToolbarClick: ({
      isQuickToolbarVisible,
      setQuickToolbar
    }) => () =>
      setQuickToolbar(!isQuickToolbarVisible)
  }),
  withStyles(styles)
)(Questions);
