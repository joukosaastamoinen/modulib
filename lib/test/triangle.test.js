const test = require('tape')
const constant = require('../src/constant')
const triangle = require('../src/triangle')

test('triangle', assert => {
  const timeStep = 1 / 16
  const frequency = 2
  const generator = triangle(constant(frequency))
  const iterator = generator(timeStep)

  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0.5)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0.5)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), -0.5)
  assert.equal(iterator(), -1)
  assert.equal(iterator(), -0.5)

  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0.5)

  assert.end()
})
