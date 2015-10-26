import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/index';
import Counter from '../components/Counter.jsx';
import Increment from '../components/Increment.jsx';
import Decrement from '../components/Decrement.jsx';

class App extends Component {
  render() {
    const { dispatch, counter } = this.props;
    return (
      <div>
        <Counter
          counter={counter}
          />
        <Decrement
          onDecrementClick={() => {
            dispatch(decrement())
          }} />
        <Increment
          onIncrementClick={() => {
            dispatch(increment())
          }} />
      </div>
    );
  }
}

function select(state) {
  return { counter: state.counter };
}

export default connect(select)(App);
