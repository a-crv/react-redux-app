import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import LocalPostOffice from 'material-ui-icons/LocalPostOffice';
import Chat from 'material-ui-icons/Chat';

const styles = {
  sidebar: {
    position: 'relative',
    width: '50%'
  }
};

const Sidebar = ({ classes }) => (
  <Drawer
    variant="permanent"
    classes={{
      paper: classes.sidebar
    }}
  >
    <List>
      <ListItem button>
        <ListItemIcon>
          <LocalPostOffice />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon>
          <LocalPostOffice />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
    </List>
  </Drawer>
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
