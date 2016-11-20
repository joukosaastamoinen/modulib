const {curryN} = require('ramda')

/**
 * Convert any function to a module.
 *
 * **Example:**
 * ```js
 * const add = (a, b) => a + b
 * const mixer = funcToModule(add)
 *
 * // Now you can connect mixer to any other module:
 * const mixed = mixer(sine(constant(440), triangle(constant(220))))
 * const deamplified = amp(mixed, constant(0.5))
 * // ...
 * ```
 */
const funcToModule = func => curryN(func.length, (...inputs) => step => {
  const generators = inputs.map(fn => fn(step))
  return () => {
    const args = generators.map(fn => fn())
    return func(...args)
  }
})

module.exports = funcToModule
