import React from 'react';
import { compose, withHandlers, withState, setStatic } from 'recompose';
import { connect } from 'react-redux';
import { getRandomInRange, sortImagesByRating } from '../../utils';
import { IMPROVE_RATING, LOWER_RATING } from '../../constants/actions';
import updateRating from '../../actions/animation';
import AnimatedItem from '../AnimatedItem';

const createItemsData = (count) => {
  const itemsData = [];

  for (let i = 0; i < count; i += 1) {
    const randomCount = getRandomInRange(1, 250);

    itemsData.push({
      id: i,
      rating: 0,
      url: `https://unsplash.it/200/200?image=${randomCount}`
    });
  }

  return itemsData;
};

// newState.data.sort(sortImagesByRating);

const Animation = ({
  changedItem,
  leftHandleClickImage,
  rightHandleClickImage
}) => {
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
  setStatic('getDerivedStateFromProps', (nextProps) => {
    const {
      location: { search },
      fetchQuestions,
      questions
    } = nextProps;

    if (questions.length === 0) {
      const params = new URLSearchParams(search);
      const body = params.get('body');
      const pagesize = params.get('pagesize');

      fetchQuestions(
        FETCH_QUESTIONS_STACKOVERFLOW,
        '/search/advanced', { body, pagesize }
      );
    }

    return null;
  }),
  withState('itemsData', 'setItemsData', createItemsData(23)),
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
