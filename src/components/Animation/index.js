import React from 'react';
import PropsTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { getRandomInRange, sortImagesByRating } from '../../utils';
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

const updateItemsData = id => changeAction => (item) => {
  if (item.id === id && changeAction === 'improve') {
    return { ...item, rating: item.rating + 1 };
  } else if (item.id === id && changeAction === 'drop') {
    return { ...item, rating: item.rating - 1 };
  }

  return item;
};

class Animation extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      chandedRatingItem: { id, changeAction }
    } = nextProps;
    const { itemsData } = prevState;

    const updatedItemsData = itemsData.map(item => updateItemsData(id)(changeAction)(item));

    const nextState = {
      ...prevState,
      itemsData: updatedItemsData.sort(sortImagesByRating)
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
            leftHandleClick={leftHandleClickImage(item.id, 'improve')}
            rightHandleClick={rightHandleClickImage(item.id, 'drop')}
            rating={item.rating}
            url={item.url}
          />
        </div>
      ))
    );
  }
}

Animation.defaultProps = {
  classes: {}
};

Animation.propTypes = {
  classes: PropsTypes.object,
  leftHandleClickImage: PropsTypes.func.isRequired,
  rightHandleClickImage: PropsTypes.func.isRequired
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
