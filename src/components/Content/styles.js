const styles = theme => ({
  container: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar,
  title: {
    margin: '0 0 10px 0'
  }
});

export default styles;
