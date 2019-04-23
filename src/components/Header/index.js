import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { handleDrawerToggleEnhancer } from '../../enhancers';
import styles from './styles';
import './logo-animation.css';

const Header = ({ classes, handleDrawerToggle }) => (
  <AppBar className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <IconButton
        color="inherit"
        aria-label="Menu"
        className={classes.navIcon}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
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
