const constant = require('./constant')

const DEFAULT_THRESHOLD = 0.5

const ad = (
  Attack,
  Decay,
  Trigger,
  Threshold = constant(DEFAULT_THRESHOLD)
) => step => {
  let attack = Attack(step)
  let decay = Decay(step)
  let trigger = Trigger(step)
  let threshold = Threshold(step)
  let timeSinceTrigger = 0
  let previousTriggerValue = 0
  return () => {
    let ret
    const attackValue = attack()
    const decayValue = decay()
    const triggerValue = trigger()
    const thresholdValue = threshold()
    if (triggerValue > thresholdValue && previousTriggerValue <= thresholdValue) {
      timeSinceTrigger = 0
    }
    if (timeSinceTrigger <= attackValue) {
      ret = timeSinceTrigger / attackValue
    } else if (timeSinceTrigger < (attackValue + decayValue)) {
      ret = 1 - (timeSinceTrigger - attackValue) / decayValue
    } else {
      ret = 0
    }
    timeSinceTrigger += step
    previousTriggerValue = triggerValue
    return ret
  }
}

module.exports = ad
