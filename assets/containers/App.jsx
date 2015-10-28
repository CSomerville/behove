import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initiateFetchCombs } from '../actions/index';
import AddComb from '../components/AddComb';
import EditNewComb from '../components/EditNewComb';
import Combs from '../components/Combs';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initiateFetchCombs());
  }

  render() {
    const { dispatch, isEditing, name, combs } = this.props;
    return (
      <div>
        <Combs
          combs={combs}
          />

      </div>
    );
  }
}

// {!isEditing &&
// <AddComb
//   onAddCombClick={() => {
//     dispatch(newComb())
//   }} />
// }
// {isEditing &&
// <EditNewComb
//   name={name}
//   inputChanged={(name) => {
//     dispatch(editNewCombName(name))
//   }}
//   onNewCombSave={(name) => {
//     dispatch(initiatePostComb(name))
//   }}
//   onNewCombCancel={() => {
//     dispatch(cancelNewComb)
//   }} />
// }

// class App extends Component {
//   render() {
//     const { dispatch, counter } = this.props;
//     return (
//       <div>
//         <Counter
//           counter={counter}
//           />
//         <Decrement
//           onDecrementClick={() => {
//             dispatch(decrement())
//           }} />
//         <Increment
//           onIncrementClick={() => {
//             dispatch(increment())
//           }} />
//       </div>
//     );
//   }
// }

function select(state) {
  return {
    combs: state.combs,
    isEditing: state.isEditing,
    name: state.name
  };
}

export default connect(select)(App);
