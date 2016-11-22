const test = require('tape')
const metronome = require('../src/metronome')

test('zero tempo', assert => {
  const timeStep = 1
  let tempo = 0
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  assert.equal(iterator(), 0, 'should never trigger')
  assert.equal(iterator(), 0, 'should never trigger')
  assert.equal(iterator(), 0, 'should never trigger')

  assert.end()
})

test('constant tempo of 0.5 per time step', assert => {
  const timeStep = 1234
  let tempo = 1 / 2 / timeStep
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)

  assert.end()
})

test('slowing tempo', assert => {
  const timeStep = 1
  let tempo
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  tempo = 1 / 2
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)

  tempo = 1 / 4
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)

  tempo = 1 / 8
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)

  assert.equal(iterator(), 1)

  assert.end()
})

test('constant tempo of minus 0.5 per time step', assert => {
  const timeStep = 0.123
  let tempo = -1 / 2 / timeStep
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)

  assert.end()
})

test('slowing negative tempo', assert => {
  const timeStep = 1
  let tempo
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  tempo = -1 / 2
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)

  tempo = -1 / 4
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)

  tempo = -1 / 8
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 0)
  assert.equal(iterator(), 1)

  assert.equal(iterator(), 0)

  assert.end()
})

test('click that does not align with sample in positive tempo', assert => {
  const timeStep = 1
  let tempo = 1 / 2.5
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  iterator()
  iterator()
  assert.equal(iterator(), 1)

  assert.end()
})

test('click that does not align with sample in negative tempo', assert => {
  const timeStep = 1
  let tempo = -1 / 2.5
  const generator = metronome(() => () => tempo)
  const iterator = generator(timeStep)

  iterator()
  iterator()
  assert.equal(iterator(), 1)

  assert.end()
})
