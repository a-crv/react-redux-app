import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import LocalPostOffice from 'material-ui-icons/LocalPostOffice';
import Chat from 'material-ui-icons/Chat';

const styles = {
  sidebar: {
    position: 'relative',
    width: '50%'
  }
};

const listItems = [
  {
    name: 'Posts',
    icon: LocalPostOffice,
    path: '/1'
  },
  {
    name: 'Chat',
    icon: Chat,
    path: '/2'
  }
];

const Sidebar = ({ classes }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classes.sidebar
    }}
  >
    <List>
      {
        listItems.map(item => (
          <ListItem key={item.name} button component={Link} to={item.path}>
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))
      }
    </List>
  </Drawer>
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
