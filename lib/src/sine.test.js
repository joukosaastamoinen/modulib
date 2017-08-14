const test = require('../test/test')
const linear = require('../test/linear')
const times = require('../test/times')
const constant = require('./constant')
const sine = require('./sine')

test('shape', assert => {
  assert.plan(1)
  const timeStep = 1 / 16
  const frequency = 2
  const generator = sine(constant(frequency))()

  const expected = [0, 0.7071, 1, 0.7071]
  const actual = times(() => generator(timeStep), 4)
  assert.equalsApproximately(actual, expected, 'should produce a sine wave')
})

test('periodicity', assert => {
  assert.plan(1)
  const timeStep = 1
  const frequency = 1 / 4
  const generator = sine(constant(frequency))()

  const expected = [0, 1, 0, -1, 0, 1, 0, -1]
  const actual = times(() => generator(timeStep), 8)
  assert.equalsApproximately(actual, expected, 'should repeat')
})

test('frequency change', assert => {
  assert.plan(1)
  const timeStep = 1
  const generator = sine(linear(0.01))()

  const expected = [0, 0.0314, 0.1253, 0.2790]
  const actual = times(() => generator(timeStep), 4)
  assert.equalsApproximately(actual, expected, 'should accelerate')
})
