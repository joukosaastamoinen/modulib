const test = require('../../test/test')
const funcToModule = require('./func-to-module')

'it should call the function with input stream '

test('arity of 0', assert => {
  assert.plan(1)

  const timeStep = 321
  const returnValue = 123
  const fn = () => returnValue
  const module = funcToModule(fn)
  const iterator = module()()

  assert.equal(iterator(timeStep), returnValue,
    'should yield the return value of fn')
})

test('arity of 1', assert => {
  assert.plan(1)

  const timeStep = 234
  const arg = 456
  const fn = x => x * 123
  const module = funcToModule(fn)
  const iterator = module(() => step => arg * step)()

  assert.equal(iterator(timeStep), fn(arg * timeStep),
    'should yield the return value of fn')
})

test('arity of 2', assert => {
  assert.plan(1)

  const timeStep = 123
  const arg1 = 456
  const arg2 = 786
  const fn = (a, b) => a * 123 + b * 456
  const module = funcToModule(fn)
  const iterator = module(() => step => arg1 * step, () => step => arg2 * step)()

  assert.equal(iterator(timeStep), fn(arg1 * timeStep, arg2 * timeStep),
    'should yield the return value of fn')
})
