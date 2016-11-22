const test = require('tape')
const ad = require('../src/ad')

test('ad', assert => {
  const timeStep = 1 / 16
  const attack = timeStep * 2
  const decay = timeStep * 4
  let trigger = 1
  const generator = ad(
    () => () => attack,
    () => () => decay,
    () => () => trigger
  )
  const iterator = generator()

  assert.equal(iterator(timeStep), 0)
  trigger = 0

  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 1)
  assert.equal(iterator(timeStep), 0.75)
  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 0.25)
  assert.equal(iterator(timeStep), 0)
  assert.equal(iterator(timeStep), 0)

  trigger = 1
  assert.equal(iterator(timeStep), 0)
  trigger = 0

  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 1)
  assert.equal(iterator(timeStep), 0.75)
  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 0.25)
  assert.equal(iterator(timeStep), 0)
  assert.equal(iterator(timeStep), 0)

  trigger = 1
  assert.equal(iterator(timeStep), 0)
  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 1)
  assert.equal(iterator(timeStep), 0.75)
  assert.equal(iterator(timeStep), 0.5)
  assert.equal(iterator(timeStep), 0.25)
  assert.equal(iterator(timeStep), 0)

  assert.end()
})
