const test = require('../../test/test')
const linear = require('../../test/linear')
const constant = require('../constant')
const integral = require('./integral')

test('return value at first step', assert => {
  assert.plan(1)

  const timeStep = 456
  const sequence = constant(123)
  const generator = integral(sequence)()

  const expected = 0
  const actual = generator(timeStep)

  assert.equal(actual, expected, 'should return zero')
})

test('return value at second step with a linearly growing value', assert => {
  assert.plan(1)

  const slope = 1
  const timeStep = 0.5
  const sequence = linear(slope)
  const generator = integral(sequence)()

   // Advance to second step
  generator(timeStep)

  const expected = 0 + ((0 + 0.5) / 2 * timeStep)
  const actual = generator(timeStep)

  assert.equal(actual, expected,
    'should return the numerical integral at 0.5')
})

test('return value at second step with a constant value', assert => {
  assert.plan(1)

  const timeStep = 0.5
  const sequence = constant(100)
  const generator = integral(sequence)()

   // Advance to second step
  generator(timeStep)

  const expected = 100 * 0.5
  const actual = generator(timeStep)

  assert.equal(actual, expected,
    'should return the numerical integral at 0.5')
})

test('return value at third step with a linearly growing value', assert => {
  assert.plan(1)

  const slope = 1
  const timeStep = 0.5
  const sequence = linear(slope)
  const generator = integral(sequence)()

   // Advance to second step
  generator(timeStep)
  generator(timeStep)

  const expected = 0 + ((0 + 0.5) / 2 * timeStep) + ((0.5 + 1) / 2 * timeStep)
  const actual = generator(timeStep)

  assert.equal(actual, expected,
    'should return the numerical integral at 1')
})
