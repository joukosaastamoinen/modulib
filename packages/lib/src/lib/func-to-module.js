/**
 * Convert any function to a module.
 *
 * **Example:**
 * ```js
 * const add = (a, b) => a + b
 * const mixer = funcToModule(add)
 *
 * // Now you can connect any other modules to mixer:
 * const mixed = mixer(sine(constant(440), triangle(constant(220))))
 * // And connect mixer to other modules:
 * const deamplified = amp(mixed, constant(0.5))
 * // ...
 * ```
 */
const funcToModule =
  (func) =>
  (...inputs) =>
  () => {
    const generators = inputs.map((fn) => fn());
    const args = new Array(generators.length);

    // Treat arities of 0 and 1 as special cases for better performance
    if (args.length === 0) {
      return func;
    } else if (args.length === 1) {
      return (step) => func(generators[0](step));
    }
    return (step) => {
      // Use for loop instead of Array.prototype.map, because it's faster
      for (let i = 0; i < generators.length; i++) {
        args[i] = generators[i](step);
      }

      // use .apply instead of calling directly with args
      // spread (func(...args)), because it's faster
      return func.apply(null, args);
    };
  };

export default funcToModule;
