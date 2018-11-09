import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class ListMenu extends Component {
  state = {
    open: false,
    query: ""
  }

 

  updateQuery = (newQuery) => {
    this.setState({ query: newQuery });
    this.props.filterLocations(newQuery);
  }

  render() {
    return (
      <Drawer open={this.props.open} onClose={this.props.toggleMenu}>
        <section className="listMenu">
          <nav>
            <h3 className='closeMenu' aria-label="Close" tabIndex="0">X</h3>
            <input
              className='filter'
              type='text'
              placeholder='Filter Listings'
              onChange={e => this.updateQuery(e.target.value)}
              value={this.state.query} />
          </nav>
          <ul className='list'>
            {this.props.locations && this.props.locations.map((location, index) => {
              return (
                <li className='listing' key={index}>
                  <button key={index}>{location.name}</button>
                </li>
              )
            })}
          </ul>
        </section>

      </Drawer>
    )
  }
}

export default ListMenu
