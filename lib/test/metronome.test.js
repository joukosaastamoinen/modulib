const test = require('tape')
const metronome = require('../src/metronome')

test('metronome', assert => {
  const timeStep = 1 / 16
  let tempo = 1 / 2 / timeStep
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)

  // Slow down
  tempo = 1 / 3 / timeStep

  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)

  assert.end()
})
