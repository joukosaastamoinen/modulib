const test = require('../test/test')
const linear = require('../test/linear')
const times = require('../test/times')
const constant = require('./constant')
const triangle = require('./triangle')

test('shape', assert => {
  assert.plan(1)
  const timeStep = 1 / 16
  const frequency = 2
  const generator = triangle(constant(frequency))()

  const expected = [0, 0.5, 1, 0.5, 0, -0.5, -1, -0.5]
  const actual = times(() => generator(timeStep), 8)
  assert.deepEqual(actual, expected, 'should produce a triangle wave')
})

test('periodicity', assert => {
  assert.plan(1)
  const timeStep = 1
  const frequency = 1 / 4
  const generator = triangle(constant(frequency))()

  const expected = [0, 1, 0, -1, 0, 1, 0, -1]
  const actual = times(() => generator(timeStep), 8)
  assert.deepEqual(actual, expected, 'should repeat')
})

test('frequency change', assert => {
  assert.plan(1)
  const timeStep = 1
  const generator = triangle(linear(0.01))()

  const expected = [0, 0.020000000000000018, 0.08000000000000007, 0.17999999999999994]
  const actual = times(() => generator(timeStep), 4)
  assert.deepEqual(actual, expected, 'should accelerate')
})
