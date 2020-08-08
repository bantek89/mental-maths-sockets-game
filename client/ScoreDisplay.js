import React, { useState, useEffect } from 'react'

const ScoreDisplay = ({ questionResult }) => {
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (questionResult === 'correct') {
      setScore((score) => score + 1)
    }
  }, [questionResult])

  return <h2>Your score: {score}</h2>
}

export default ScoreDisplay
