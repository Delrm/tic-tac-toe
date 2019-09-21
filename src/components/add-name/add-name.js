import React, { Component } from 'react';
import './add-name.css';

export default class AddName extends Component {

  state = {
    playerName: ''
  }

  onNameChange = (e) => {
    this.setState({
      playerName: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { playerName } = this.state
    this.props.onPlayerNameChange(playerName)
  };

  render() {

    return (
      <form onSubmit={ this.onSubmit }>
        <input 
          type='text' 
          placeholder='Enter Your Name'  
          className='name-input'
          value={ this.state.playerName }
          onChange={ this.onNameChange }
          required />
      </form>
    )
  }
}