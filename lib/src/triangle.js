const oscillator = require('./lib/oscillator')

const triangle = phase => {
  // Nudge phase so that period starts with a zero
  const nudgedPhase = phase + 0.25
  return 4 * Math.abs(Math.round(nudgedPhase) - nudgedPhase) - 1
}

module.exports = oscillator(triangle)
