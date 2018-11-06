import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';


class MapContainer extends Component {
  state = {
    map: null,
    markers: [],
    markerProps: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  }

  componentDidMount = () => {

  }

  mapReady = (props, map) => {
    // displays map with available markers
    this.setState({map});
    this.updateMarkers(this.props.locations);
  }

  closeInfoWindow = () => {
    // Closes active marker window and animations
    this.state.activeMarker && 
    this.state.activeMarker.setAnimation(null);

    this.setState({showingInfoWindow: false, activeMarker: null, activeMarkerProps: null});
  }

  onMarkerClick = (props, marker, e) => {
    // Closes open info windos
    this.closeInfoWindow();

    // Sets state to show info window
    this.setState({showingInfoWindow: true, activeMarker: marker, activeMarkerProps: props})
  }

  updateMarkers = (locations) => {
    // Prevent error for empty location array
    if (!locations)
      return;
    // Then clear any remaining markers
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = locations.locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos,
        url: location.url
      };
      markerProps.push(mProps);

      let animation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map,
        animation
      });
      marker.addListener('click', () => {
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    })

    this.setState({markers, markerProps});
  }

  render = () => {
    const center = {
      lat: this.props.lat,
      lng: this.props.lng
    }
    let amProps = this.state.activeMarkerProps;

    return (
      <Map
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        google={this.props.google}
        zoom={this.props.zoom}
        initialCenter={center}
        onClick={this.closeInfoWindow}>
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.closeInfoWindow}>
              <div>
                <h3>{amProps && amProps.name}</h3>
                {amProps && amProps.url ? (
                  <a href={amProps.url} target="_blank">See Website</a>
                ) : "" }
              </div>
          </InfoWindow>
      </Map>
      // TODO: Display full screen map. All location markers must show by default,
      // and must filter. Markers must be clickable and show info when clicked. 
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCxXK6lMDoTo4dHosssdE0SyJ8UtVOtpbU"
})(MapContainer)
