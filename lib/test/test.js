const tape = require('tape')
const addAssertions = require('extend-tape')

const test = addAssertions(tape, {
  equalsApproximately (a, b) {
    const DELTA = 1 / 4096
    this.ok(Math.abs(a - b) < DELTA, `${a} should equal approximately ${b}`)
  }
})

module.exports = test
