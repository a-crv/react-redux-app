import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import { handleDrawerToggleEnhancer } from '../../enhancers';
import styles from './styles';
import sidebarItems from './sidebarItems';

const Sidebar = ({
  theme,
  classes,
  mobileOpen,
  handleDrawerToggle,
  stackoverflowFetchedData
}) => {
  const { fetching } = stackoverflowFetchedData;

  return ([
    <Hidden mdUp key="mdUp">
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
              key={sidebarItem.id}
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
    <Hidden smDown key="smDown">
      <Drawer
        variant="permanent"
        open
        classes={{
          paper: classes.drawer
        }}
      >
        <div className={classes.toolbar}>
          {fetching ? <CircularProgress className={classes.progress} /> : null}
        </div>
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
};

Sidebar.defaultProps = {
  stackoverflowFetchedData: {}
};

Sidebar.propTypes = {
  stackoverflowFetchedData: PropTypes.object,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { stackoverflow } = state;

  return {
    stackoverflowFetchedData: stackoverflow
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles, { withTheme: true }),
  handleDrawerToggleEnhancer
)(Sidebar);
