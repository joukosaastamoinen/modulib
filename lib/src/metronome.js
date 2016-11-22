const metronome = (Tempo) => step => {
  let tempo = Tempo(step)
  let pos = 0
  return () => {
    const nextPos = pos + step * tempo()
    const leftEdge = Math.min(pos, nextPos)
    const rightEdge = Math.max(pos, nextPos)
    const boundary = Math.floor(rightEdge)
    let ret = leftEdge <= boundary && rightEdge > boundary ? 1 : 0
    pos = nextPos
    return ret
  }
}

module.exports = metronome
