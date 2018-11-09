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
          <input
            className='filter'
            type='text'
            placeholder='Filter Listings'
            onChange={e => this.updateQuery(e.target.value)}
            value={this.state.query} />
          <ul className='list'>
            {this.props.locations && this.props.locations.map((location, index) => {
              return (
                <li className='listing' key={index}>
                  <button key={index} onClick={() => this.props.clickListItem(index)}>{location.name}</button>
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
