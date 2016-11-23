const test = require('../test/test')
const mix = require('./mix')

test('one signal', assert => {
  assert.plan(1)

  const value = 1
  const signal = () => () => value
  const generator = mix(signal)
  const iterator = generator()

  assert.equal(iterator(), value, 'should return the signal as is')
})

test('two signals', assert => {
  assert.plan(1)

  const valueA = 1
  const valueB = 2
  const signalA = () => () => valueA
  const signalB = () => () => valueB
  const generator = mix(signalA, signalB)
  const iterator = generator()

  assert.equal(iterator(), valueA + valueB, 'should mix the two signals')
})

test('three signals', assert => {
  assert.plan(1)

  const valueA = 1
  const valueB = 2
  const valueC = 3
  const signalA = () => () => valueA
  const signalB = () => () => valueB
  const signalC = () => () => valueC
  const generator = mix(signalA, signalB, signalC)
  const iterator = generator()

  assert.equal(iterator(), valueA + valueB + valueC, 'should mix all signals')
})
