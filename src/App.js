import React, { Component } from 'react';
import MainPage from './MainPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage />
         {/* TODO: Create a full-screen map that displays markers for restaurants
         near the UT Tyler campus.  */}
      </div>
    );
  }
}

export default App;
