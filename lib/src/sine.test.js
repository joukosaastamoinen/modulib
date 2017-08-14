const test = require('../test/test')
const {TAU} = require('./lib/constants')
const constant = require('./constant')
const sine = require('./sine')

test('shape', assert => {
  assert.plan(8)

  const timeStep = 1 / 16
  const frequency = 2
  const generator = sine(constant(frequency))()

  assert.equalsApproximately(generator(timeStep), 0)
  assert.equalsApproximately(generator(timeStep), Math.sin(1 / 8 * TAU))
  assert.equalsApproximately(generator(timeStep), 1)
  assert.equalsApproximately(generator(timeStep), Math.sin(3 / 8 * TAU))
  assert.equalsApproximately(generator(timeStep), 0)
  assert.equalsApproximately(generator(timeStep), Math.sin(5 / 8 * TAU))
  assert.equalsApproximately(generator(timeStep), -1)
  assert.equalsApproximately(generator(timeStep), Math.sin(7 / 8 * TAU))
})

test('periodicity', assert => {
  assert.plan(4)

  const timeStep = 1
  const frequency = 1 / 4
  const generator = sine(constant(frequency))()

  assert.equalsApproximately(generator(timeStep), 0)
  assert.equalsApproximately(generator(timeStep), 1)
  assert.equalsApproximately(generator(timeStep), 0)
  assert.equalsApproximately(generator(timeStep), -1)
})

test('frequency change', assert => {
  assert.plan(1)

  const timeStep = 1
  const frequency1 = 1 / 4
  const frequency2 = 1 / 8
  let frequency = frequency1
  const generator = sine(() => () => frequency)()
  const numIterationsBeforeFrequencyChange = 4

  for (let i = 0; i < numIterationsBeforeFrequencyChange; i++) {
    generator(timeStep)
  }

  frequency = frequency2
  const expectedPhase = (
    frequency1 * (numIterationsBeforeFrequencyChange - 1) +
    (frequency1 + frequency2) / 2
  )
  assert.equalsApproximately(generator(timeStep), Math.sin(expectedPhase * TAU))
})
