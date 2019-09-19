import React from 'react'

const Timer = ({ timer }) => {

const calculateTime = () => {
  let resultTime = new Date(timer * 1000).toISOString().substr(11, 8)
  return resultTime
}

  return (
    <>
      { calculateTime() }
    </>
  )
}

export default Timer
