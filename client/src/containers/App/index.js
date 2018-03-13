import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './styles.css';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const Home1 = () => (
  <div>
    <h2>Home1</h2>
  </div>
);

const Home2 = () => (
  <div>
    <h2>Home2</h2>
  </div>
);

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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/1" component={Home1} />
          <Route path="/2" component={Home2} />
        </Switch>
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
