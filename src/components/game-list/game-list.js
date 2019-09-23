import React, { Component } from 'react'
import GameListItem from '../game-list-item'
import GameapiService from '../../services/gameapi-service'
import { Link } from 'react-router-dom'
import './game-list.css';

export default class GameList extends Component {

  gameapiService = new GameapiService()

  state = {
    gameList: null
  }

  componentDidMount() {
    this.gameListTimer = setInterval(
      async () => {
        let gameList = await this.gameapiService.getGameList()
        this.setState({ gameList })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.gameListTimer)
  }
  
  
  render() {
    const { gameList } = this.state
    const gameElements = gameList ? gameList.map((item) => {
    const { id, ...itemProps } = item
    const link = itemProps.opponent ? '/watch-game':'/join-game'
    
    return (
      <div key={ id } className='wrap-item'>
        <Link to={{
          pathname: link,
          state: {
            id,
            playerName: this.props.playerName
          }
        }}
        className='link-style'>
          <GameListItem 
            id={ id }
            { ...itemProps }/>
        </Link>
      </div>
    )
  }):null 

  return(
    <div className='wrap'>{ gameElements }</div>
  )}
}
