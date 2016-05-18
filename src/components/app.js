import React from 'react'
import Form from './form'
import TweetContainer from './tweetContainer'

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
      </div>
    )
  }
}

export default App
