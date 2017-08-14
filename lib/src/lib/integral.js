const integrate = input => () => {
  const generator = input()
  let value = undefined
  let integral = 0
  return step => {
    const previousValue = value
    value = generator(step)
    integral += previousValue === undefined ? 0 : (value + previousValue) / 2 * step
    return integral
  }
}

module.exports = integrate
