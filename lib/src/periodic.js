const periodic = (Interval) => step => {
  let interval = Interval(step)
  let pos = 0
  let previousPos = undefined
  return () => {
    const ret = previousPos === undefined || Math.floor(previousPos) !== Math.floor(pos) ? 1 : 0
    previousPos = pos
    pos += step / interval()
    return ret
  }
}

module.exports = periodic
