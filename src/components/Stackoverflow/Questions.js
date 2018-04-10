import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import fetchStackoverflowQuestions from '../../actions/stackoverflow';
import ReactTable from '../ReactTable';
import styles from './styles';

const columns = [{
  Header: 'Автор вопроса',
  accessor: 'owner.display_name'
}, {
  Header: 'Тема вопроса',
  accessor: 'title',
  Cell: ({ value: title }) =>
    <span title={title}>{title}</span>
}, {
  Header: 'Кол-во ответов',
  accessor: 'answer_count'
}, {
  Header: 'Тэги',
  accessor: 'tags',
  Cell: ({ value: tags }) => tags.map(tag => <span>#{tag}</span>)
}];

const Questions = ({
  classes,
  questions
}) => (
  <div className={classes.container}>
    <ReactTable
      data={questions}
      columns={columns}
      defaultPageSize={10}
    />
  </div>
);

Questions.defaultProps = {
  questions: []
};

Questions.propTypes = {
  classes: PropTypes.object.isRequired,
  questions: PropTypes.array
};

const mapStateToProps = ({ stackoverflow: { questions } }) => ({
  questions
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchQuestions: fetchStackoverflowQuestions
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

      fetchQuestions(pagesize);
    }
  }),
  withStyles(styles)
)(Questions);
