const test = require('tape')
const constant = require('../../src/constant')
const integral = require('../../src/lib/integral')

const linear = slope => stepSize => {
  let value = 0
  return () => {
    const currentValue = value
    value += slope * stepSize
    return currentValue
  }
}

test('integral', t => {
  t.test('return value at first step', assert => {
    const stepSize = 456
    const sequence = constant(123)
    const generator = integral(sequence)
    const iterator = generator(stepSize)

    const expected = 0
    const actual = iterator()

    assert.equal(actual, expected, 'should return zero')
    assert.end()
  })

  t.test('return value at second step with a linearly growing value', assert => {
    const slope = 1
    const stepSize = 0.5
    const sequence = linear(slope)
    const generator = integral(sequence)
    const iterator = generator(stepSize)

     // Advance to second step
    iterator()

    const expected = 0 + ((0 + 0.5) / 2 * stepSize)
    const actual = iterator()

    assert.equal(actual, expected,
      'should return the numeric integral at 0.5')
    assert.end()
  })

  t.test('return value at second step with a constant value', assert => {
    const stepSize = 0.5
    const sequence = constant(100)
    const generator = integral(sequence)
    const iterator = generator(stepSize)

     // Advance to second step
    iterator()

    const expected = 100 * 0.5
    const actual = iterator()

    assert.equal(actual, expected,
      'should return the numeric integral at 0.5')
    assert.end()
  })

  t.test('return value at third step with a linearly growing value', assert => {
    const slope = 1
    const stepSize = 0.5
    const sequence = linear(slope)
    const generator = integral(sequence)
    const iterator = generator(stepSize)

     // Advance to second step
    iterator()
    iterator()

    const expected = 0 + ((0 + 0.5) / 2 * stepSize) + ((0.5 + 1) / 2 * stepSize)
    const actual = iterator()

    assert.equal(actual, expected,
      'should return the numeric integral at 1')
    assert.end()
  })
})
