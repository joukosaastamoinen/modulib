/* eslint-disable no-console */
const pad = require('pad')

const runTest = (name, setup) => {
  const msg = pad(40, name)
  const test = setup()
  console.time(msg)
  test()
  console.timeEnd(msg)
}

module.exports = runTest
