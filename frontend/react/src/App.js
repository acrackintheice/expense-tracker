import React, { Component } from 'react';
import OutlinedButtons from './button-panel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            <OutlinedButtons />
        </header>
      </div>
    );
  }
}

export default App;
