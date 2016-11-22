const constant = require('./constant')

const DEFAULT_THRESHOLD = 0.5

const ad = (
  Attack,
  Decay,
  Trigger,
  Threshold = constant(DEFAULT_THRESHOLD)
) => () => {
  let attack = Attack()
  let decay = Decay()
  let trigger = Trigger()
  let threshold = Threshold()
  let timeSinceTrigger = 0
  let previousTriggerValue = 0
  return step => {
    let ret
    const attackValue = attack(step)
    const decayValue = decay(step)
    const triggerValue = trigger(step)
    const thresholdValue = threshold(step)
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
