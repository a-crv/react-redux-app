import React, { useReducer } from 'react';
import { compose } from 'redux';
import PropsTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import createItemsData from './helpers';
import { sortImagesByRating } from '../../utils';
import AnimatedItem from '../AnimatedItem';
import styles from './styles';

const updateItemsData = id => actionType => (item) => {
  if (item.id === id) {
    if (actionType === 'increment') {
      return { ...item, rating: item.rating + 1 };
    }

    if (actionType === 'decrement') {
      return { ...item, rating: item.rating - 1 };
    }
  }

  return item;
};

const initialState = {
  items: createItemsData(7)
};

const reducer = (state, action) => {
  const { items } = state;
  const { type, payload: { id } } = action;

  switch (type) {
    case 'increment':
    case 'decrement':
      return {
        items: items.map(item => updateItemsData(id)(type)(item)).sort(sortImagesByRating)
      };

    default:
      return state;
  }
};

const Animation = ({ classes }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items } = state;

  return (
    items.map(item => (
      <div className={classes.item} key={item.id}>
        <AnimatedItem
          leftHandleClick={() => dispatch({
            type: 'increment',
            payload: { id: item.id }
          })}
          rightHandleClick={() => dispatch({
            type: 'decrement',
            payload: { id: item.id }
          })}
          rating={item.rating}
          url={item.url}
        />
      </div>
    ))
  );
};

Animation.defaultProps = {
  classes: {}
};

Animation.propTypes = {
  classes: PropsTypes.object
};

export default compose(
  withStyles(styles)
)(Animation);
