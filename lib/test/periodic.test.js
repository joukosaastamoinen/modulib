const test = require('tape')
const periodic = require('../src/periodic')

test('periodic', assert => {
  const timeStep = 1 / 16
  let interval = timeStep * 2
  const generator = periodic(() => () => interval)
  const iterator = generator(timeStep)

  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)

  // Slow down
  interval = timeStep * 3

  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)

  assert.end()
})
