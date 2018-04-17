import React from 'react';
import ReactDOM from 'react-dom';
import {
  compose,
  withState,
  setStatic,
  lifecycle,
  withHandlers
} from 'recompose';

const AnimatedItem = ({
  url,
  rating,
  leftHandleClick,
  rightHandleClick
}) => (
  <div
    onClick={leftHandleClick}
    onContextMenu={rightHandleClick}
    className="image-item"
  >
    <div className="image-item__rating">{rating}</div>
    <img src={url} className="image-item__img" alt="Img don't upload" />
  </div>
);

export default compose(
  withState('thisComponent', 'setThisComponent', null),
  lifecycle({
    constructor(props) {
      const { setThisComponent } = props;
      setThisComponent(this);
    },
    componentDidUpdate() {
      const {
        getElemCoordinates,
        elemCoordinates,
        animate
      } = this.props;

      const coordinates = getElemCoordinates();
      const { x, y } = coordinates;
      const dX = elemCoordinates.x - x;
      const dY = elemCoordinates.y - y;

      animate(dX, dY);
    }
  }),
  withHandlers({
    getElemCoordinates: ({ thisComponent }) => () => {
      const domNode = ReactDOM.findDOMNode(thisComponent);

      return {
        x: domNode.offsetLeft,
        y: domNode.offsetTop
      };
    },
    animate: ({ thisComponent }) => (dX, dY) => {
      const domNode = ReactDOM.findDOMNode(thisComponent);

      window.requestAnimationFrame(() => {
        domNode.style.transform = `translate(${dX}px, ${dY}px)`;
        domNode.style.transition = 'transform 0s';

        window.requestAnimationFrame(() => {
          domNode.style.transform = '';
          domNode.style.transition = 'transform 1400ms';
        });
      });
    }
  }),
  setStatic('getDerivedStateFromProps', (nextProps) => {
    const { getElemCoordinates } = nextProps;
    const coordinates = getElemCoordinates();
    return coordinates;
  }),
  withState('elemCoordinates', 'setElemCoordinates', {
    x: 0,
    y: 0
  }),
  withHandlers({
    getElemRef: () => node => node
  })
)(AnimatedItem);
