import React from 'react';
import PropsTypes from 'prop-types';
import { compose, withHandlers, setStatic } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { getRandomInRange, sortImagesByRating } from '../../utils';
import { IMPROVE_RATING, LOWER_RATING } from '../../constants/actions';
import updateRating from '../../actions/animation';
import AnimatedItem from '../AnimatedItem';
import styles from './styles';

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

class Animation extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      chandedRatingItem: { id, rating }
    } = nextProps;
    const { itemsData } = prevState;

    const updateditemsData = itemsData.map(item => (
      item.id === id
        ? { ...item, rating }
        : item
    ));

    const nextState = {
      ...prevState,
      itemsData: updateditemsData.sort(sortImagesByRating)
    };

    return nextState;
  }

  state = {
    itemsData: createItemsData(7)
  }

  render() {
    const {
      classes,
      leftHandleClickImage,
      rightHandleClickImage
    } = this.props;
    const { itemsData } = this.state;

    return (
      itemsData.map(item => (
        <div className={classes.item} key={item.id}>
          <AnimatedItem
            leftHandleClick={leftHandleClickImage(IMPROVE_RATING, item.id)}
            rightHandleClick={rightHandleClickImage(LOWER_RATING, item.id)}
            rating={item.rating}
            url={item.url}
          />
        </div>
      ))
    );
  }
}

Animation.propTypes = {
  leftHandleClick: PropsTypes.func.isRequired,
  rightHandleClick: PropsTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { chandedRatingItem } = state;

  return {
    chandedRatingItem
  };
};

export default compose(
  connect(mapStateToProps, {
    updateItemRating: updateRating
  }),
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
  }),
  withStyles(styles)
)(Animation);
