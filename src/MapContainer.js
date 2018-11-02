import React, { Component } from 'react';
import { Map, GooglepApiWrapper } from 'google-maps-react';


class MapContainer extends Component {
  render () {
    return (
      <section class='mapContainer'
      aria-role='application'
      aria-label='map'>
      <Map
      >
      </Map>
      </section>
      // TODO: Display full screen map. All location markers must show by default,
      // and must filter. Markers must be clickable and show info when clicked. 
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (AIzaSyCxXK6lMDoTo4dHosssdE0SyJ8UtVOtpbU)
})(MapContainer)
