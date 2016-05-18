import React from 'react'
import Form from './form'
import TweetContainer from './tweetContainer'
import HashtagAssociates from './hashtagAssociates'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <h1>Hashtag Web</h1>
        <Form />
        <TweetContainer />
        <HashtagAssociates />
      </div>
    )
  }
}

export default App
