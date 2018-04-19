import React from 'react';
import {
  compose,
  withState,
  setStatic,
  lifecycle,
  withHandlers,
  createSink
} from 'recompose';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

const getElemCoordinates = (ref) => {
  const node = ref.current;

  return {
    x: node.offsetLeft,
    y: node.offsetTop
  };
};

const animate = (dX, dY, ref) => {
  const node = ref.current;

  window.requestAnimationFrame(() => {
    node.style.transform = `translate(${dX}px, ${dY}px)`;
    node.style.transition = 'transform 0s';

    window.requestAnimationFrame(() => {
      node.style.transform = '';
      node.style.transition = 'transform 1400ms';
    });
  });
};

class AnimatedItem extends React.Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const coordinates = getElemCoordinates(this.myRef);
    // console.log('Snapshot', snapshot);
    // console.log('Coordinates', coordinates);
    const dX = snapshot.x - coordinates.x;
    const dY = snapshot.y - coordinates.y;

    animate(dX, dY, this.myRef);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const coordinates = getElemCoordinates(this.myRef);
    // console.log(coordinates);
    // const { x, y } = newcoordinates;
    // const dX = coordinates.x - x;
    // const dY = coordinates.y - y;
    return coordinates;
  }

  render() {
    const {
      url,
      rating,
      classes,
      leftHandleClick,
      rightHandleClick
    } = this.props;

    return (
      <div
        tabIndex="0"
        role="button"
        ref={this.myRef}
        className={classes.item}
        onClick={leftHandleClick}
        onKeyPress={leftHandleClick}
        onContextMenu={rightHandleClick}
      >
        <div className={classes.itemRating}>{rating}</div>
        <img src={url} className={classes.itemImage} alt="Img don't upload" />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  // setStatic('getDerivedStateFromProps', (nextProps, prevState) => {
  //   // const { getElemCoordinates } = nextProps;
  //   // const coordinates = getElemCoordinates();
  //   // return coordinates;

  //   return null;
  // }),
)(AnimatedItem);
