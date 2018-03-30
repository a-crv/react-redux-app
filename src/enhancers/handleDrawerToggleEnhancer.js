import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { toggleSidebar } from '../actions/ui';

const mapStateToProps = (state) => {
  const { ui: { isOpenSidebar: mobileOpen } } = state;

  return {
    mobileOpen
  };
};

const mapDispatchToProps = {
  setMobileOpen: toggleSidebar
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleDrawerToggle: ({ setMobileOpen }) => () => {
      setMobileOpen();
    }
  })
);
