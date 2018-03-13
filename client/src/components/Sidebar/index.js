import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import styles from './styles';
import sidebarItems from './sidebarItems';

const Sidebar = ({ classes, theme }) => (
  // <Hidden mdUp>
  //   <Drawer
  //     variant="temporary"
  //     anchor={theme.direction === 'rtl' ? 'right' : 'left'}
  //     // open={this.state.mobileOpen}
  //     // onClose={this.handleDrawerToggle}
  //     classes={{
  //       paper: classes.drawerPaper
  //     }}
  //     ModalProps={{
  //       keepMounted: true // Better open performance on mobile.
  //     }}
  //   >
  //     <List>
  //       {
  //         listItems.map(item => (
  //           <ListItem key={item.name} button component={Link} to={item.path}>
  //             <ListItemIcon>
  //               <item.icon />
  //             </ListItemIcon>
  //             <ListItemText primary={item.name} />
  //           </ListItem>
  //         ))
  //       }
  //     </List>
  //   </Drawer>
  // </Hidden>
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
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Sidebar);
