import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  improveRating,
  lowerRating
} from '../../actions/ImagesListActions';
import AnimatedItem from '../AnimatedItem';

class App extends Component {
  constructor(props) {
    super(props);

    this.displayingImageItems = this.displayingImageItems.bind(this);
    this.leftHandleClickImage = this.leftHandleClickImage.bind(this);
    this.rightHandleClickImage = this.rightHandleClickImage.bind(this);
  }

  leftHandleClickImage(dispatch, id) {
    return () => dispatch(improveRating(id));
  }

  rightHandleClickImage(dispatch, id) {
    return (event) => {
      event.preventDefault();
      dispatch(lowerRating(id));
    }
  }

  displayingImageItems() {
    const { imagesList: { data } } = this.props;

    return data.map(item => (
      <div className="app__intro-grid" key={item.id}>
        <AnimatedItem
          leftHandleClick={this.leftHandleClickImage(this.props.dispatch, item.id)}
          rating={item.rating}
          rightHandleClick={this.rightHandleClickImage(this.props.dispatch, item.id)}
          url={item.url}
        />
      </div>
    ));
  }

  render() {
    return (
      <div className="app">
        <div className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="app__intro">
          {this.displayingImageItems()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { imagesList } = state;

  return {
    imagesList
  };
}

export default connect(mapStateToProps)(App);
