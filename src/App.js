import React, { Component } from 'react';

import './App.css';
import NasaSearch from './containers/NasaSearch/NasaSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <NasaSearch />
        </header>
      </div>
    );
  }
}

export default App;
