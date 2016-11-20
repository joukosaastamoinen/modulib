const integrate = input => step => {
  const iterator = input(step)
  let value = undefined
  let integral = 0
  return () => {
    const previousValue = value
    value = iterator()
    integral += previousValue === undefined ? 0 : (value + previousValue) / 2 * step
    return integral
  }
}

module.exports = integrate
