import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newComb, cancelNewComb, initiatePostComb, editNewCombName } from '../actions/index';
import AddComb from '../components/AddComb';
import EditNewComb from '../components/EditNewComb';

// import { increment, decrement } from '../actions/index';
// import Counter from '../components/Counter.jsx';
// import Increment from '../components/Increment.jsx';
// import Decrement from '../components/Decrement.jsx';

class App extends Component {
  render() {
    const { dispatch, isEditing, name } = this.props;
    return (
      <div>
        {!isEditing &&
        <AddComb
          onAddCombClick={() => {
            dispatch(newComb())
          }} />
        }
        {isEditing &&
        <EditNewComb
          onNewCombSave={(comb) => {
            dispatch(initiatePostComb(comb))
          }}
          onNewCombCancel={() => {
            dispatch(cancelNewComb)
          }} />
        }
      </div>
    );
  }
}

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
  return { isEditing: state.isEditing };
}

export default connect(select)(App);
