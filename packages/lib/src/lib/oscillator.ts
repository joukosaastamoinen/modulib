import constant from "../constant.js";
import { SignalGenerator } from "../types.js";

const oscillator =
  (func: (phase: number) => number) =>
  (
    Frequency: SignalGenerator,
    Trigger: SignalGenerator = constant(0),
  ): SignalGenerator =>
  () => {
    const getFrequency = Frequency();
    const getTrigger = Trigger();
    let frequency: number;
    let phase = 0;
    return (step: number) => {
      let previousFrequency: number | undefined = frequency;
      frequency = getFrequency(step);
      const trigger = getTrigger(step);
      if (trigger !== 0) {
        phase = 0;
        previousFrequency = undefined;
      }
      phase +=
        previousFrequency === undefined
          ? 0
          : ((frequency + previousFrequency) / 2) * step;
      return func(phase);
    };
  };

export default oscillator;
