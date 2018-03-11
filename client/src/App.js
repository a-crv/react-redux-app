import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'material-ui/Button';

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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button variant="raised" color="primary">
          Hello World
        </Button>
        <p className="App-intro">
          {
            this.state.error || this.state.users.map(user =>
              <li key={user.id}>
                {`${user.name.firstName} ${user.name.lastName}`}
              </li>
            )
          }
        </p>
      </div>
    );
  }
}

export default App;
