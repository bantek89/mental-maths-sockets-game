import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  initiateSocket,
  disconnectSocket,
  subscribeToRoom,
  scoreUpdated,
  targetReached,
} from './Socket'

import QuestionDisplay from './QuestionDisplay'
import ScoreDisplay from './ScoreDisplay'

const QuestionAreaContainer = () => {
  const [currentQuestionId, setQuestionId] = useState(null)
  const [currentQuestion, setQuestion] = useState(null)
  const [questionResult, setResult] = useState(null)
  const [newUserAlert, setNewUserAlert] = useState(false)
  const [teamScore, setTeamScore] = useState(null)
  const [congratsMessage, setCongrats] = useState(false)

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

  const fetchQuestion = () => {
    Axios.get('/api/question').then((response) => {
      let upNext = response.data

      setQuestion(upNext.question)
      setQuestionId(upNext.id)
      setResult(null)
      if (congratsMessage) setCongrats(false)
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

    const room = 'playing'
    if (room) initiateSocket(room)
    subscribeToRoom((err) => {
      if (err) return
      setNewUserAlert(true)
    })

    scoreUpdated((err, data) => {
      if (err) return
      setTeamScore(data.currentCount)
    })

    targetReached((err) => {
      if (err) return
      setCongrats(true)
    })

    return () => {
      disconnectSocket()
    }
  }, [])

  const NewUserDisplay = ({ newUserAlert }) => {
    useEffect(() => {
      if (alert) {
        setTimeout(() => {
          setNewUserAlert(false)
        }, 3000)
      }
    }, [])

    return <span>{newUserAlert ? <p>New user joined!</p> : null}</span>
  }

  const CongratsDisplay = ({ congratsMessage }) => {
    return <span>{congratsMessage ? <h2>Well Done! You have reached the target!</h2> : null}</span>
  }

  return (
    <>
      <ScoreDisplay questionResult={questionResult} />
      <NewUserDisplay newUserAlert={newUserAlert} />
      <h1>Team Score: {teamScore}</h1>
      <CongratsDisplay congratsMessage={congratsMessage} />
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
