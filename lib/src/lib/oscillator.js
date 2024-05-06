import constant from "../constant.js";

const oscillator =
  (func) =>
  (Frequency, Trigger = constant(0)) =>
  () => {
    const getFrequency = Frequency();
    const getTrigger = Trigger();
    let frequency;
    let phase = 0;
    return (step) => {
      let previousFrequency = frequency;
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
