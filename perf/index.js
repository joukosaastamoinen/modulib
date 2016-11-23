const runTest = require('./lib/run-test')

const TEST_DIR = './tests'

const tests = [
  'sine-single-function',
  'sine'
]

tests.forEach(testModule => {
  const test = require(`${TEST_DIR}/${testModule}`)
  runTest(testModule, test)
})
