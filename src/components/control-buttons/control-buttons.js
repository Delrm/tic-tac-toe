import React from 'react';
import {Link} from 'react-router-dom';
import './control-buttons.css';

const ControlButtons = ({ winner, playerStatus, gameStatus, surrenderToggle }) => {

  const surrenderButton = <button className='buttons' onClick = { surrenderToggle }>SURRENDER</button>
  const backButton = <Link to='/'>
                      <button className='buttons'>BACK</button>
                    </Link>

  const checkGameStatus = (gameStatus) => {
    if(gameStatus === 'pending' || winner ||
    playerStatus === 'watch') {
      return backButton
    }

    return surrenderButton
  }

  const controlButton = () => {
    return checkGameStatus(gameStatus)
  }

  return (
    <div>
      { controlButton() }
    </div>
  )
}

export default ControlButtons