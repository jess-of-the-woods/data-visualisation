'use strict'
import React, { Component } from 'react'

class HashtagAssociates extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div id='hashtagAssociatesDiv' className="container">
    		<h5 className="hashtagsHeader">Associated Hashtags:</h5>
    		<h6 className="hashtagsHeader">Click on a hashtag in the chart to search for it</h6>
    		<div id='pieChart'></div>
    		<p id='hashtagAssociates'></p>
    	</div>
    )
  }
}

export default HashtagAssociates
