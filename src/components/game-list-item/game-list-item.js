import React, { Component } from 'react';
import Timer from '../timer'
import GameapiService from '../../services/gameapi-service'
import './game-list-item.css';

export default class GameListItem extends Component {

  gameapiService = new GameapiService()

  gameDataClear() {
    this.clearGame = setTimeout(() => this.gameapiService.removeGame(this.props.id), 300*1000)
  }

  componentWillUnmount() {
    clearTimeout(this.clearGame)
  }
  
  render() {
    const { gameStatus, creator, opponent, winner, timer } = this.props
    const gameClear = winner ? this.gameDataClear():null
    const styleLineSquare = (gameStatus === 'playing' || gameStatus === 'over') 
    ? 'border-line':null
    const winnerStyle = winner ? 'winner':null

    return (
      <div className={`container-square ${gameStatus}`}>
        { gameClear }
        <div className={`player-square ${styleLineSquare} ${winner === 'X' ? winnerStyle:null}`}>{ creator }</div>
        <div className={`player-square ${winner === 'O' ? winnerStyle:null}`}>{ opponent }</div>
        <div className='timer-square'>
          <Timer timer={ timer } />
        </div>
      </div>
    )
  }
}