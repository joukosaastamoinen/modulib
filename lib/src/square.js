import oscillator from "./lib/oscillator.js";

const square = (phase) => {
  return phase % 1 < 0.5 ? 1 : -1;
};

export default oscillator(square);
