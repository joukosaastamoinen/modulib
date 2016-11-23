const test = require('../test/test')
const {TAU} = require('./lib/constants')
const constant = require('./constant')
const sine = require('./sine')

test('sine', assert => {
  const timeStep = 1 / 16
  const frequency = 2
  const generator = sine(constant(frequency))
  const iterator = generator()

  assert.equalsApproximately(iterator(timeStep), 0)
  assert.equalsApproximately(iterator(timeStep), Math.sin(1 / 8 * TAU))
  assert.equalsApproximately(iterator(timeStep), 1)
  assert.equalsApproximately(iterator(timeStep), Math.sin(3 / 8 * TAU))
  assert.equalsApproximately(iterator(timeStep), 0)
  assert.equalsApproximately(iterator(timeStep), Math.sin(5 / 8 * TAU))
  assert.equalsApproximately(iterator(timeStep), -1)
  assert.equalsApproximately(iterator(timeStep), Math.sin(7 / 8 * TAU))

  assert.equalsApproximately(iterator(timeStep), 0)
  assert.equalsApproximately(iterator(timeStep), Math.sin(1 / 8 * TAU))

  assert.end()
})
