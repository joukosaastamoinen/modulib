const R = require('ramda')

const {constant, sine, triangle, amp} = require('audiate')

module.exports = R.pipe(
  () => 0.7,
  constant,
  sine,
  amp(constant(1)),
  sine,
  amp(constant(10)),
  sine,
  amp(constant(5)),
  sine,
  amp(constant(220)),
  triangle
)
