import React from 'react';
import './create-game.css';
import { Link } from 'react-router-dom';

const CreateGame = ({ playerName }) => {
  return (
    <>
      <Link to={{
        pathname: '/create-game',
        state: {
          playerName
        }
      }}
      className='link-style'>
        <div className="add-button">
          +
        </div>
      </Link>
    </>
  )
}

export default CreateGame