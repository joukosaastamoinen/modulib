// Create a module that produces a linearly progressing value (a straight line).
// Unlike regular modules of the Modulib public API, takes a static value as input.
const linear = (slope) => () => {
  let value = 0;
  return (step) => {
    const currentValue = value;
    value += slope * step;
    return currentValue;
  };
};

export default linear;
