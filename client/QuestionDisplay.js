import React, { useState, useEffect } from 'react'

import './css/QuestionDisplay.css'

const NumbersDisplay = ({ question }) => {
  const colors = [
    'rgb(255, 3, 62, 150)',
    'rgb(232, 57, 110, 150)',
    'rgb(31, 173, 102, 150)',
    'rgb(255, 117, 24, 150)',
    'rgb(0, 191, 255, 150)',
    'rgb(0, 128, 128, 150)',
    'rgb(251, 96, 127, 150)',
    'rgb(170, 152, 169, 150)',
    'rgb(255, 204, 51, 150)',
    'rgb(162, 162, 208, 150)',
    'rgb(53, 164, 248, 150)',
    'rgb(255, 196, 12, 150)',
    'rgb(154, 205, 50, 150)',
    'rgb(102, 255, 0, 150)',
    'rgb(160, 32, 240, 150)',
  ]
  const randomiser = (num) => Math.floor(Math.random() * num)
  const [randomColor, setRandomColor] = useState(colors[randomiser(colors.length)])

  useEffect(() => {
    setRandomColor(colors[randomiser(colors.length)])
  }, [question])

  const DisplayOperation = ({ question }) => {
    return (
      <span>
        {question.operation === '+' || question.operation === '-' ? (
          <span>{question.operation}</span>
        ) : null}
        {question.operation === '*' ? <span>x</span> : null}
        {question.operation === '/' ? <span>÷</span> : null}
      </span>
    )
  }

  return (
    <div className="question_display">
      <div style={{ border: `${randomColor} 5px solid` }}>{question.left}</div>
      <DisplayOperation question={question} />
      <div style={{ border: `${randomColor} 5px solid` }}>{question.right}</div>
    </div>
  )
}

const QuestionDisplay = ({ handleNextQuestion, handleSubmitAnswer, question, questionResult }) => {
  const [answer, setAnswer] = useState('')

  if (!question) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="question_display_wrapper">
      <NumbersDisplay question={question} />
      <div className="question_answer_box">
        <label>=</label>
        <input
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <div className="question_answer_result-box">
        {questionResult === 'correct' && <p>Correct!</p>}
        {questionResult === 'incorrect' && <p>Incorrect :(</p>}
        {questionResult ? (
          <button
            onClick={() => {
              setAnswer('')
              handleNextQuestion()
            }}
          >
            NEXT
          </button>
        ) : (
          <button onClick={() => handleSubmitAnswer(answer)}>GO</button>
        )}
      </div>
    </div>
  )
}

export default QuestionDisplay
