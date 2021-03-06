import React from 'react';

const WinnerPlayer = ({ creator, opponent, winner }) => {

  const getWinner = () => {
    if(winner === 'draw') {
      return <h2>DRAW</h2>
    }

    return winner ? (winner === 'X') 
      ? <h2>Winner is {creator}</h2>:<h2>Winner is {opponent}</h2>:null
  }
   
  return (
    <div>
      { getWinner() }
    </div>
  )
}

export default WinnerPlayer