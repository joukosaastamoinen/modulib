const {NUM_ITERATIONS, TIME_STEP} = require('../constants')
const {sine, constant} = require('../..')

module.exports = () => {
  const generator = sine(constant(440))()
  return () => {
    for (let i = 0; i < NUM_ITERATIONS; i++) {
      generator(TIME_STEP)
    }
  }
}
