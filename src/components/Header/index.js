import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { handleDrawerToggleEnhancer } from '../../enhancers';
import styles from './styles';
import './logo-animation.css';

const Header = ({ classes, handleDrawerToggle }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Menu"
        className={classes.navIcon}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Typography variant="title" color="inherit">
              Одын
            </Typography>
          )}
        />
        <Route
          path="/posts"
          render={() => (
            <Typography variant="title" color="inherit">
              Два
            </Typography>
          )}
        />
        <Route
          path="/chat"
          render={() => (
            <Typography variant="title" color="inherit">
              Три
            </Typography>
          )}
        />
      </Switch>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  handleDrawerToggleEnhancer
)(Header);
