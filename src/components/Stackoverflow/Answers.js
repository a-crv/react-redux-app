import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { FETCH_ANSWERS_FOR_QUESTIONS_STACKOVERFLOW } from '../../constants/actions';
import { getStackoverflow } from '../../actions/stackoverflow';
import ReactTable from '../ReactTable';
import styles from './styles';

/* eslint-disable */
const columns = [{
  Header: 'Аватарка',
  accessor: 'owner.profile_image',
  Cell: ({ value }) => <Avatar alt="Аватарка" src={value} />
}, {
  Header: 'Автор',
  accessor: 'owner.display_name'
}, {
  Header: 'Репутация',
  accessor: 'owner.reputation'
}, {
  Header: 'Ссылка на профиль',
  accessor: 'owner.link',
  Cell: ({ value }) => <Link to={value} target="_blank">Link to profile</Link>
}];
/* eslint-enable */

const Answers = ({
  classes,
  answers,
  fetching
}) => (
  fetching ?
    null :
    <div className={classes.container}>
      <ReactTable
        data={answers}
        columns={columns}
        defaultPageSize={10}
      />
    </div>
);

Answers.defaultProps = {
  answers: [],
  fetching: false
};

Answers.propTypes = {
  classes: PropTypes.object.isRequired,
  answers: PropTypes.array,
  fetching: PropTypes.bool
};

const mapStateToProps = ({ stackoverflow: { fetching, answers } }) => ({
  answers,
  fetching
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    fetchAnswersForQuestion: getStackoverflow
  }),
  lifecycle({
    componentDidMount() {
      const {
        location: { search },
        fetchAnswersForQuestion
      } = this.props;
      const params = new URLSearchParams(search);
      const id = params.get('id');

      fetchAnswersForQuestion(
        FETCH_ANSWERS_FOR_QUESTIONS_STACKOVERFLOW,
        `/questions/${id}/answers`
      );
    }
  }),
  withStyles(styles)
)(Answers);
