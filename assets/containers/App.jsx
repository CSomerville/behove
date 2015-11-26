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
        <nav>
          <Link to='/app/combs'>
            <h1>behove</h1>
          </Link>
        </nav>
        {this.props.children}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App);
