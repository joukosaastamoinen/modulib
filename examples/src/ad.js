import { ad, amp, constant, metronome, sine } from "modulib";

const bpm = 120;
const tempo = constant(bpm / 60);
const click = metronome(tempo);

export default () =>
  sine(amp(constant(300), ad(constant(0.1), constant(0.2), click)), click);
