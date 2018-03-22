import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Main as MainContent, Posts, Chat } from './routes';
import styles from './styles';

const Main = ({ classes }) => (
  <main className={classes.main}>
    <div className={classes.toolbar} />
    <Switch>
      <Route exact path="/" component={MainContent} />
      <Route path="/1" component={Posts} />
      <Route path="/2" component={Chat} />
    </Switch>
  </main>
);

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
