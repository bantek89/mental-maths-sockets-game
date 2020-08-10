import React, { useState, useEffect } from 'react'

import './css/ScoreDisplay.css'

const ScoreDisplay = ({ questionResult, teamScore }) => {
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (questionResult === 'correct') {
      setScore((score) => score + 1)
    }
  }, [questionResult])

  return (
    <table className="score-display">
      <thead>
        <tr>
          <th>Team Score:</th>
          <th>Your score:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div>{teamScore}</div>
          </td>
          <td>
            <div>{score}</div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ScoreDisplay
