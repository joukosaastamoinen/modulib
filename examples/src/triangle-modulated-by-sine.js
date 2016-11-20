const {constant, sine, triangle, amp} = require('audiate')

const mod = amp(
  constant(220),
  sine(constant(3.7))
)

module.exports = () => triangle(mod)
