import React, { Component } from 'react'

export default class Form extends Component {
  constructor(props){
    super(props)
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
          <input id='submitButton' className='button button-primary' type='submit' value='search'></input>
        </form>
      </div>
    )
  }
}
