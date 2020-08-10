const question = exports

const storage = require('node-persist')

const competition = require('./competition')
const utils = require('./utils')

storage.init()

const newQuestion = () => {
  let generateRandomQuestion = () => {
    const questionOptions = [
      question.generateQuestionObj('+'),
      question.generateQuestionObj('-'),
      question.generateQuestionObj('*'),
      question.generateQuestionObj('/'),
    ]
    return questionOptions[Math.floor(Math.random() * questionOptions.length)]
  }

  let generatedQuestion = generateRandomQuestion()

  if (Number.isInteger(question.getCorrectAnswer(generatedQuestion))) {
    return generatedQuestion
  } else {
    return newQuestion()
  }
}

question.generateQuestion = () => {
  let uniqueId = utils.generateUniqueId()
  let question = newQuestion()

  return storage.setItem(uniqueId, question).then(() => {
    return {
      id: uniqueId,
      question,
    }
  })
}

question.generateQuestionObj = (operation) => {
  return {
    left: utils.generateNumber(9),
    right: utils.generateNumber(9),
    operation,
  }
}

question.verifyAnswer = (answerObj) => {
  return storage.getItem(answerObj.id).then((questionObj) => {
    let correctAnswer = question.getCorrectAnswer(questionObj)

    let isCorrect = parseInt(answerObj.answer) === correctAnswer

    if (isCorrect) {
      competition.incrementCorrectAnswers()
    }

    return isCorrect ? 'correct' : 'incorrect'
  })
}

question.getCorrectAnswer = (questionObj) => {
  switch (questionObj.operation) {
    case '+':
      return parseInt(questionObj.left) + parseInt(questionObj.right)
    case '-':
      return parseInt(questionObj.left) - parseInt(questionObj.right)
    case '*':
      return parseInt(questionObj.left) * parseInt(questionObj.right)
    case '/':
      return parseInt(questionObj.left) / parseInt(questionObj.right)
    default:
      throw new Error('Invalid operation')
  }
}
