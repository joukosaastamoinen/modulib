const {NUM_ITERATIONS, TIME_STEP} = require('../constants')
const {sine, constant} = require('../../lib')

module.exports = () => {
  const iterator = sine(constant(440))()
  return () => {
    for (let i = 0; i < NUM_ITERATIONS; i++) {
      iterator(TIME_STEP)
    }
  }
}
