const metronome = (Tempo) => step => {
  let tempo = Tempo(step)
  let pos = 0
  let previousPos = undefined
  return () => {
    const ret = previousPos === undefined || Math.floor(previousPos) !== Math.floor(pos) ? 1 : 0
    previousPos = pos
    pos += step * tempo()
    return ret
  }
}

module.exports = metronome