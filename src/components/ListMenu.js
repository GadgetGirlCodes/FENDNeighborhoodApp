import React, { Component } from 'react';
import Listing from './Listing';

class ListMenu extends Component {
  render() {
    return (
      <section className='listMenu'>
      <h3 aria-label="Close" tabIndex="0">X</h3>
        <ol className='list'>
          <li>
            <Listing
              className='listing'
              tabIndex='0' />
            
            {/* TODO: List restaurants and their corresponding info. Map markers must be animated
                when clicked. Must have filter option here <FilterListing />
             */}
          </li>
        </ol>
      </section>
    )
  }
}

export default ListMenu
