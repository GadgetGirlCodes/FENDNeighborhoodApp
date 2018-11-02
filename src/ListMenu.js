import React, { Component } from 'react';
import Listing from './Listing';

class ListMenu extends Component {
  render() {
    return (
      <section className='listMenu'>
        <ol className='list'>
          <li>
            This is an example!
          {/* <Listing
            className='listing'
            tabIndex='0' /> */}
            
            {/* TODO: List restaurants and their corresponding info. Map markers must be animated
                when clicked. Must have filter option here <FilterListing />
             */}
          </li>
          <li>This is another example!</li>
          <li>And last but not least..... ANOTHER EXAMPLE!</li>
        </ol>
      </section>
    )
  }
}

export default ListMenu
