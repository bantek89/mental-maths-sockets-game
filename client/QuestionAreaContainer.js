import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import io from 'socket.io-client'

import QuestionDisplay from './QuestionDisplay'
import ScoreDisplay from './ScoreDisplay'

const QuestionAreaContainer = () => {
  const [currentQuestionId, setQuestionId] = useState(null)
  const [currentQuestion, setQuestion] = useState(null)
  const [questionResult, setResult] = useState(null)

  /**
   * Events sent from server:
   *  - "player_joined" :: {} : a new player has joined the room (not you)
   *
   *  - "score_updated" :: {target, currentCount} : the score (currentCount) has been updated
   *                                               (also sent when you join the room to let you know current status)
   *
   *  - "target_reached" :: {} : sent when the team reach the target correct answers
   *                             followed immediately by a "score_update" message to inform of new target
   */
  const socket = io('/')

  const fetchQuestion = () => {
    Axios.get('/api/question').then((response) => {
      let upNext = response.data

      setQuestion(upNext.question)
      setQuestionId(upNext.id)
      setResult(null)
    })
  }

  const handleSubmitAnswer = (userResponse) => {
    Axios.post('/api/answer', {
      id: currentQuestionId,
      answer: userResponse,
    }).then((response) => {
      setResult(response.data.result)
    })
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  return (
    <>
      <ScoreDisplay questionResult={questionResult} />
      <QuestionDisplay
        question={currentQuestion}
        questionResult={questionResult}
        handleSubmitAnswer={handleSubmitAnswer}
        handleNextQuestion={fetchQuestion}
      />
    </>
  )
}

export default QuestionAreaContainer
