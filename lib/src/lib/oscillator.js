const integral = require('./integral')
const funcToModule = require('./func-to-module')

const oscillator = func => frequency => {
  const module = funcToModule(func)
  const phase = integral(frequency)
  return module(phase)
}

module.exports = oscillator
