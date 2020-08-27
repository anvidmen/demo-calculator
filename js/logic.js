const REGEX = /^[\d./+*-]*[-/+*]0$/

function addDecimal (result, value) {
  if (canAddDecimals(result)) {
    return result + value
  } else return result
}

function concatValue (result, value) {
  if (!isNaN(value)) return result + value
  if (value === '.') return addDecimal(result, value)
  if (isLastDigitIsNum(result)) return result + value
  if (isLastDigitIsOperator(result)) {
    return result.substring(0, result.length - 1) + value
  }
  return result
}

function add (value, totalCalculator) {
  if (typeof value !== 'string') {
    throw new TypeError(`${value} is not a string`)
  }

  if (typeof totalCalculator !== 'string') {
    throw new TypeError(`${totalCalculator} is not a string`)
  }

  if (totalCalculator === '0') {
    if (value === '/' || value === '*' || value === '-' ||
        value === '+' || value === '.') {
      return '0' + value
    } else return value
  } else if (REGEX.test(totalCalculator) && !isNaN(value)) {
    return totalCalculator.substring(0, totalCalculator.length - 1) + value
  } else return concatValue(totalCalculator, value)
}

function canAddDecimals (result) {
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] === '.') {
      return false
    } else if (isNaN(result[i])) {
      return true
    }
  }
  return true
}

function isLastDigitIsNum (result) {
  if (isNaN(result[result.length - 1])) {
    return false
  }
  return true
}

function isLastDigitIsOperator (result) {
  if (result[result.length - 1] === '+' ||
      result[result.length - 1] === '-' ||
      result[result.length - 1] === '/' ||
      result[result.length - 1] === '*') {
    return true
  }
  return false
}

function decimals (value) {
  const number = Number.parseFloat(value)

  if (Number.isInteger(number)) return number.toString()

  return number.toFixed(2)
}

function calculations (totalCalculator) {
  totalCalculator = eval(totalCalculator)

  return decimals(totalCalculator)
}

function deleteLastDigit (totalCalculator) {
  if (totalCalculator.length === 1) totalCalculator = 0
  else if (totalCalculator.length > 0) totalCalculator = totalCalculator.substring(0, totalCalculator.length - 1)

  return totalCalculator.toString()
}

function totalDelete () {
  const result = 0
  return result.toString()
}

export { add, calculations, deleteLastDigit, totalDelete }
