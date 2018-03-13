import SIDEBAR_WIDTH from '../../constants/ui';

const styles = theme => ({
  drawer: {
    width: SIDEBAR_WIDTH,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  toolbar: theme.mixins.toolbar
});

export default styles;
