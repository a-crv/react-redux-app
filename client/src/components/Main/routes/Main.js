import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  withState
} from 'recompose';

const Main = ({ error, users }) => (
  error || users.map(user => (
    <li key={user.id}>
      {`${user.name.firstName} ${user.name.lastName}`}
      <div>
        {user.aboutAuthor}
      </div>
    </li>
  ))
);

Main.propTypes = {
  error: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired
};

export default compose(
  withState('error', 'setError', ''),
  withState('users', 'setUsers', []),
  lifecycle({
    componentDidMount() {
      const { setUsers, setError } = this.props;

      fetch('/api/authors')
        .then(res => res.json())
        .then(users => setUsers(users))
        .catch(error => setError(error));
    }
  })
)(Main);
