const funcToModule = require('./lib/func-to-module')

const amp = funcToModule((a, b) => a * b)

module.exports = amp
