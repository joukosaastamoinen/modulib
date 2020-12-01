import constant from "./constant.js";

const DEFAULT_THRESHOLD = 0.5;

const ad = (
  Attack,
  Decay,
  Trigger,
  Threshold = constant(DEFAULT_THRESHOLD)
) => () => {
  const attack = Attack();
  const decay = Decay();
  const trigger = Trigger();
  const threshold = Threshold();
  let decaying = true;
  let previousTriggerValue = 0;
  let value = 0;
  return (step) => {
    const attackValue = attack(step);
    const decayValue = decay(step);
    const triggerValue = trigger(step);
    const thresholdValue = threshold(step);
    if (decaying) {
      value = Math.max(0, value - step / decayValue);
    } else {
      value = Math.min(1, value + step / attackValue);
    }

    if (value === 1) {
      decaying = true;
    } else if (
      triggerValue > thresholdValue &&
      previousTriggerValue <= thresholdValue
    ) {
      decaying = false;
    }

    previousTriggerValue = triggerValue;
    return value;
  };
};

export default ad;
