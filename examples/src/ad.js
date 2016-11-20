const {constant, sine, amp, ad, periodic} = require('audiate')

module.exports = () => sine(
  amp(
    constant(200),
    ad(
      constant(0.001),
      constant(0.1),
      periodic(constant(0.5))
    )
  )
)
