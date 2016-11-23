const test = require('tape')
const constant = require('../constant')
const integral = require('./integral')

const linear = slope => () => {
  let value = 0
  return step => {
    const currentValue = value
    value += slope * step
    return currentValue
  }
}

test('integral', t => {
  t.test('return value at first step', assert => {
    assert.plan(1)

    const timeStep = 456
    const sequence = constant(123)
    const generator = integral(sequence)
    const iterator = generator()

    const expected = 0
    const actual = iterator(timeStep)

    assert.equal(actual, expected, 'should return zero')
  })

  t.test('return value at second step with a linearly growing value', assert => {
    assert.plan(1)

    const slope = 1
    const timeStep = 0.5
    const sequence = linear(slope)
    const generator = integral(sequence)
    const iterator = generator()

     // Advance to second step
    iterator(timeStep)

    const expected = 0 + ((0 + 0.5) / 2 * timeStep)
    const actual = iterator(timeStep)

    assert.equal(actual, expected,
      'should return the numerical integral at 0.5')
  })

  t.test('return value at second step with a constant value', assert => {
    assert.plan(1)

    const timeStep = 0.5
    const sequence = constant(100)
    const generator = integral(sequence)
    const iterator = generator()

     // Advance to second step
    iterator(timeStep)

    const expected = 100 * 0.5
    const actual = iterator(timeStep)

    assert.equal(actual, expected,
      'should return the numerical integral at 0.5')
  })

  t.test('return value at third step with a linearly growing value', assert => {
    assert.plan(1)

    const slope = 1
    const timeStep = 0.5
    const sequence = linear(slope)
    const generator = integral(sequence)
    const iterator = generator()

     // Advance to second step
    iterator(timeStep)
    iterator(timeStep)

    const expected = 0 + ((0 + 0.5) / 2 * timeStep) + ((0.5 + 1) / 2 * timeStep)
    const actual = iterator(timeStep)

    assert.equal(actual, expected,
      'should return the numerical integral at 1')
  })
})
