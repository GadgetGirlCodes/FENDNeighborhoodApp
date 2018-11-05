import React, { Component } from 'react';
import ListMenu from './components/ListMenu';
import MapContainer from './components/MapContainer';
import locations from './data/locations.json';
import './App.css';

class App extends Component {
  state = {
    lat: 32.316652,
    lng: -95.249268,
    zoom: 15,
    all: locations
  }
  render() {
    return (
      <div className="App">
        <nav className='mainHeader'>
          <h2>Nom-Nom Finder</h2>
        </nav>
        {/* <ListMenu /> */}
        <MapContainer
          className='mapContainer'
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.all}/>
         {/* TODO: Create a full-screen map that displays markers for restaurants
         near the UT Tyler campus.  */}
      </div>
    );
  }
}

export default App;
