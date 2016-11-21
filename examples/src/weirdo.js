const {constant, sine, triangle, amp} = require('audiate')

module.exports = () =>
  triangle(
    amp(
      constant(220),
      sine(
        amp(
          constant(5),
          sine(
            amp(
              constant(10),
              sine(
                constant(0.7)
              )
            )
          )
        )
      )
    )
  )
