import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import styles from './styles';
import sidebarItems from './sidebarItems';

const Sidebar = ({
  theme,
  classes,
  mobileOpen,
  handleDrawerToggle
}) => ([
  <Hidden mdUp>
    <Drawer
      variant="temporary"
      anchor={theme.direction === 'rtl' ? 'right' : 'left'}
      open={mobileOpen}
      onClose={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper
      }}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
    >
      <List>
        {sidebarItems.map(sidebarItem => (
          <ListItem
            button
            component={Link}
            key={sidebarItem.name}
            to={sidebarItem.linkTo}
          >
            <ListItemIcon>
              <sidebarItem.icon />
            </ListItemIcon>
            <ListItemText primary={sidebarItem.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  </Hidden>,
  <Hidden smDown>
    <Drawer
      variant="permanent"
      open
      classes={{
        paper: classes.drawer
      }}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {sidebarItems.map(sidebarItem => (
          <ListItem
            button
            component={Link}
            key={sidebarItem.name}
            to={sidebarItem.linkTo}
          >
            <ListItemIcon>
              <sidebarItem.icon />
            </ListItemIcon>
            <ListItemText primary={sidebarItem.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  </Hidden>
]);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withState('mobileOpen', 'setMobileOpen', false),
  withHandlers({
    handleDrawerToggle: ({
      mobileOpen,
      setMobileOpen
    }) => () => {
      setMobileOpen(!mobileOpen);
    }
  })
)(Sidebar);
