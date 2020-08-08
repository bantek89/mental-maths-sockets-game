import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { initiateSocket, disconnectSocket, subscribeToRoom, scoreUpdated } from './Socket'

import QuestionDisplay from './QuestionDisplay'
import ScoreDisplay from './ScoreDisplay'

const QuestionAreaContainer = () => {
  const [currentQuestionId, setQuestionId] = useState(null)
  const [currentQuestion, setQuestion] = useState(null)
  const [questionResult, setResult] = useState(null)
  const [alert, setAlert] = useState(false)
  const [teamScore, setTeamScore] = useState(null)

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

  const room = 'playing'

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

    if (room) initiateSocket(room)
    subscribeToRoom((err) => {
      if (err) return
      setAlert(true)
    })

    scoreUpdated((err, data) => {
      if (err) return
      setTeamScore(data.currentCount)
    })

    return () => {
      disconnectSocket()
    }
  }, [])

  const DisplayNewUserAlert = ({ alert }) => {
    useEffect(() => {
      if (alert) {
        setTimeout(() => {
          setAlert(false)
        }, 3000)
      }
    }, [])

    return <span>{alert ? <p>New user joined!</p> : null}</span>
  }

  return (
    <>
      <ScoreDisplay questionResult={questionResult} />
      <DisplayNewUserAlert alert={alert} />
      <h1>Team Score: {teamScore}</h1>
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
