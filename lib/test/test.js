const tape = require('tape')
const addAssertions = require('extend-tape')

const equalsApproximately = (a, b) => {
  const DELTA = 1 / 4096
  return Math.abs(a - b) < DELTA
}

const arrayOfNumbersEqualsApproximately = (a, b) => {
  return a.every((value, index) => equalsApproximately(value, b[index]))
}

const test = addAssertions(tape, {
  equalsApproximately (actual, expected, message) {
    this._assert(
      (
        (
          typeof actual === 'number' &&
          typeof expected === 'number' &&
          equalsApproximately(actual, expected)
        ) ||
        (
          Array.isArray(actual) &&
          Array.isArray(expected) &&
          arrayOfNumbersEqualsApproximately(actual, expected)
        )
      ),
      {
        message: message || 'should equal approximately',
        operator: 'equalsApproximately',
        actual,
        expected
      }
    )
  }
})

module.exports = test
