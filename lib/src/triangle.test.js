const test = require('../test/test')
const constant = require('./constant')
const triangle = require('./triangle')

test('triangle', assert => {
  const timeStep = 1 / 16
  const frequency = 2
  const generator = triangle(constant(frequency))()

  assert.equal(generator(timeStep), 0)
  assert.equal(generator(timeStep), 0.5)
  assert.equal(generator(timeStep), 1)
  assert.equal(generator(timeStep), 0.5)
  assert.equal(generator(timeStep), 0)
  assert.equal(generator(timeStep), -0.5)
  assert.equal(generator(timeStep), -1)
  assert.equal(generator(timeStep), -0.5)

  assert.equal(generator(timeStep), 0)
  assert.equal(generator(timeStep), 0.5)

  assert.end()
})
