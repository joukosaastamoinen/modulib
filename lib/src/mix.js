import sum from './lib/sum.js'
import funcToModule from './lib/func-to-module.js'

const mix = funcToModule(sum)

export default mix
