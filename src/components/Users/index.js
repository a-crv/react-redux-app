import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import fetchUsers from '../../actions/mongodb';

const Users = ({
  error, users
}) => {
  if (error) {
    return <div>{error}</div>;
  }

  return users.map(user => (
    <li key={user.id}>
      {`${user.name.firstName} ${user.name.lastName}`}
      <div>
        {user.aboutAuthor}
      </div>
    </li>
  ));
};

const mapStateToProps = ({ mongodb: { users, error } }) => ({
  users,
  error
});

export default compose(
  connect(mapStateToProps, {
    fetchUsersFromMongo: fetchUsers
  }),
  lifecycle({
    componentWillMount() {
      const { fetchUsersFromMongo } = this.props;
      fetchUsersFromMongo();
    }
  })
)(Users);
