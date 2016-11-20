const {TAU} = require('./lib/constants')
const oscillator = require('./lib/oscillator')

const sine = phase => Math.sin(TAU * phase)

module.exports = oscillator(sine)
