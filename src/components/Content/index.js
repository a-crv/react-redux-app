import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Questions, Question } from '../Stackoverflow';
import Home from './Home';
import Stackoverflow from './Stackoverflow';
import Posts from './Posts';
import Chat from './Chat';
import styles from './styles';

const Content = ({ classes }) => (
  <main className={classes.container}>
    <div className={classes.toolbar} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/stackoverflow" component={Stackoverflow} />
      <Route path="/stackoverflow/question" component={Question} />
      <Route path="/stackoverflow/questions" component={Questions} />
      <Route path="/posts" component={Posts} />
      <Route path="/chat" component={Chat} />
    </Switch>
  </main>
);

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Content);
