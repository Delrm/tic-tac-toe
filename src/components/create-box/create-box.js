import React from 'react';
import './create-box.css'

const CreateBox = ({ playerStatus, board, turn, boxClick }) => {

  const youTurn = (playerStatus === 'creator') ? 'X':'O'

  const zeroStyle = (playerStatus === 'watch') ? 'zero-grey':'zero'
  const boardColorStyle = (playerStatus !== 'watch') ? 'box-game-color':'box-watch-color'

  const boxElements = board.map((cell, index) => {
    let cellStyle = cell ? cell === 'X' ? 'cross':zeroStyle:null

    return (
    <div className={`box box-${index} ${boardColorStyle}`}  key={index}
      onClick={(youTurn === turn) ?() => boxClick(index):null}>
      <div className={`box ${cellStyle}`}></div>
    </div>
    )
  })
  
  return (
    <>
      { boxElements }
    </>
  )
}

export default CreateBox