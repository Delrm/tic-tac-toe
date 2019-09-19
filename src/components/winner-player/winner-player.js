import React from 'react';

const WinnerPlayer = ({ creator, opponent, winner }) => {

  const getWinner = () => winner ? (winner === 'X') 
    ? <h2>Winner is {creator}</h2>:<h2>Winner is {opponent}</h2>:null

  return (
    <>
      { getWinner() }
    </>
  )
}

export default WinnerPlayer