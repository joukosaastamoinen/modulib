const oscillator = func => Frequency => () => {
  const getFrequency = Frequency()
  let frequency = undefined
  let phase = 0
  return step => {
    const previousFrequency = frequency
    frequency = getFrequency(step)
    phase += previousFrequency === undefined ? 0 : (frequency + previousFrequency) / 2 * step
    return func(phase)
  }
}

module.exports = oscillator
