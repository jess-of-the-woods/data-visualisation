import react from 'react'
import Form from './form'
import TweetContainer from './tweetContainer'

class App {
  constructor(props)
  super(props)

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
