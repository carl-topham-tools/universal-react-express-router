import React, { Component } from 'react';

class App extends Component {

  render() {

    return (
      <div id="main-view">
        <h1>INDEX</h1>

        {this.props.children}
      </div>
    );
  }

}

export default App;
