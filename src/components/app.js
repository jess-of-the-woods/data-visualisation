import React from 'react'
import Form from './form'

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <h1>Hashtag Web</h1>
        <Form />
      </div>
    )
  }
}

export default App
