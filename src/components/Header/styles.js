import SIDEBAR_WIDTH from '../../constants/ui';

const styles = theme => ({
  toolbar: {
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    }
  },
  appBar: {
    position: 'absolute',
    marginLeft: SIDEBAR_WIDTH,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`
    }
  },
  navIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

export default styles;
