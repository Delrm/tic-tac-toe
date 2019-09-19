import React from 'react';
import crossSmall from './cross-small.JPG'
import zeroSmall from './zero-small.JPG'
import greySmallZero from './grey-zero-small.JPG'
import './players-names.css';

const PlayersNames = ({ creator, opponent, turn, winner, playerStatus }) => {
  const styleWatch = playerStatus === 'watch' ? 'watch-style':null
  
  return (
    <>
      <div className={`player-container ${styleWatch} ${creator ? (turn === 'X' && !winner) ? 'underLine':null:'hide'} `}>
        <div className='player-X'>{ creator }</div>
        <img src={ crossSmall }></img>
      </div>
      <div className={`player-container ${styleWatch} ${opponent ? (turn === 'O' && !winner) ? 'underLine':null:'hide'}`}>
      <img src={ styleWatch ?  greySmallZero:zeroSmall }></img>
        <div className='player-O' >{ opponent }</div>
      </div>
    </>
  )
}

export default PlayersNames