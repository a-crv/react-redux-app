import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ReactTable from '../ReactTable';
import styles from './styles';

const Transition = props => <Slide direction="up" {...props} />;

const columns = [{
  Header: 'Автор вопроса',
  accessor: 'owner.display_name'
}, {
  Header: 'Тема вопроса',
  accessor: 'title'
}, {
  Header: 'Кол-во ответов',
  accessor: 'answer_count'
}, {
  Header: 'Тэги',
  accessor: 'tags'
}];

const QuickToolbar = ({
  items,
  isOpen,
  classes,
  handleClose
}) => (
  <Dialog
    fullScreen
    onClose={handleClose}
    transition={Transition}
    open={isOpen}
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleClose}
          aria-label="Close"
        >
          <Close />
        </IconButton>
      </Toolbar>
    </AppBar>
    <div className={classes.content}>
      <ReactTable
        data={items}
        columns={columns}
        defaultPageSize={10}
      />
    </div>
  </Dialog>
);

QuickToolbar.defaultProps = {
  items: []
};

QuickToolbar.propTypes = {
  items: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

const mapStateToProps = ({ stackoverflow: { authorQuestions } }) => ({
  items: authorQuestions
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(QuickToolbar);
