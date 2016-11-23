const sum = require('./lib/sum')
const funcToModule = require('./lib/func-to-module')

const mix = funcToModule(sum)

module.exports = mix
