const {NUM_ITERATIONS, TIME_STEP} = require('../constants')
const {TAU} = require('../../src/lib/constants')
const {constant} = require('../..')

module.exports = () => {
  const sine = Frequency => () => {
    const nextFrequency = Frequency()
    let phase = 0
    let previousFrequency = undefined
    return step => {
      const frequency = nextFrequency(step)
      const value = Math.sin(TAU * phase)
      phase += previousFrequency === undefined ? 0 : (frequency + previousFrequency) / 2 * step
      previousFrequency = frequency
      return value
    }
  }

  const generator = sine(constant(440))()

  return () => {
    for (let i = 0; i < NUM_ITERATIONS; i++) {
      generator(TIME_STEP)
    }
  }
}
