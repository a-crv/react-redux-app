import React from 'react';
import { compose, withHandlers, withProps } from 'recompose';
import { connect } from 'react-redux';
import { IMPROVE_RATING, LOWER_RATING } from '../../constants/actions';
import updateRating from '../../actions/animation';
import AnimatedItem from '../AnimatedItem';

const data = [];

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortImagesByRating(a, b) {
  return b.rating - a.rating;
}

for (let i = 0; i < 8; i += 1) {
  const randomCount = getRandomInRange(1, 250);

  data.push({
    id: i,
    rating: 0,
    url: `https://unsplash.it/200/200?image=${randomCount}`
  });
}

// newState.data.sort(sortImagesByRating);

const Animation = ({
  changedItem,
  leftHandleClickImage,
  rightHandleClickImage
}) => {
  const { id, rating } = changedItem;

  return (
    data.map(item => (
      <div className="app__intro-grid" key={item.id}>
        <AnimatedItem
          leftHandleClick={leftHandleClickImage(IMPROVE_RATING, item.id)}
          rightHandleClick={rightHandleClickImage(LOWER_RATING, item.id)}
          rating={item.rating}
          url={item.url}
        />
      </div>
    ))
  );
};

function mapStateToProps(state) {
  const { changedItem } = state;

  return {
    changedItem
  };
}

export default compose(
  connect(mapStateToProps, {
    updateItemRating: updateRating
  }),
  withProps(),
  withHandlers({
    leftHandleClickImage: ({
      updateItemRating
    }) => (actionName, id) =>
      () => updateItemRating(actionName, id),
    rightHandleClickImage: ({
      updateItemRating
    }) => (actionName, id) =>
      (event) => {
        event.preventDefault();
        updateItemRating(actionName, id);
      }
  })
)(Animation);
