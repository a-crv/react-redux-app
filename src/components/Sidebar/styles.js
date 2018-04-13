import SIDEBAR_WIDTH from '../../constants/ui';

const styles = theme => ({
  drawer: {
    minHeight: '100%',
    width: SIDEBAR_WIDTH,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    position: 'relative'
  },
  progress: {
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    position: 'absolute'
  }
});

export default styles;
