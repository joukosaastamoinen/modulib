const test = require('tape')
const {TAU} = require('../src/lib/constants')
const constant = require('../src/constant')
const sine = require('../src/sine')

test('sine', assert => {
  const assertEqualsApproximately = (a, b) => {
    const DELTA = 1 / 4096
    assert.ok(Math.abs(a - b) < DELTA, `${a} should approximately equal ${b}`)
  }

  const timeStep = 1 / 16
  const frequency = 2
  const generator = sine(constant(frequency))
  const iterator = generator(timeStep)

  assertEqualsApproximately(iterator(), 0)
  assertEqualsApproximately(iterator(), Math.sin(1 / 8 * TAU))
  assertEqualsApproximately(iterator(), 1)
  assertEqualsApproximately(iterator(), Math.sin(3 / 8 * TAU))
  assertEqualsApproximately(iterator(), 0)
  assertEqualsApproximately(iterator(), Math.sin(5 / 8 * TAU))
  assertEqualsApproximately(iterator(), -1)
  assertEqualsApproximately(iterator(), Math.sin(7 / 8 * TAU))

  assertEqualsApproximately(iterator(), 0)
  assertEqualsApproximately(iterator(), Math.sin(1 / 8 * TAU))

  assert.end()
})