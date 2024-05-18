import { NUM_ITERATIONS, TIME_STEP } from "../constants.js";
import { TAU } from "../../src/lib/constants.js";
import { constant } from "../../src/index.js";
import { SignalGenerator } from "../../src/types.js";

export default () => {
  const sine =
    (Frequency: SignalGenerator): SignalGenerator =>
    () => {
      const nextFrequency = Frequency();
      let phase = 0;
      let previousFrequency: number | undefined;
      return (step) => {
        const frequency = nextFrequency(step);
        const value = Math.sin(TAU * phase);
        phase +=
          previousFrequency === undefined
            ? 0
            : ((frequency + previousFrequency) / 2) * step;
        previousFrequency = frequency;
        return value;
      };
    };

  const generator = sine(constant(440))();

  return () => {
    for (let i = 0; i < NUM_ITERATIONS; i++) {
      generator(TIME_STEP);
    }
  };
};
