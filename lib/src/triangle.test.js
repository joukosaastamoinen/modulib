const test = require('tape')
const constant = require('./constant')
const triangle = require('./triangle')

test('triangle', assert => {
  const timeStep = 1 / 16
  const frequency = 2
  const generator = triangle(constant(frequency))
  const iterator = generator()

  assert.equal(iterator(timeStep), 0)
  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 1)
  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 0)
  assert.equal(iterator(timeStep), -0.5)
  assert.equal(iterator(timeStep), -1)
  assert.equal(iterator(timeStep), -0.5)

  assert.equal(iterator(timeStep), 0)
  assert.equal(iterator(timeStep), 0.5)

  assert.end()
})
