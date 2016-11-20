const ad = (Attack, Decay, Trigger) => step => {
  let timeSinceTrigger = 0
  let attack = Attack(step)
  let decay = Decay(step)
  let trigger = Trigger(step)
  let previousTriggerValue = 0
  return () => {
    let ret
    const attackValue = attack()
    const decayValue = decay()
    const triggerValue = trigger()
    if (triggerValue > 0.5 && previousTriggerValue <= 0.5) {
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
