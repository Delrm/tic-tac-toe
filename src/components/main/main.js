import React, { Component } from 'react'
import GameList from '../game-list'
import CreateGame from '../create-game'
import AddName from '../add-name'

export default class Main extends Component {

  state = {
    playerName: null
  }

  onPlayerNameChange = ( playerName ) => {
    this.setState({ playerName })
  }

  render() {
    return(
      <div className='container'>
        <div className='user-box'>
          <AddName onPlayerNameChange={this.onPlayerNameChange} />
        </div>
        <hr className='hr-user'></hr>
          <div className='content'>
            <GameList playerName={ this.state.playerName }/>
          </div>
          <div className='create-game'>
            <CreateGame playerName={ this.state.playerName }/>
          </div>
      </div>
    )
  }
}