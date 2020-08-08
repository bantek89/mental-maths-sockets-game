import React, { useState } from 'react'

import './css/QuestionDisplay.css'

const QuestionDisplay = ({ handleNextQuestion, handleSubmitAnswer, question, questionResult }) => {
  const [answer, setAnswer] = useState('')

  if (!question) {
    return <h3>Loading...</h3>
  }

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
    <div className="question_display_wrapper">
      <div className="question_display">
        <p>
          <span>{question.left}</span>
          <DisplayOperation question={question} />
          <span>{question.right}</span>
        </p>
      </div>
      <div className="question_answer_box">
        <label>Answer:</label>
        <input
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
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
