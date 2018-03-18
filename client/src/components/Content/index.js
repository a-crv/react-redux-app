import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, Posts, Chat } from './routes';

const Content = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/1" component={Posts} />
      <Route path="/2" component={Chat} />
    </Switch>
  </main>
);

export default Content;
