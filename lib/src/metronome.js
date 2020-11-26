const metronome = (Tempo) => () => {
  const tempo = Tempo();
  let pos = 0;
  return (step) => {
    const nextPos = pos + step * tempo(step);
    const leftEdge = Math.min(pos, nextPos);
    const rightEdge = Math.max(pos, nextPos);
    const boundary = Math.ceil(leftEdge);
    const ret = leftEdge <= boundary && rightEdge > boundary ? 1 : 0;
    pos = nextPos;
    return ret;
  };
};

export default metronome;
