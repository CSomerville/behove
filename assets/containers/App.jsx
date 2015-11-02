import React, { Component } from 'react';
import { Link } from 'react-router';

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

export default App;
