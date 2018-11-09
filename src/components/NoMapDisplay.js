import React, { Component } from 'react';

class NoMapDisplay extends Component {
  state = {
    show: false,
    timeout: null
  }

  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1000);
    this.setState({timeout});
  }

  componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show: true});
  }

  render = () => {
    return (
      <div>
        {this.state.show ? (
          <div className="errorMessage">
            <h1>Error Loading Map</h1>
            <p>Could not load map due to a network error. Please try again later.</p>
          </div>
        ) : (
          <div className="errorMessage"><h1>Loading... Please Wait</h1></div>
        )}
      </div>
    )
  }
}

export default NoMapDisplay