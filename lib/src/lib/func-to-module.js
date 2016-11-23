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
const funcToModule = func => (...inputs) => () => {
  const generators = inputs.map(fn => fn())
  const args = new Array(generators.length)
  return step => {
    // Use for loop instead of Array.prototype.map, because it's faster
    for (let i = 0; i < generators.length; i++) {
      args[i] = generators[i](step)
    }

    // use .apply instead of calling directly, with args
    // spread (func(...args)) because it's faster
    return func.apply(null, args)
  }
}

module.exports = funcToModule
