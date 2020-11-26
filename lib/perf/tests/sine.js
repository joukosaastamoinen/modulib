import { NUM_ITERATIONS, TIME_STEP } from "../constants.js";
import { sine, constant } from "../../src/index.js";

export default () => {
  const generator = sine(constant(440))();
  return () => {
    for (let i = 0; i < NUM_ITERATIONS; i++) {
      generator(TIME_STEP);
    }
  };
};
