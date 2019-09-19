import React, { Component } from 'react';
import './game.css';
import Timer from '../timer';
import CreateBox from '../create-box'
import PlayersNames from '../players-names'
import WinnerPlayer from '../winner-player'
import ControlButtons from '../control-buttons'
import GameapiService from '../../services/gameapi-service'
import { v4 } from 'uuid';
import { async } from 'q';

class Game extends Component {

  gameapiService = new GameapiService()

  playerStatus = null

  state = {
    id: null,
    gameStatus: null,
    creator: null,
    opponent: null,
    board: Array(9).fill(null),
    turn: 'X',
    winner: null,
    timer: 0
  }
  
  componentDidMount() {
    this.setGame()
      .then(() => this.gameapiService.setData(this.state.id, this.state))
      
    this.timerID = setInterval(
      () => this.gameapiService.getData(this.state.id)
        .then((data) => {
          this.checkGameActivity(data)
          this.setState({...data})
            
          this.setTimer()
        }), 1000
      )

    this.resetTimerClearGame()
  }

  componentDidUpdate(prevState) {
    if(this.state !== prevState) {
      this.gameapiService.setData(this.state.id, this.state)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    clearTimeout(this.timerClearGame)
  }

  setTimer() {
    if(this.state.opponent && this.playerStatus === 'creator' 
        && !this.state.winner) {
          this.tick()
      }
  }

  tick() {
    this.setState(({ timer }) => {
      return {
        timer: timer + 1
      }
    })
  }

  setGame = async () => {
    const { game } = this.props.match.params
    const { playerName, id } = this.props.location.state

    if(game === 'create-game') {
      const id = v4()
      this.playerStatus = 'creator'

      this.setState({
        id,
        gameStatus: 'pending',
        creator: playerName
      })
    } 

    if(game === 'join-game') {
      this.playerStatus = 'opponent'

      this.gameapiService.getData(id)
        .then((gameData)=>{
          this.setState({
            ...gameData,
            gameStatus: 'playing',
            opponent: playerName,
          })
        })
    }

    if(game === 'watch-game') {
      this.playerStatus = 'watch'

      this.gameapiService.getData(id)
        .then((gameData)=>{
          this.setState({
            ...gameData,
          })
        })
    }
  }

  checkGameActivity = (data) => {
    if(!data) {
      return this.clearGame()
    }

    const { timer: dataTimer, ...reciveData } = data
    const { timer: stateTimer, ...stateData } = this.state

    if(JSON.stringify(reciveData)!==JSON.stringify(stateData)) {
      this.resetTimerClearGame()
    }
  }

  clearGame() {
    localStorage.removeItem(this.state.id)
    this.props.history.push('/')
  }

  resetTimerClearGame() {
    clearTimeout(this.timerClearGame)
    this.timerClearGame = setTimeout(() => this.clearGame(), 300*1000)
  }

  checkWinner() {
    const winnerCombinations =
      [
        ["0", "1", '2'],
        ["3", "4", '5'],
        ["6", "7", '8'],
        ["0", "3", '6'],
        ["1", "4", '7'],
        ["2", "5", '8'],
        ["0", "4", '8'],
        ["2", "4", '6'],
      ]
    this.checkMatch(winnerCombinations)
  }

  checkMatch(winnerCombinations) {
    
    winnerCombinations.forEach((element) => {
      const { board } = this.state

      if (board[element[0]] && board[element[0]] === board[element[1]] 
        && board[element[0]] === board[element[2]]) {
          this.setState({
            gameStatus: 'over',
            winner: this.state.turn,
          })
        }
      })
  }

  surrenderToggle() {
    const winnerPlayer = (this.playerStatus === 'creator') ? 'O':'X'

    this.setState({ winner: winnerPlayer })
  }

  boxClick(index) {
    if (this.state.turn && !this.state.winner) {
      const newBoard = this.state.board
      if (this.state.board[index] === null) {
        newBoard[index] = this.state.turn

        this.setState(() => ({
          board: newBoard,
          turn: this.state.turn === 'X' ? 'O' : 'X'
        }))
        
        this.checkWinner()
      }
    }
  }

  render() {
    const { creator, opponent, gameStatus, board, 
      turn, timer, winner } = this.state;
    
    return (
      <div className="container">
        <div className='players-box'>
          <PlayersNames 
            creator={ creator }
            opponent={ opponent }
            turn={ turn }
            winner={ winner }
            playerStatus={ this.playerStatus }/>
        </div>
        <div className="winner-player">
          <WinnerPlayer
            creator={ creator }
            opponent={ opponent }
            turn={ turn } 
            winner={ winner }
          />
        </div>
        <div className="board">
          <CreateBox 
            playerStatus={ this.playerStatus }
            board={ board }
            turn={ turn }
            boxClick={ (index) => this.boxClick(index) }
          />
        </div>
        <div className='control-buttons'>
          <ControlButtons 
            winner={ winner } gameStatus={ gameStatus }
            playerStatus={ this.playerStatus }
            surrenderToggle={ () => this.surrenderToggle() }/>
        </div>
        <div className='game-timer'>
         <Timer timer={ timer } />
        </div>
      </div>
    );
  }
}

export default Game;