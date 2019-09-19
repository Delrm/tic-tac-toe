import React, { Component } from 'react';
import Timer from '../timer'
import './game-list-item.css';

export default class GameListItem extends Component {

  gameDataClear() {
    this.clearGame = setTimeout(() => localStorage.removeItem(this.props.id), 300 * 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.clearGame)
  }
  
  render() {
    const { gameStatus, creator, opponent, winner, timer } = this.props
    const gameDataClear = winner ? this.gameDataClear():null
    const styleLineSquare = (gameStatus === 'playing' || gameStatus === 'over') 
    ? 'border-line':null
    const winnerStyle = winner ? 'winner':null

    return (
      <div className={`container-square ${gameStatus}`}>
        { gameDataClear }
        <div className={`player-square ${styleLineSquare} ${winner === 'X' ? winnerStyle:null}`}>{ creator }</div>
        <div className={`player-square ${winner === 'O' ? winnerStyle:null}`}>{ opponent }</div>
        <div className='timer-square'>
          <Timer timer={ timer } />
        </div>
      </div>
    )
  }
}