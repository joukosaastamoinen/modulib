const {constant, sine, amp, ad, metronome} = require('audiate')

const bpm = 120
const tempo = constant(bpm / 60)

module.exports = () => sine(
  amp(
    constant(300),
    ad(
      constant(0.1),
      constant(0.2),
      metronome(tempo)
    )
  )
)
