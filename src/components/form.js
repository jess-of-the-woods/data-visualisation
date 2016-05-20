'use strict'
import React, { Component } from 'react'
import request from 'superagent'
import TweetContainer from './tweetContainer'
import HashtagAssociates from './hashtagAssociates'
//import helpers?

export default class Form extends Component {
  constructor(props){
    super(props)
    this.state = {tweets: []}
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    request
      .get('http://localhost:3000/tweets')
      .end(function(err, res){
        // console.log('res.body: ', res.body)
        const tweets = res.body.map(function(obj){
          return obj.text
        })
        this.setState({ tweets: tweets  })

      }.bind(this))
  }

  render(){
    return (
      <div>
        <form id='hashtagForm'>
          <input id='hashtagInput' type="text" name='hashtag' placeholder="hashtag.."></input>
          <select>
            <option value="none">No region</option>
            <option value="tamakiMakaurauGeoCode">Tamaki Makaurau - Auckland</option>
            <option value="rotoruaGeoCode">Rotorua</option>
            <option value="ponekeGeoCode">Poneke - Wellington</option>
            <option value="otautahiGeoCode">Otautahi - Christchurch</option>
          </select>
          <input id='submitButton' className='button button-primary' type='submit' value='search' onClick={this.getData.bind(this)}></input>
        </form>
        <TweetContainer tweets={this.state.tweets}/>
      </div>
    )
  }
}
