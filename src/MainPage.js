import React, { Component } from 'react';
import ListMenu from './ListMenu';
import MapContainer from './MapContainer';

class MainPage extends Component {
  render() {
    return (
      <div className='mainPage'>
        <nav className='mainHeader'>
        <h2>Nom-Nom Finder</h2>
        <h3></h3>
        </nav>
        <ListMenu />
        <MapContainer />
      </div>
      // TODO: Display map, listings etc.
    )
  }
}

export default MainPage
