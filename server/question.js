const question = exports

const storage = require('node-persist')

const competition = require('./competition')
const utils = require('./utils')

storage.init()

question.generateQuestion = () => {
  let generateRandomQuestion = () => {
    const questionOptions = [
      question.generatQuestion('+'),
      question.generatQuestion('-'),
      question.generatQuestion('*'),
      question.generatQuestion('/'),
    ]

    return questionOptions[Math.floor(Math.random() * questionOptions.length)]
  }

  let newQuestion = generateRandomQuestion()

  let uniqueId = utils.generateUniqueId()

  return storage.setItem(uniqueId, newQuestion).then(() => {
    return {
      id: uniqueId,
      question: newQuestion,
    }
  })
}

question.generatQuestion = (operation) => {
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
