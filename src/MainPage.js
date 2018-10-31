import React, { Component } from 'react';
import ListMenu from './ListMenu';

class MainPage extends Component {
  render() {
    return (
      <div className='mainPage'>
        <div className='mainHeader'>
        <h2>Nom-Nom Finder</h2>
        </div>
        <ListMenu />
      </div>
      // TODO: Display map, listings etc.
    )
  }
}

export default MainPage
