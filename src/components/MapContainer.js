import React, { Component } from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const FS_CLI_ID = 'NL5Q1XELXMBMWNAOVAKEU05ZVT1NZCEXSIYTZPBKQJBGZFHL'
const FS_CLI_SECRET = '4MUJWRMJDWMM0JKE0XYT5OO42DSGOT5GOGQJ0EJEZK2FYUAQ'
const FS_VERSION = '20181101'


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
    this.setState({ map });
    this.updateMarkers(this.props.locations);
  }

  closeInfoWindow = () => {
    // Closes active marker window and animations
    this.state.activeMarker &&
      this.state.activeMarker.setAnimation(null);

    this.setState({ showingInfoWindow: false, activeMarker: null, activeMarkerProps: null });
  }

  getBusinessInfo = (props, data) => {
    // Look for matching data in Yelp compared to locations.json
    return data
      .response
      .venues
      .filter(item => item.name.includes(props.name) || props.name.includes(item.name))
  }

  onMarkerClick = (props, marker, e) => {
    // Closes open info windos
    this.closeInfoWindow();

    // Fetch FourSquare info for selected marker
    let url = `https://api.foursquare.com/v2/venues/search?client_id=${FS_CLI_ID}&client_secret=${FS_CLI_SECRET}&v=${FS_VERSION}&radius=100&ll=${props.position.lat},${props.position.lng}`
    let headers = new Headers();
    let request = new Request(url, {
      method: 'GET',
      headers
    });

    // Create props for the active marker
    let activeMarkerProps;
    fetch(request).then(response => response.json())
      .then(result => {
        let restaurant = this.getBusinessInfo(props, result);
        activeMarkerProps = {
          ...props,
          foursquare: restaurant[0]
        }

        // Get images for restaurant and set state
        if (activeMarkerProps.foursquare) {
          let url = `https://api.foursquare.com/v2/venues/${restaurant[0].id}/photos?client_id=${FS_CLI_ID}&client_secret=${FS_CLI_SECRET}&v=${FS_VERSION}`
          fetch(url)
            .then(response => response.json())
            .then(result => {
              activeMarkerProps = {
                ...activeMarkerProps,
                images: result.response.photos
              };
              if (this.state.activeMarker)
                // Removes any current animation
                this.state.activeMarker.setAnimation(null);
              // Sets Animation on active marker
              marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
              // Sets state to show info window            
              this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps })
            })
        } else {
          // Sets animation and state if there are no photos
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({ showingInfoWindow: true, activeMarker: marker, activeMarkerProps })
        }
      })
  };

  updateMarkers = (locations) => {
    // Prevent error for empty location array
    if (!locations)
      return;
    // Then clear any remaining markers
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = locations.map((location, index) => {
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

    this.setState({ markers, markerProps });
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
            ) : ""}
            {amProps && amProps.images ? (
              <div><img
                alt={amProps.name + " picture"}
                src={amProps.images.items[0].prefix + "100x100" + amProps.images.items[0].suffix} />
                <p>Image provided by FourSquare</p>
              </div>
            ) : ""}
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
