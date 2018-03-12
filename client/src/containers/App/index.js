import React, { Component } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './styles.css';

class App extends Component {
  state = {
    error: null,
    users: []
  }

  componentDidMount() {
    fetch('/api/authors')
      .then(res => res.json())
      .then(users => this.setState({ users }))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <p>
          {
            this.state.error || this.state.users.map(user => (
              <li key={user.id}>
                {`${user.name.firstName} ${user.name.lastName}`}
                <div>
                  {user.aboutAuthor}
                </div>
              </li>
            ))
          }
        </p>
      </div>
    );
  }
}

export default App;
