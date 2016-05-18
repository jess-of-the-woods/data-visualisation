import React, { Component } from 'react'

class TweetContainer extends Component {
  constructor(){

  }
  render(){
    return (
      <div id='tweetContainer' className="container">
        <div className="row">
          <div id="userSubmittedTweetsHeader"></div>
          <div id="userSubmittedTweets" className="nine columns"></div>
          <div id="tweetsHeader"></div>
          <div id="tweetsDiv" className="nine columns"></div>
          <br>
        </div>
      </div>
    )
  }
}

export default TweetContainer
