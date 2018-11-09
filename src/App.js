import React, { Component } from 'react';
import ListMenu from './components/ListMenu';
import MapContainer from './components/MapContainer';
import locations from './data/locations.json';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

class App extends Component {
  state = {
    lat: 32.316652,
    lng: -95.249268,
    zoom: 14,
    all: locations,
    open: false
  }

  styles = {
    button: {
      position: "absolute",
      left: 10,
      top: 5,
      padding: 10,
      background: "#c6b9cd"
    }
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    });
  }

  updateQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locations, query) => {
    return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
  }

  render() {
    return (
      <div className="App">
        <nav className="mainHeader">
          <h2>Nom-Nom Finder</h2>
          <button style={this.styles.button} onClick={this.toggleMenu}><FontAwesomeIcon icon="bars"/></button>
        </nav>
        <MapContainer
          className="mapContainer"
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          locations={this.state.filtered} />
        <ListMenu
          className="listMenu"
          locations={this.state.filtered}
          open={this.state.open}
          toggleMenu={this.toggleMenu}
          filterLocations={this.updateQuery} />
      </div>
    );
  }
}

export default App;
