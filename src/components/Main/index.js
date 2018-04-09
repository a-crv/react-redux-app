import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import {
  Main as MainContent,
  Stackoverflow,
  Posts,
  Chat
} from './routes';
import styles from './styles';

const Main = ({ classes }) => (
  <main className={classes.main}>
    <div className={classes.toolbar} />
    <Switch>
      <Route exact path="/" component={MainContent} />
      <Route exact path="/stackoverflow" component={Stackoverflow} />
      <Route path="/stackoverflow/questions" component={Posts} />
      <Route path="/posts" component={Posts} />
      <Route path="/chat" component={Chat} />
    </Switch>
  </main>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
