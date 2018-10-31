import React, { Component } from 'react'

class ListMenu extends Component {
  render() {
    return (
      <div className='listMenu'>
        <ol className='list'>
          <li>
            This is an example!
            {/* TODO: List restaurants and their corresponding info. Map markers must be animated
                when clicked. Must have filter option here <FilterListing />
             */}
          </li>
          <li>This is another example!</li>
          <li>And last but not least..... ANOTHER EXAMPLE!</li>
        </ol>
      </div>
    )
  }
}

export default ListMenu
