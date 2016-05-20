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
        // console.log('tweets:', tweets, 'typeof: ', typeof tweets)
        this.setState({ tweets: tweets  })

      }.bind(this))
  }

  handleHashtagChange(e){
    this.setState({hashtag: e.target.value})
  }

  render(){
    return (
      <div>
        <form id='hashtagForm'>
          <input type="text" value={this.state.value} id='hashtagInput' name='hashtag' placeholder="hashtag.." onChange={this.handleHashtagChange} />
          <select>
            <option value="none">No region</option>
            <option value="tamakiMakaurauGeoCode">Tamaki Makaurau - Auckland</option>
            <option value="rotoruaGeoCode">Rotorua</option>
            <option value="ponekeGeoCode">Poneke - Wellington</option>
            <option value="otautahiGeoCode">Otautahi - Christchurch</option>
          </select>
          <input id='submitButton' className='button button-primary' type='submit' value='search' onClick={this.handleSubmit.bind(this)}></input>
        </form>
        <TweetContainer tweets={this.state.tweets} />
      </div>
    )
  }

  handleSubmit(){
    console.log("hashtag: " + this.state.hashtag)
  }

}
