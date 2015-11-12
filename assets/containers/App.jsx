import React, { Component } from 'react';
import { Link } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    const links = [
      '/app',
      '/app/combs',
      '/app/test'
    ].map((el) =>
      <p>
        <Link to={el}>{el}</Link>
      </p>
    );
    return (
      <div>
        <h1>App Container</h1>
        { links }
        {this.props.children}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
