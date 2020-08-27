import { add, calculations, deleteLastDigit, totalDelete } from './logic.js'

const numberElements = document.getElementsByClassName('numbers')
const operationElements = document.getElementsByClassName('operations')

for (let i = 0; i < numberElements.length; i++) {
  const element = numberElements[i]
  element.addEventListener('click', (e) => {
    const result = add(e.currentTarget.value, getResult())
    setResult(result)
  })
}

for (let i = 0; i < operationElements.length; i++) {
  const element = operationElements[i]
  element.addEventListener('click', (e) => {
    const totalCalculator = getResult()
    let result = '0'

    switch (e.currentTarget.value) {
      case 'AC':
        result = totalDelete()
        break

      case 'C':
        result = deleteLastDigit(totalCalculator)
        break

      case '÷':
        result = add('/', totalCalculator)
        break

      case '×':
        result = add('*', totalCalculator)
        break

      case '−':
        result = add('-', totalCalculator)
        break

      case '+':
        result = add('+', totalCalculator)
        break

      case '=':
        result = calculations(totalCalculator)
        break

      default:
        console.error(`Sorry, the inserted value is invalid ${e.currentTarget.value}.`)
    }
    setResult(result)
  })
}

function setResult (value) {
  document.getElementById('result').value = value
}

function getResult () {
  return document.getElementById('result').value
}
